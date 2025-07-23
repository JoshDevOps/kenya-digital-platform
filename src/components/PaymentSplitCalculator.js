import React from 'react';
import { DollarSign, TrendingUp, Percent } from 'lucide-react';

const PaymentSplitCalculator = ({ price, sales = 0, className = '' }) => {
  const platformCommission = 0.15; // 15%
  const providerShare = 1 - platformCommission;
  
  const calculations = {
    grossRevenue: price * sales,
    platformFee: price * sales * platformCommission,
    providerEarnings: price * sales * providerShare,
    perSaleEarnings: price * providerShare
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Course Price:</span>
            <span className="font-medium">${price}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Platform Fee (15%):</span>
            <span className="font-medium text-red-600">-${(price * platformCommission).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center border-t pt-2">
            <span className="text-sm font-medium text-gray-900">Your Earnings per Sale:</span>
            <span className="font-bold text-green-600">${calculations.perSaleEarnings.toFixed(2)}</span>
          </div>
        </div>
        
        {sales > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sales:</span>
              <span className="font-medium">{sales}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gross Revenue:</span>
              <span className="font-medium">${calculations.grossRevenue.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-900">Total Earnings:</span>
              <span className="font-bold text-green-600">${calculations.providerEarnings.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">
            You keep <strong>85%</strong> of every sale - industry leading rates!
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSplitCalculator;