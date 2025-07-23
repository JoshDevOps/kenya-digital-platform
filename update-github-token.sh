#!/bin/bash

echo "🔑 Updating GitHub token in AWS Secrets Manager..."

read -s -p "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
echo

aws secretsmanager update-secret \
  --secret-id github-token \
  --secret-string "$GITHUB_TOKEN"

if [ $? -eq 0 ]; then
    echo "✅ GitHub token updated successfully!"
    echo "📋 Now deploy the pipeline:"
    echo "   cd infrastructure && cdk deploy SkillBridgePipelineStack"
else
    echo "❌ Failed to update GitHub token"
fi