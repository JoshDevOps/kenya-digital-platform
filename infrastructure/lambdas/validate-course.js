const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log('Validating course:', JSON.stringify(event, null, 2));
    
    try {
        const { title, description, category, price, lessons } = event;
        
        const validationErrors = [];
        
        // Title validation
        if (!title || title.trim().length < 5) {
            validationErrors.push('Title must be at least 5 characters long');
        }
        
        // Description validation
        if (!description || description.trim().length < 20) {
            validationErrors.push('Description must be at least 20 characters long');
        }
        
        // Category validation
        const validCategories = ['Development', 'Marketing', 'Design', 'Business', 'Data Science'];
        if (!category || !validCategories.includes(category)) {
            validationErrors.push('Invalid category selected');
        }
        
        // Price validation
        if (price !== undefined && (price < 0 || price > 1000)) {
            validationErrors.push('Price must be between 0 and 1000');
        }
        
        // Lessons validation
        if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
            validationErrors.push('Course must have at least one lesson');
        } else {
            lessons.forEach((lesson, index) => {
                if (!lesson.title || lesson.title.trim().length < 3) {
                    validationErrors.push(`Lesson ${index + 1} title is too short`);
                }
                if (!lesson.content || lesson.content.trim().length < 10) {
                    validationErrors.push(`Lesson ${index + 1} content is too short`);
                }
            });
        }
        
        const isValid = validationErrors.length === 0;
        
        return {
            statusCode: 200,
            body: {
                isValid,
                errors: validationErrors,
                message: isValid ? 'Course validation passed' : 'Course validation failed'
            }
        };
        
    } catch (error) {
        console.error('Validation error:', error);
        return {
            statusCode: 500,
            body: {
                isValid: false,
                errors: ['Internal validation error'],
                message: 'Validation process failed'
            }
        };
    }
};