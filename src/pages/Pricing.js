import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Star, Users, Zap, Crown, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Access to 10 free courses',
        'Basic community access',
        'Course completion certificates',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'No live sessions',
        'No 1-on-1 mentoring',
        'No advanced analytics',
        'No priority support'
      ],
      icon: Users,
      color: 'gray',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'For serious learners',
      features: [
        'Access to all 500+ courses',
        'Live interactive sessions',
        'Priority community access',
        'Advanced progress tracking',
        'Downloadable resources',
        'Mobile offline access',
        'Priority email support',
        'Industry certifications'
      ],
      limitations: [
        'No 1-on-1 mentoring',
        'No custom learning paths'
      ],
      icon: Zap,
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        '1-on-1 expert mentoring',
        'Custom learning paths',
        'Team management dashboard',
        'Advanced analytics & reporting',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Priority phone support',
        'SLA guarantee'
      ],
      limitations: [],
      icon: Crown,
      color: 'blue',
      popular: false
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      gray: {
        bg: 'bg-gray-500',
        text: 'text-gray-600',
        border: 'border-gray-200',
        button: 'bg-gray-600 hover:bg-gray-700'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    };
    return colors[color][type];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillBridge
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-300">
            Choose the perfect plan for your learning journey. Start free, upgrade anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-800/50 rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-slate-900' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-slate-900' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = plan.price[billingCycle];
              
              return (
                <div 
                  key={index} 
                  className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`${getColorClasses(plan.color, 'bg')} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                      <p className="text-slate-600 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-5xl font-bold text-slate-900">${price}</span>
                        {price > 0 && (
                          <span className="text-slate-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                        )}
                      </div>
                      
                      <Link
                        to="/register"
                        className={`w-full ${getColorClasses(plan.color, 'button')} text-white py-3 px-6 rounded-xl font-semibold transition-colors block text-center`}
                      >
                        {plan.name === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                      </Link>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800 mb-3">What's included:</h4>
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="font-semibold text-slate-800 mb-3 mt-6">Not included:</h4>
                          {plan.limitations.map((limitation, limitIndex) => (
                            <div key={limitIndex} className="flex items-center">
                              <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                              <span className="text-slate-500">{limitation}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: 'Can I switch plans anytime?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing differences.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'All paid plans come with a 14-day free trial. No credit card required to start your trial.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and M-Pesa for Kenyan users.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely! You can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners advancing their careers with SkillBridge
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;