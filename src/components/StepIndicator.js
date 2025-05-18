import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const StepIndicator = ({ 
  steps, 
  currentStep, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isCompleted 
                    ? 'bg-primary-500 text-white' 
                    : isActive 
                      ? 'bg-primary-100 border-2 border-primary-500 text-primary-500 dark:bg-primary-900 dark:border-primary-400 dark:text-primary-400' 
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <span className={`mt-2 text-xs ${
                isActive 
                  ? 'text-primary-500 font-medium dark:text-primary-400' 
                  : isCompleted 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            
            {!isLast && (
              <div 
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep 
                    ? 'bg-primary-500 dark:bg-primary-400' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;