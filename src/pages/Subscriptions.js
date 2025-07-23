import React, { useState } from 'react';
import SubscriptionPlans from '../components/SubscriptionPlans';

const Subscriptions = () => {
  const [currentPlan, setCurrentPlan] = useState('basic');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planId, price, billingCycle) => {
    setSelectedPlan({ planId, price, billingCycle });
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setCurrentPlan(selectedPlan.planId);
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock your potential with SkillBridge. Choose the plan that fits your learning goals and budget.
          </p>
        </div>

        <SubscriptionPlans 
          onPlanSelect={handlePlanSelect}
          currentPlan={currentPlan}
        />

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Complete Your Subscription</h3>
              <div className="mb-4">
                <p className="text-gray-600">Plan: {selectedPlan?.planId}</p>
                <p className="text-gray-600">
                  Amount: KES {selectedPlan?.price?.toLocaleString()} 
                  ({selectedPlan?.billingCycle})
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handlePaymentComplete}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Pay with M-Pesa
                </button>
                <button
                  onClick={handlePaymentComplete}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pay with Card
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Plan Status */}
        {currentPlan && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Your Current Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium capitalize">{currentPlan} Plan</p>
                <p className="text-gray-600">Next billing: January 15, 2024</p>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Manage Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;