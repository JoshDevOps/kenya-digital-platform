#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SkillBridgeStack } from '../lib/skillbridge-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

// Main application stack
new SkillBridgeStack(app, 'SkillBridgeStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// CI/CD Pipeline stack
new PipelineStack(app, 'SkillBridgePipelineStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});