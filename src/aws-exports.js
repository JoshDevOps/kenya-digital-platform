// AWS Configuration - Update these values after deploying infrastructure
const awsconfig = {
  aws_project_region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  aws_cognito_region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID,
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_UPLOADS_BUCKET,
      region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
    }
  }
};

export default awsconfig;