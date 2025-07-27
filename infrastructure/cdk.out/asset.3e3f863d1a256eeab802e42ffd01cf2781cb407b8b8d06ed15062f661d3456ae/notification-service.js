const AWS = require('aws-sdk');

const ses = new AWS.SES();
const sns = new AWS.SNS();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('Sending notification:', JSON.stringify(event, null, 2));
    
    try {
        const { type, courseId, instructorId, reason } = event;
        
        // Get user details
        const userParams = {
            TableName: process.env.USERS_TABLE,
            Key: { id: instructorId }
        };
        
        const userResult = await dynamodb.get(userParams).promise();
        const user = userResult.Item;
        
        if (!user) {
            throw new Error('User not found');
        }
        
        // Get course details
        const courseParams = {
            TableName: process.env.COURSES_TABLE,
            Key: { id: courseId }
        };
        
        const courseResult = await dynamodb.get(courseParams).promise();
        const course = courseResult.Item;
        
        let emailSubject, emailBody, smsMessage;
        
        switch (type) {
            case 'course_created':
                emailSubject = 'Course Created Successfully';
                emailBody = `
                    <h2>Course Created Successfully!</h2>
                    <p>Dear ${user.name},</p>
                    <p>Your course "${course.title}" has been created successfully and is now in draft status.</p>
                    <p>Next steps:</p>
                    <ul>
                        <li>Review your course content</li>
                        <li>Submit for approval when ready</li>
                        <li>Start promoting your course</li>
                    </ul>
                    <p>Best regards,<br>SkillBridge Team</p>
                `;
                smsMessage = `Course "${course.title}" created successfully. Submit for approval when ready.`;
                break;
                
            case 'course_approved':
                emailSubject = 'Course Approved and Published';
                emailBody = `
                    <h2>Congratulations! Your Course is Live!</h2>
                    <p>Dear ${user.name},</p>
                    <p>Your course "${course.title}" has been approved and is now live on SkillBridge!</p>
                    <p>Students can now enroll and start learning from your course.</p>
                    <p>View your course: <a href="${process.env.FRONTEND_URL}/courses/${courseId}">Click here</a></p>
                    <p>Best regards,<br>SkillBridge Team</p>
                `;
                smsMessage = `Great news! Your course "${course.title}" is now live on SkillBridge!`;
                break;
                
            case 'course_rejected':
                emailSubject = 'Course Review - Action Required';
                emailBody = `
                    <h2>Course Review Update</h2>
                    <p>Dear ${user.name},</p>
                    <p>Your course "${course.title}" requires some updates before it can be published.</p>
                    <p><strong>Reason:</strong> ${reason}</p>
                    <p>Please make the necessary changes and resubmit for review.</p>
                    <p>Edit your course: <a href="${process.env.FRONTEND_URL}/content/${courseId}">Click here</a></p>
                    <p>Best regards,<br>SkillBridge Team</p>
                `;
                smsMessage = `Course "${course.title}" needs updates. Check your email for details.`;
                break;
                
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
        
        // Send email notification
        if (user.email) {
            const emailParams = {
                Source: process.env.FROM_EMAIL,
                Destination: {
                    ToAddresses: [user.email]
                },
                Message: {
                    Subject: {
                        Data: emailSubject,
                        Charset: 'UTF-8'
                    },
                    Body: {
                        Html: {
                            Data: emailBody,
                            Charset: 'UTF-8'
                        }
                    }
                }
            };
            
            await ses.sendEmail(emailParams).promise();
        }
        
        // Send SMS notification (if phone number available)
        if (user.phoneNumber) {
            const smsParams = {
                PhoneNumber: user.phoneNumber,
                Message: smsMessage
            };
            
            await sns.publish(smsParams).promise();
        }
        
        // Log notification in database
        const notificationRecord = {
            id: `${instructorId}_${Date.now()}`,
            userId: instructorId,
            type,
            courseId,
            subject: emailSubject,
            message: smsMessage,
            status: 'sent',
            createdAt: new Date().toISOString()
        };
        
        const logParams = {
            TableName: process.env.NOTIFICATIONS_TABLE,
            Item: notificationRecord
        };
        
        await dynamodb.put(logParams).promise();
        
        return {
            statusCode: 200,
            body: {
                message: 'Notifications sent successfully',
                notificationId: notificationRecord.id
            }
        };
        
    } catch (error) {
        console.error('Notification error:', error);
        return {
            statusCode: 500,
            body: {
                error: 'Notification failed',
                message: error.message
            }
        };
    }
};