const AWS = require('aws-sdk');
const mediaConvert = new AWS.MediaConvert();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log('Processing videos:', JSON.stringify(event, null, 2));
    
    try {
        const { courseId, videos } = event;
        const processedVideos = [];
        
        for (const video of videos) {
            const { videoUrl, title, duration } = video;
            
            // Create MediaConvert job for video transcoding
            const jobParams = {
                Role: process.env.MEDIA_CONVERT_ROLE,
                Settings: {
                    Inputs: [{
                        FileInput: videoUrl,
                        VideoSelector: {},
                        AudioSelectors: {
                            'Audio Selector 1': {
                                DefaultSelection: 'DEFAULT'
                            }
                        }
                    }],
                    OutputGroups: [{
                        Name: 'File Group',
                        OutputGroupSettings: {
                            Type: 'FILE_GROUP_SETTINGS',
                            FileGroupSettings: {
                                Destination: `s3://${process.env.PROCESSED_VIDEOS_BUCKET}/${courseId}/`
                            }
                        },
                        Outputs: [
                            {
                                NameModifier: '_720p',
                                VideoDescription: {
                                    Width: 1280,
                                    Height: 720,
                                    CodecSettings: {
                                        Codec: 'H_264',
                                        H264Settings: {
                                            Bitrate: 2000000,
                                            RateControlMode: 'CBR'
                                        }
                                    }
                                },
                                AudioDescriptions: [{
                                    CodecSettings: {
                                        Codec: 'AAC',
                                        AacSettings: {
                                            Bitrate: 128000,
                                            SampleRate: 48000
                                        }
                                    }
                                }],
                                ContainerSettings: {
                                    Container: 'MP4'
                                }
                            },
                            {
                                NameModifier: '_480p',
                                VideoDescription: {
                                    Width: 854,
                                    Height: 480,
                                    CodecSettings: {
                                        Codec: 'H_264',
                                        H264Settings: {
                                            Bitrate: 1000000,
                                            RateControlMode: 'CBR'
                                        }
                                    }
                                },
                                AudioDescriptions: [{
                                    CodecSettings: {
                                        Codec: 'AAC',
                                        AacSettings: {
                                            Bitrate: 128000,
                                            SampleRate: 48000
                                        }
                                    }
                                }],
                                ContainerSettings: {
                                    Container: 'MP4'
                                }
                            }
                        ]
                    }]
                }
            };
            
            try {
                const job = await mediaConvert.createJob(jobParams).promise();
                
                processedVideos.push({
                    originalUrl: videoUrl,
                    title,
                    duration,
                    jobId: job.Job.Id,
                    status: 'processing',
                    outputs: {
                        '720p': `s3://${process.env.PROCESSED_VIDEOS_BUCKET}/${courseId}/${title}_720p.mp4`,
                        '480p': `s3://${process.env.PROCESSED_VIDEOS_BUCKET}/${courseId}/${title}_480p.mp4`
                    }
                });
                
            } catch (error) {
                console.error(`Error processing video ${title}:`, error);
                processedVideos.push({
                    originalUrl: videoUrl,
                    title,
                    duration,
                    status: 'failed',
                    error: error.message
                });
            }
        }
        
        return {
            statusCode: 200,
            body: {
                courseId,
                processedVideos,
                message: 'Video processing initiated'
            }
        };
        
    } catch (error) {
        console.error('Video processing error:', error);
        return {
            statusCode: 500,
            body: {
                error: 'Video processing failed',
                message: error.message
            }
        };
    }
};