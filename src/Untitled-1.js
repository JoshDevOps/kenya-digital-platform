// AWS Configuration
const awsConfig = {
  // AWS Cognito
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_wPDdn77gv', // Replace with actual User Pool ID
    userPoolWebClientId: '1a8fiute2b0ckfm8nona0ja8b7"', // Replace with actual App Client ID
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  // AWS AppSync (GraphQL)
  API: {
    aws_appsync_graphqlEndpoint: "https://dm5brhr7cnfyne2dciptv2mybq.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  },
  // AWS S3
  Storage: {
    AWSS3: {
      bucket: 'coachflow-videos', // Replace with actual S3 bucket name
      region: 'us-east-1',
    }
  },
  // Analytics
  Analytics: {
    disabled: false,
  },
};

export default awsConfig;