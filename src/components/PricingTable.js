import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

const PricingTable = ({ 
  plans = [], 
  onSelectPlan,
  className = '',
  currency = 'KSh',
  interval = 'month',
  showToggle = true,
}) => {
  const [billingInterval, setBillingInterval] = useState(interval);

  const toggleBillingInterval = () => {
    setBillingInterval(billingInterval === 'month' ? 'year' : 'month');
  };

  return (
    <div className={`w-full ${className}`}>
      {showToggle && (
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setBillingInterval('month')}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                billingInterval === 'month'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                billingInterval === 'year'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Yearly
            </button>
            <motion.div
              className="absolute left-0 top-0 h-full bg-white dark:bg-gray-700 rounded-md shadow-sm"
              initial={false}
              animate={{
                x: billingInterval === 'month' ? 0 : '100%',
                width: '50%',
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              style={{ width: '50%' }}
            />
          </div>
          {billingInterval === 'year' && (
            <Badge variant="success" className="ml-2">
              Save 20%
            </Badge>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {plans.map((plan) => {
            const price = billingInterval === 'month' ? plan.monthlyPrice : plan.yearlyPrice;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col overflow-hidden border rounded-lg ${
                  plan.featured 
                    ? 'border-primary-500 dark:border-primary-400 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.featured && (
                  <div className="py-2 text-center text-sm font-medium text-white bg-primary-500 dark:bg-primary-600">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </p>
                  
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currency} {price}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      /{billingInterval}
                    </span>
                  </div>
                  
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <p className={`ml-3 text-sm ${
                          feature.included 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {feature.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button
                      variant={plan.featured ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => onSelectPlan(plan, billingInterval)}
                      animate={plan.featured}
                    >
                      {plan.buttonText || 'Get Started'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PricingTable;