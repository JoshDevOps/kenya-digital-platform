import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PipelineStackV2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for pipeline artifacts
    const artifactsBucket = new s3.Bucket(this, 'ArtifactsBucket', {
      bucketName: `skillbridge-pipeline-artifacts-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CodeBuild project
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
              'npm run build',
            ],
          },
          post_build: {
            commands: [
              'echo Build completed on `date`',
            ],
          },
        },
        artifacts: {
          files: ['**/*'],
          'base-directory': 'build',
        },
      }),
    });

    // CodePipeline with CodeStar connection
    const sourceOutput = new codepipeline.Artifact();
    const buildOutput = new codepipeline.Artifact();

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'skillbridge-pipeline',
      artifactBucket: artifactsBucket,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipelineActions.CodeStarConnectionsSourceAction({
              actionName: 'GitHub_Source',
              owner: 'JoshDevOps',
              repo: 'kenya-digital-platform',
              branch: 'main',
              connectionArn: 'arn:aws:codestar-connections:us-east-1:637423178245:connection/REPLACE-WITH-CONNECTION-ARN',
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
      ],
    });

    new cdk.CfnOutput(this, 'PipelineName', {
      value: pipeline.pipelineName,
    });
  }
}