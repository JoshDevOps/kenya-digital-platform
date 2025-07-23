# SkillBridge Infrastructure

This directory contains the AWS CDK infrastructure code for the SkillBridge platform.

## Architecture Overview

- **Frontend**: React app hosted on S3 with CloudFront CDN
- **Authentication**: Amazon Cognito (User Pools + Identity Pools)
- **API**: AWS AppSync GraphQL API
- **Database**: DynamoDB tables for users, courses, enrollments, sessions
- **Storage**: S3 buckets for static assets and file uploads
- **CI/CD**: CodePipeline with CodeBuild for automated deployment

## Prerequisites

1. AWS CLI configured with appropriate permissions
2. Node.js and npm installed
3. AWS CDK CLI installed: `npm install -g aws-cdk`

## Setup Instructions

1. Install dependencies:
   ```bash
   cd infrastructure
   npm install
   ```

2. Bootstrap CDK (first time only):
   ```bash
   cdk bootstrap
   ```

3. Deploy infrastructure:
   ```bash
   cdk deploy --all
   ```

## Pipeline Setup

1. Store your GitHub personal access token in AWS Secrets Manager:
   ```bash
   aws secretsmanager create-secret --name github-token --secret-string "your-github-token"
   ```

2. Update the GitHub owner and repo name in `lib/pipeline-stack.ts`

3. Deploy the pipeline:
   ```bash
   cdk deploy SkillBridgePipelineStack
   ```

## Environment Configuration

After deployment, update your React app's environment variables with the output values:

```javascript
// src/aws-exports.js
const awsconfig = {
  aws_project_region: 'your-region',
  aws_cognito_region: 'your-region',
  aws_user_pools_id: 'your-user-pool-id',
  aws_user_pools_web_client_id: 'your-client-id',
  aws_cognito_identity_pool_id: 'your-identity-pool-id',
  aws_appsync_graphqlEndpoint: 'your-graphql-endpoint',
  aws_appsync_region: 'your-region',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Storage: {
    AWSS3: {
      bucket: 'your-uploads-bucket',
      region: 'your-region',
    }
  }
};

export default awsconfig;
```

## Useful Commands

- `npm run build` - compile TypeScript to JS
- `cdk deploy` - deploy this stack to your default AWS account/region
- `cdk diff` - compare deployed stack with current state
- `cdk synth` - emits the synthesized CloudFormation template
- `cdk destroy` - destroy the stack