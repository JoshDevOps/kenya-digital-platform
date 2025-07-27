import * as cdk from 'aws-cdk-lib';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as path from 'path';
import * as fs from 'fs';

export class StepFunctionsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import existing DynamoDB Tables from SkillBridgeStack
    const coursesTable = dynamodb.Table.fromTableName(this, 'CoursesTable', 'skillbridge-courses');
    const usersTable = dynamodb.Table.fromTableName(this, 'UsersTable', 'skillbridge-users');
    
    // Create notifications table (new for Step Functions)
    const notificationsTable = new dynamodb.Table(this, 'NotificationsTable', {
      tableName: 'skillbridge-step-functions-notifications',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    });

    // Import existing uploads bucket and create video-specific buckets
    const uploadsBucket = s3.Bucket.fromBucketName(this, 'UploadsBucket', `skillbridge-uploads-${this.account}`);
    
    // Create video processing buckets with unique names
    const processedVideosBucket = new s3.Bucket(this, 'ProcessedVideosBucket', {
      bucketName: `skillbridge-processed-videos-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }]
    });

    const courseMaterialsBucket = new s3.Bucket(this, 'CourseMaterialsBucket', {
      bucketName: `skillbridge-course-materials-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }]
    });

    // Lambda Functions
    const validateCourseLambda = new lambda.Function(this, 'ValidateCourseLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'validate-course.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        COURSES_TABLE: coursesTable.tableName
      }
    });

    const processVideoLambda = new lambda.Function(this, 'ProcessVideoLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'process-video.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      timeout: cdk.Duration.minutes(15),
      environment: {
        RAW_VIDEOS_BUCKET: uploadsBucket.bucketName,
        PROCESSED_VIDEOS_BUCKET: processedVideosBucket.bucketName,
        MEDIA_CONVERT_ROLE: 'arn:aws:iam::' + this.account + ':role/MediaConvertRole'
      }
    });

    const generateThumbnailLambda = new lambda.Function(this, 'GenerateThumbnailLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'generate-thumbnail.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      timeout: cdk.Duration.minutes(5),
      environment: {
        PROCESSED_VIDEOS_BUCKET: processedVideosBucket.bucketName,
        COURSE_MATERIALS_BUCKET: courseMaterialsBucket.bucketName
      }
    });

    const createCourseLambda = new lambda.Function(this, 'CreateCourseLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'create-course.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        COURSES_TABLE: coursesTable.tableName,
        USERS_TABLE: usersTable.tableName
      }
    });

    const notificationLambda = new lambda.Function(this, 'NotificationLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'notification-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        COURSES_TABLE: coursesTable.tableName,
        USERS_TABLE: usersTable.tableName,
        NOTIFICATIONS_TABLE: notificationsTable.tableName,
        FROM_EMAIL: 'noreply@skillbridge.com',
        FRONTEND_URL: 'https://d3md2krnlhzrff.cloudfront.net'
      }
    });

    // Grant permissions
    coursesTable.grantReadWriteData(validateCourseLambda);
    coursesTable.grantReadWriteData(createCourseLambda);
    coursesTable.grantReadData(notificationLambda);
    usersTable.grantReadWriteData(createCourseLambda);
    usersTable.grantReadData(notificationLambda);
    notificationsTable.grantWriteData(notificationLambda);
    uploadsBucket.grantReadWrite(processVideoLambda);
    processedVideosBucket.grantReadWrite(processVideoLambda);
    processedVideosBucket.grantReadWrite(generateThumbnailLambda);
    courseMaterialsBucket.grantReadWrite(generateThumbnailLambda);

    // SES and SNS permissions for notifications
    notificationLambda.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ses:SendEmail', 'sns:Publish'],
      resources: ['*']
    }));

    // MediaConvert permissions
    processVideoLambda.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['mediaconvert:*'],
      resources: ['*']
    }));

    // Load Step Functions definition
    const courseCreationDefinition = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../workflows/course-creation-workflow.json'), 'utf8')
    );

    // Replace Lambda ARNs in definition
    const definitionString = JSON.stringify(courseCreationDefinition)
      .replace(/\${ValidateCourseLambda}/g, validateCourseLambda.functionArn)
      .replace(/\${ProcessVideoLambda}/g, processVideoLambda.functionArn)
      .replace(/\${GenerateThumbnailLambda}/g, generateThumbnailLambda.functionArn)
      .replace(/\${CreateCourseLambda}/g, createCourseLambda.functionArn)
      .replace(/\${NotificationLambda}/g, notificationLambda.functionArn);

    // Create Step Functions State Machine
    const courseCreationStateMachine = new stepfunctions.StateMachine(this, 'CourseCreationStateMachine', {
      stateMachineName: 'skillbridge-course-creation',
      definitionBody: stepfunctions.DefinitionBody.fromString(definitionString),
      timeout: cdk.Duration.hours(2)
    });

    // Grant Step Functions permission to invoke Lambda functions
    validateCourseLambda.grantInvoke(courseCreationStateMachine);
    processVideoLambda.grantInvoke(courseCreationStateMachine);
    generateThumbnailLambda.grantInvoke(courseCreationStateMachine);
    createCourseLambda.grantInvoke(courseCreationStateMachine);
    notificationLambda.grantInvoke(courseCreationStateMachine);

    // Create Course Approval State Machine
    const courseApprovalDefinition = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../workflows/course-approval-workflow.json'), 'utf8')
    );

    const approvalDefinitionString = JSON.stringify(courseApprovalDefinition)
      .replace(/\${SubmitReviewLambda}/g, createCourseLambda.functionArn)
      .replace(/\${QualityCheckLambda}/g, validateCourseLambda.functionArn)
      .replace(/\${AdminReviewLambda}/g, notificationLambda.functionArn)
      .replace(/\${ApproveCourseLambda}/g, createCourseLambda.functionArn)
      .replace(/\${PublishCourseLambda}/g, createCourseLambda.functionArn)
      .replace(/\${RejectCourseLambda}/g, createCourseLambda.functionArn)
      .replace(/\${NotificationLambda}/g, notificationLambda.functionArn);

    const courseApprovalStateMachine = new stepfunctions.StateMachine(this, 'CourseApprovalStateMachine', {
      stateMachineName: 'skillbridge-course-approval',
      definitionBody: stepfunctions.DefinitionBody.fromString(approvalDefinitionString),
      timeout: cdk.Duration.hours(24)
    });

    // Outputs
    new cdk.CfnOutput(this, 'CourseCreationStateMachineArn', {
      value: courseCreationStateMachine.stateMachineArn,
      description: 'Course Creation State Machine ARN'
    });

    new cdk.CfnOutput(this, 'CourseApprovalStateMachineArn', {
      value: courseApprovalStateMachine.stateMachineArn,
      description: 'Course Approval State Machine ARN'
    });

    new cdk.CfnOutput(this, 'UploadsBucketName', {
      value: uploadsBucket.bucketName,
      description: 'Uploads S3 Bucket Name (Raw Videos)'
    });

    new cdk.CfnOutput(this, 'ProcessedVideosBucketName', {
      value: processedVideosBucket.bucketName,
      description: 'Processed Videos S3 Bucket Name'
    });

    new cdk.CfnOutput(this, 'CourseMaterialsBucketName', {
      value: courseMaterialsBucket.bucketName,
      description: 'Course Materials S3 Bucket Name'
    });

    new cdk.CfnOutput(this, 'CoursesTableName', {
      value: coursesTable.tableName,
      description: 'Courses DynamoDB Table Name'
    });

    new cdk.CfnOutput(this, 'NotificationsTableName', {
      value: notificationsTable.tableName,
      description: 'Notifications DynamoDB Table Name'
    });
  }
}