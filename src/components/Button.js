import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 focus-visible:ring-primary-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 focus-visible:ring-gray-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 focus-visible:ring-gray-500",
        link: "bg-transparent underline-offset-4 hover:underline text-primary-500 dark:text-primary-400 hover:bg-transparent dark:hover:bg-transparent focus-visible:ring-primary-500",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus-visible:ring-red-500",
        success: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus-visible:ring-green-500",
        accent: "bg-accent-500 text-white hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-700 focus-visible:ring-accent-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      animate: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animate: false,
    },
  }
);

const Button = ({ 
  children, 
  className, 
  variant, 
  size, 
  animate = false,
  ...props 
}) => {
  const ButtonComponent = animate ? motion.button : 'button';
  
  const animationProps = animate ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <ButtonComponent
      className={twMerge(buttonVariants({ variant, size, animate }), className)}
      {...animationProps}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;