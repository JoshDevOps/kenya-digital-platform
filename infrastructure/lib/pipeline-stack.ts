import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for pipeline artifacts
    const artifactsBucket = new s3.Bucket(this, 'ArtifactsBucket', {
      bucketName: `skillbridge-pipeline-artifacts-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CodeBuild project for building React app
    const buildProject = new codebuild.Project(this, 'BuildProject', {
      projectName: 'skillbridge-build',
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        computeType: codebuild.ComputeType.SMALL,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          pre_build: {
            commands: [
              'echo Installing dependencies...',
              'npm install',
            ],
          },
          build: {
            commands: [
              'echo Build started on `date`',
              'CI=false npm run build',
            ],
          },
          post_build: {
            commands: [
              'echo Build completed on `date`',
            ],
          },
        },
        artifacts: {
          files: [
            '**/*',
          ],
          'base-directory': 'build',
        },
      }),
    });

    // Grant permissions to CodeBuild
    buildProject.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:GetObjectVersion',
        's3:PutObject',
        's3:GetBucketVersioning',
      ],
      resources: [
        artifactsBucket.bucketArn,
        `${artifactsBucket.bucketArn}/*`,
      ],
    }));

    // CloudFront invalidation project
    const invalidationProject = new codebuild.Project(this, 'InvalidationProject', {
      projectName: 'skillbridge-invalidation',
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        computeType: codebuild.ComputeType.SMALL,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'echo Invalidating CloudFront distribution...',
              'aws cloudfront create-invalidation --distribution-id E1DS1COOLRRFVV --paths "/*"',
              'echo CloudFront invalidation completed',
            ],
          },
        },
      }),
    });

    // Grant CloudFront permissions to invalidation project
    invalidationProject.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'cloudfront:CreateInvalidation',
        'cloudfront:GetInvalidation',
        'cloudfront:ListInvalidations'
      ],
      resources: ['*'],
    }));

    // CodePipeline
    const sourceOutput = new codepipeline.Artifact();
    const buildOutput = new codepipeline.Artifact();

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'skillbridge-pipeline',
      artifactBucket: artifactsBucket,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipelineActions.GitHubSourceAction({
              actionName: 'GitHub_Source',
              owner: 'JoshDevOps', // Replace with your GitHub username
              repo: 'kenya-digital-platform', // Replace with your repo name
              branch: 'master',
              oauthToken: cdk.SecretValue.secretsManager('github-token'), // Store your GitHub token in Secrets Manager
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: buildProject,
              input: sourceOutput,
              outputs: [buildOutput],
            }),
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipelineActions.S3DeployAction({
              actionName: 'S3Deploy',
              bucket: s3.Bucket.fromBucketName(this, 'WebsiteBucket', `skillbridge-web-${this.account}`),
              input: buildOutput,
            }),
          ],
        },
        {
          stageName: 'Invalidate',
          actions: [
            new codepipelineActions.CodeBuildAction({
              actionName: 'CloudFrontInvalidation',
              project: invalidationProject,
              input: sourceOutput,
            }),
          ],
        },
      ],
    });

    // Outputs
    new cdk.CfnOutput(this, 'PipelineName', {
      value: pipeline.pipelineName,
      description: 'CodePipeline Name',
    });
  }
}