const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log('Generating thumbnails:', JSON.stringify(event, null, 2));
    
    try {
        const { courseId, images } = event;
        const generatedThumbnails = [];
        
        for (const image of images) {
            const { imageUrl, title } = image;
            
            try {
                // Download image from S3
                const imageKey = imageUrl.replace(`s3://${process.env.PROCESSED_VIDEOS_BUCKET}/`, '');
                const imageObject = await s3.getObject({
                    Bucket: process.env.PROCESSED_VIDEOS_BUCKET,
                    Key: imageKey
                }).promise();
                
                // Generate different thumbnail sizes
                const sizes = [
                    { width: 400, height: 225, suffix: '_400x225' },
                    { width: 800, height: 450, suffix: '_800x450' },
                    { width: 1200, height: 675, suffix: '_1200x675' }
                ];
                
                const thumbnails = {};
                
                for (const size of sizes) {
                    const resizedImage = await sharp(imageObject.Body)
                        .resize(size.width, size.height, {
                            fit: 'cover',
                            position: 'center'
                        })
                        .jpeg({ quality: 85 })
                        .toBuffer();
                    
                    const thumbnailKey = `${courseId}/thumbnails/${title}${size.suffix}.jpg`;
                    
                    await s3.putObject({
                        Bucket: process.env.PROCESSED_VIDEOS_BUCKET,
                        Key: thumbnailKey,
                        Body: resizedImage,
                        ContentType: 'image/jpeg',
                        CacheControl: 'max-age=31536000'
                    }).promise();
                    
                    thumbnails[`${size.width}x${size.height}`] = `s3://${process.env.PROCESSED_VIDEOS_BUCKET}/${thumbnailKey}`;
                }
                
                generatedThumbnails.push({
                    originalUrl: imageUrl,
                    title,
                    thumbnails,
                    status: 'completed'
                });
                
            } catch (error) {
                console.error(`Error generating thumbnail for ${title}:`, error);
                generatedThumbnails.push({
                    originalUrl: imageUrl,
                    title,
                    status: 'failed',
                    error: error.message
                });
            }
        }
        
        return {
            statusCode: 200,
            body: {
                courseId,
                thumbnails: generatedThumbnails,
                message: 'Thumbnail generation completed'
            }
        };
        
    } catch (error) {
        console.error('Thumbnail generation error:', error);
        return {
            statusCode: 500,
            body: {
                error: 'Thumbnail generation failed',
                message: error.message
            }
        };
    }
};