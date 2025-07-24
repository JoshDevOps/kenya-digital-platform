const { Amplify, API, graphqlOperation } = require('aws-amplify');
const awsConfig = require('./src/aws-exports.js').default;

Amplify.configure(awsConfig);

const LIST_COURSES = `
  query ListCourses($limit: Int, $nextToken: String) {
    listCourses(limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        instructorId
        price
        duration
        level
        category
        thumbnail
        enrollmentCount
        rating
        isPublished
        createdAt
      }
      nextToken
    }
  }
`;

async function testGraphQL() {
  try {
    console.log('Testing GraphQL query...');
    const result = await API.graphql(graphqlOperation(LIST_COURSES, { limit: 10 }));
    console.log('Success! Courses found:', result.data.listCourses.items.length);
    console.log('Courses:', JSON.stringify(result.data.listCourses.items, null, 2));
  } catch (error) {
    console.error('GraphQL Error:', error);
    console.error('Error details:', error.errors);
  }
}

testGraphQL();