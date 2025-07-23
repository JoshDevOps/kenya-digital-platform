// AWS Configuration - Using deployed infrastructure values
const awsconfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_1qJTCqbTv',
  aws_user_pools_web_client_id: '2h3msj6045tnruecqt7ll708r7',
  aws_cognito_identity_pool_id: 'us-east-1:0e2c09d2-db1d-46f8-a4f2-114e29e7f1ff',
  aws_appsync_graphqlEndpoint: 'https://vg35uu4gbbbnnaf6dy7shanhwm.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Storage: {
    AWSS3: {
      bucket: 'skillbridge-uploads-637423178245',
      region: 'us-east-1',
    }
  }
};

export default awsconfig;