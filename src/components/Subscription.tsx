import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Subscription = () => {
  const { user, setUser, applyPromo } = useUser();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscriptionPlan || 'free');
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Forever',
      features: [
        'Manual transaction entry',
        '7 days transaction history',
        'Basic expense summary',
        'Ad-supported experience',
        'No budget & goals',
        'No tax calculation',
        'No export options'
      ],
      limitations: [
        'Limited transaction history',
        'Basic insights only',
        'Cannot export reports',
        'Ads displayed'
      ],
      color: 'from-gray-400 to-gray-500',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 98,
      period: 'per month',
      features: [
        'Manual transaction tracking',
        '30 days transaction history',
        'Expense overview & insights',
        'Budget & goals overview',
        'Ad-free experience',
        'Income tax calculation',
        'Email support'
      ],
      limitations: [
        'Limited detailed insights',
        'No export functionality',
        'Basic budget tracking'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 198,
      period: 'per month',
      features: [
        'Advanced transaction tracking',
        '90 days transaction history',
        'Detailed expense & income insights',
        'Advanced budget & goals tracking',
        'Smart alerts & reminders',
        'Ad-free experience',
        'Advanced tax calculator',
        'Tax saving suggestions',
        'Priority support',
        'Web & mobile app access'
      ],
      limitations: [],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId === 'free') return;

    if (coupon.toUpperCase() === 'ZEN20' && (planId === 'pro' || planId === 'ultra')) {
      applyPromo(planId);
      return;
    }
    
    // Simulate payment process
    const confirmUpgrade = window.confirm(`Upgrade to ${planId.toUpperCase()} plan for ₹${plans.find(p => p.id === planId)?.price}/month?`);
    
    if (confirmUpgrade) {
      const updatedUser = { ...user!, subscriptionPlan: planId as 'free' | 'pro' | 'ultra' };
      setUser(updatedUser);
      localStorage.setItem('enro-user', JSON.stringify(updatedUser));
      alert(`Successfully upgraded to ${planId.toUpperCase()} plan! 🎉`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Info Banner about free subscription */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-jade-500 to-jade-400 text-white rounded-xl shadow-md px-6 py-4 flex items-center justify-center text-lg font-semibold border border-jade-600">
          🎁 You got 3 months of subscription free as a lucky user!
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock powerful features to take control of your finances. 
          From basic tracking to advanced analytics and tax optimization.
        </p>
      </div>

      <div className="max-w-sm mx-auto mb-10 text-center">
        <label htmlFor="coupon" className="block text-lg font-semibold text-gray-800 mb-3">
          Have a promotional code?
        </label>
        <input
          id="coupon"
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter ZEN20 here"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-jade-500 focus:border-transparent"
        />
      </div>

      {/* Current Plan Indicator */}
      {user && (
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            user.subscriptionPlan === 'free' ? 'bg-gray-100 text-gray-600' :
            user.subscriptionPlan === 'pro' ? 'bg-blue-100 text-blue-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            Current Plan: {user.subscriptionPlan.toUpperCase()}
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
              plan.popular ? 'ring-2 ring-blue-500 shadow-2xl' : 'shadow-lg'
            } ${user?.subscriptionPlan === plan.id ? 'ring-2 ring-green-500' : ''} bg-white`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {user?.subscriptionPlan === plan.id && (
              <div className="absolute -top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Current
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                {plan.price > 0 && <span className="text-gray-600 ml-2">{plan.period}</span>}
              </div>
              <div className={`w-12 h-1 bg-gradient-to-r ${plan.color} mx-auto rounded-full`}></div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
              {plan.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-500">{limitation}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={user?.subscriptionPlan === plan.id || plan.id === 'free'}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                user?.subscriptionPlan === plan.id
                  ? 'bg-green-100 text-green-600 cursor-not-allowed'
                  : plan.id === 'free'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transform hover:scale-105`
              }`}
            >
              {user?.subscriptionPlan === plan.id
                ? 'Current Plan'
                : plan.id === 'free'
                ? 'Free Forever'
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Features</th>
                <th className="text-center py-4 px-4">Free</th>
                <th className="text-center py-4 px-4">Pro</th>
                <th className="text-center py-4 px-4">Ultra</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Transaction History', '7 days', '30 days', '90 days'],
                ['Budget & Goals', '✗', 'Basic', 'Advanced'],
                ['Tax Calculator', '✗', '✓', '✓ + Suggestions'],
                ['Ads', '✓', '✗', '✗'],
                ['Support', 'Community', 'Email', 'Priority'],
              ].map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium">{row[0]}</td>
                  <td className="py-4 px-4 text-center">{row[1]}</td>
                  <td className="py-4 px-4 text-center">{row[2]}</td>
                  <td className="py-4 px-4 text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: "Can I cancel my subscription anytime?",
              a: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until your current billing period ends."
            },
            {
              q: "Is my financial data secure?",
              a: "Absolutely! We use bank-level encryption and security measures to protect your financial information. All data is stored securely."
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
