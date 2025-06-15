
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, transactions } = useUser();
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  useEffect(() => {
    if (user && user.subscriptionPlan !== 'free') {
      const hasSeenPremiumNotification = localStorage.getItem('premiumNotificationSeen');
      if (!hasSeenPremiumNotification) {
        setShowSubscriptionPopup(true);
      }
    }
  }, [user]);

  const handleClosePopup = () => {
    localStorage.setItem('premiumNotificationSeen', 'true');
    setShowSubscriptionPopup(false);
  };

  return (
    <div className="min-h-screen bg-nude-50">
      {/* Full-screen subscription popup */}
      <Dialog open={showSubscriptionPopup} onOpenChange={handleClosePopup}>
        <DialogContent className="max-w-2xl w-full h-screen max-h-screen sm:h-auto sm:max-h-[90vh] flex flex-col justify-center">
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-jade-700 mb-4">
              Congratulations!
            </h2>
            <p className="text-xl text-jade-600 mb-6">
              You got <span className="font-bold text-jade-700">3 months of subscription free</span> as a lucky user!
            </p>
            <div className="bg-jade-100 rounded-lg p-6 mb-6 border border-jade-200">
              <p className="text-jade-700 text-lg font-semibold">
                🚀 Your {user?.subscriptionPlan?.toUpperCase()} plan is now active!
              </p>
              <p className="text-jade-600 mt-2">
                Enjoy all premium features unlocked until September 2025
              </p>
            </div>
            <Button 
              onClick={handleClosePopup}
              className="bg-jade-600 hover:bg-jade-700 text-white px-8 py-3 text-lg"
            >
              Start Exploring Premium Features
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jade-700">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-jade-600 mt-1">Here's your financial overview for today</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-nude-50 rounded-xl shadow-md p-6 border border-nude-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-jade-700">Recent Transactions</h3>
                <Link to="/cashflow" className="text-jade-500 text-sm hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-nude-100 rounded-lg transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-jade-100' : 'bg-rose-100'
                      }`}>
                        {transaction.type === 'income' ? '⬆️' : '⬇️'}
                      </div>
                      <div>
                        <p className="font-medium text-jade-700">{transaction.description}</p>
                        <p className="text-sm text-jade-500">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-jade-600' : 'text-rose-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expense Breakdown */}
            <div className="bg-nude-50 rounded-xl shadow-md p-6 border border-nude-200">
              <h3 className="text-lg font-semibold text-jade-700 mb-4">Top Expenses</h3>
              <div className="space-y-3">
                {Object.entries(expenseCategories)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-jade-600">{category}</span>
                      <span className="font-semibold text-rose-600">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Subscription Upgrade Prompt */}
            {user?.subscriptionPlan === 'free' && (
              <div className="bg-jade-100 rounded-xl p-6 text-jade-700 border border-jade-200">
                <h3 className="font-semibold mb-2">Upgrade to Pro!</h3>
                <p className="text-sm text-jade-600 mb-3">
                  Unlock advanced features like detailed insights, extended transaction history, and more!
                </p>
                <Link
                  to="/subscription"
                  className="bg-nude-50 text-jade-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-nude-100 transition-colors duration-200 inline-block border border-nude-200"
                >
                  View Plans
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
