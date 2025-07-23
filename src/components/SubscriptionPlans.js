import React, { useState } from 'react';

const SubscriptionPlans = ({ onPlanSelect, currentPlan = null }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 999,
      yearlyPrice: 9990,
      features: ['Access to 50+ courses', 'Basic progress tracking', 'Community access', 'Mobile app'],
      color: 'border-gray-200',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      features: ['Unlimited course access', 'Advanced analytics', 'Priority support', 'Certificates', 'Offline downloads'],
      color: 'border-orange-500',
      popular: true
    },
    {
      id: 'pro',
      name: 'Professional',
      monthlyPrice: 3999,
      yearlyPrice: 39990,
      features: ['Everything in Premium', '1-on-1 coaching sessions', 'Custom learning paths', 'API access', 'White-label options'],
      color: 'border-purple-500',
      popular: false
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'yearly' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          const isCurrentPlan = currentPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border-2 ${plan.color} p-6 ${
                plan.popular ? 'shadow-xl scale-105' : 'shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(price)}
                  <span className="text-sm font-normal text-gray-600">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onPlanSelect(plan.id, price, billingCycle)}
                disabled={isCurrentPlan}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isCurrentPlan
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isCurrentPlan ? 'Current Plan' : 'Get Started'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;