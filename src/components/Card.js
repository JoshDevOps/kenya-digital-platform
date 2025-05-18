import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ 
  children, 
  className, 
  animate = true,
  hover = true,
  delay = 0,
  ...props 
}) => {
  const baseClasses = "rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden";
  const hoverClasses = hover ? "transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-hover-dark transform hover:-translate-y-1" : "";
  
  const content = (
    <div 
      className={twMerge(baseClasses, hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        className="h-full"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge("px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 
      className={twMerge("text-lg font-medium text-gray-900 dark:text-gray-100", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p 
      className={twMerge("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge("px-6 py-4 border-t dark:border-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;