import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';

const CourseCard = ({ course, progress }) => {
  // Format the course level with appropriate color
  const getLevelBadge = () => {
    switch (course.level) {
      case 'BEGINNER':
        return <Badge text="Beginner" color="green" />;
      case 'INTERMEDIATE':
        return <Badge text="Intermediate" color="blue" />;
      case 'ADVANCED':
        return <Badge text="Advanced" color="red" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        {course.coverImageUrl ? (
          <img 
            src={course.coverImageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No image</span>
          </div>
        )}
        
        {/* Price Badge */}
        {course.isPaid ? (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {course.price ? `KES ${course.price}` : 'Paid'}
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Free
          </div>
        )}
      </div>
      
      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          {/* Level Badge */}
          {getLevelBadge()}
          
          {/* Duration */}
          {course.duration && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {course.duration}
            </span>
          )}
        </div>
        
        {/* Progress Bar (if progress is available) */}
        {progress && (
          <div className="mt-2 mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-gray-600 dark:text-gray-300">{Math.round(progress.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${progress.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <Link 
          to={`/courses/${course.id}`}
          className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-2"
        >
          {progress ? 'Continue Learning' : 'View Course'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;