import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class SkillBridgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for hosting React app
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `skillbridge-web-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // S3 Bucket for file uploads (videos, documents)
    const uploadsBucket = new s3.Bucket(this, 'UploadsBucket', {
      bucketName: `skillbridge-uploads-${this.account}`,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST, s3.HttpMethods.PUT],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [{
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      }],
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'skillbridge-users',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        user_type: new cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // Cognito User Pool Client
    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    // Cognito Identity Pool
    const identityPool = new cognito.CfnIdentityPool(this, 'IdentityPool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [{
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName,
      }],
    });

    // DynamoDB Tables
    const usersTable = new dynamodb.Table(this, 'UsersTable', {
      tableName: 'skillbridge-users',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const coursesTable = new dynamodb.Table(this, 'CoursesTable', {
      tableName: 'skillbridge-courses',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const enrollmentsTable = new dynamodb.Table(this, 'EnrollmentsTable', {
      tableName: 'skillbridge-enrollments',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    enrollmentsTable.addGlobalSecondaryIndex({
      indexName: 'user-course-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'courseId', type: dynamodb.AttributeType.STRING },
    });

    const sessionsTable = new dynamodb.Table(this, 'SessionsTable', {
      tableName: 'skillbridge-sessions',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'skillbridge-api',
      schema: appsync.SchemaFile.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
      xrayEnabled: true,
    });

    // DynamoDB Data Sources
    const usersDataSource = api.addDynamoDbDataSource('UsersDataSource', usersTable);
    const coursesDataSource = api.addDynamoDbDataSource('CoursesDataSource', coursesTable);
    const enrollmentsDataSource = api.addDynamoDbDataSource('EnrollmentsDataSource', enrollmentsTable);
    const sessionsDataSource = api.addDynamoDbDataSource('SessionsDataSource', sessionsTable);

    // Resolvers
    coursesDataSource.createResolver('CreateCourseResolver', {
      typeName: 'Mutation',
      fieldName: 'createCourse',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Course.createCourse.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Course.createCourse.res.vtl'),
    });

    coursesDataSource.createResolver('ListCoursesResolver', {
      typeName: 'Query',
      fieldName: 'listCourses',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Query.listCourses.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Query.listCourses.res.vtl'),
    });

    enrollmentsDataSource.createResolver('EnrollInCourseResolver', {
      typeName: 'Mutation',
      fieldName: 'enrollInCourse',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Mutation.enrollInCourse.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Mutation.enrollInCourse.res.vtl'),
    });

    enrollmentsDataSource.createResolver('GetUserEnrollmentsResolver', {
      typeName: 'Query',
      fieldName: 'getUserEnrollments',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Query.getUserEnrollments.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('resolvers/Query.getUserEnrollments.res.vtl'),
    });

    // IAM Roles for Cognito Identity Pool
    const authenticatedRole = new iam.Role(this, 'CognitoDefaultAuthenticatedRole', {
      assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref,
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'authenticated',
        },
      }),
    });

    authenticatedRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject',
      ],
      resources: [
        `${uploadsBucket.bucketArn}/*`,
      ],
    }));

    // Attach roles to identity pool
    new cognito.CfnIdentityPoolRoleAttachment(this, 'IdentityPoolRoleAttachment', {
      identityPoolId: identityPool.ref,
      roles: {
        authenticated: authenticatedRole.roleArn,
      },
    });

    // Outputs
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: distribution.distributionDomainName,
      description: 'Website URL',
    });

    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
      description: 'GraphQL API URL',
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'Cognito User Pool ID',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
    });

    new cdk.CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
      description: 'Cognito Identity Pool ID',
    });
  }
}