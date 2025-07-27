const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const appsync = new AWS.AppSync();

exports.handler = async (event) => {
    console.log('Creating course record:', JSON.stringify(event, null, 2));
    
    try {
        const {
            title,
            description,
            category,
            price,
            instructorId,
            lessons,
            mediaProcessing,
            validation
        } = event;
        
        const courseId = event.courseId || uuidv4();
        const timestamp = new Date().toISOString();
        
        // Create course record
        const courseRecord = {
            id: courseId,
            title,
            description,
            category,
            price: price || 0,
            instructorId,
            status: 'draft',
            createdAt: timestamp,
            updatedAt: timestamp,
            lessons: lessons.map(lesson => ({
                ...lesson,
                id: lesson.id || uuidv4()
            })),
            mediaUrls: mediaProcessing?.[0]?.Payload?.processedVideos || [],
            thumbnails: mediaProcessing?.[1]?.Payload?.thumbnails || [],
            enrollmentCount: 0,
            rating: 0,
            isPublished: false,
            validationStatus: validation?.Payload?.isValid ? 'passed' : 'failed'
        };
        
        // Save to DynamoDB
        const putParams = {
            TableName: process.env.COURSES_TABLE,
            Item: courseRecord,
            ConditionExpression: 'attribute_not_exists(id)'
        };
        
        await dynamodb.put(putParams).promise();
        
        // Update instructor's course list
        const updateInstructorParams = {
            TableName: process.env.USERS_TABLE,
            Key: { id: instructorId },
            UpdateExpression: 'ADD courseIds :courseId SET updatedAt = :timestamp',
            ExpressionAttributeValues: {
                ':courseId': dynamodb.createSet([courseId]),
                ':timestamp': timestamp
            }
        };
        
        await dynamodb.update(updateInstructorParams).promise();
        
        // Trigger GraphQL subscription for real-time updates
        const subscriptionPayload = {
            courseCreated: {
                id: courseId,
                title,
                status: 'draft',
                instructorId,
                createdAt: timestamp
            }
        };
        
        return {
            statusCode: 200,
            body: {
                courseId,
                course: courseRecord,
                message: 'Course created successfully'
            }
        };
        
    } catch (error) {
        console.error('Course creation error:', error);
        
        if (error.code === 'ConditionalCheckFailedException') {
            return {
                statusCode: 409,
                body: {
                    error: 'Course already exists',
                    message: 'A course with this ID already exists'
                }
            };
        }
        
        return {
            statusCode: 500,
            body: {
                error: 'Course creation failed',
                message: error.message
            }
        };
    }
};