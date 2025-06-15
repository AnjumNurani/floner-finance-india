
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Calculator, Plus, Calendar, Star } from 'lucide-react';

const Dashboard = () => {
  const { user, transactions } = useUser();
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const recentIncome = transactions.filter(t => t.type === 'income').slice(0, 3);
  const recentExpenses = transactions.filter(t => t.type === 'expense').slice(0, 3);

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
    <div className="min-h-screen bg-gradient-to-br from-nude-50 via-nude-100 to-nude-200">
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
        {/* Enhanced Welcome Header */}
        <div className="mb-8 text-center lg:text-left">
          <div className="bg-gradient-to-r from-jade-600 to-jade-700 bg-clip-text text-transparent">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
          </div>
          <p className="text-jade-600 text-lg">Take control of your finances today</p>
          <div className="flex items-center justify-center lg:justify-start mt-3 text-sm text-jade-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/add-transaction" className="group">
            <div className="bg-gradient-to-br from-jade-500 to-jade-600 p-6 rounded-xl text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Plus className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg">Add Transaction</h3>
              <p className="text-jade-100 text-sm">Track your money</p>
            </div>
          </Link>
          
          <Link to="/budget" className="group">
            <div className="bg-gradient-to-br from-jade-400 to-jade-500 p-6 rounded-xl text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Target className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg">Budget</h3>
              <p className="text-jade-100 text-sm">Plan your spending</p>
            </div>
          </Link>
          
          <Link to="/tax-calculator" className="group">
            <div className="bg-gradient-to-br from-jade-600 to-jade-700 p-6 rounded-xl text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Calculator className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg">Tax Calculator</h3>
              <p className="text-jade-100 text-sm">Calculate taxes</p>
            </div>
          </Link>
          
          <Link to="/cashflow" className="group">
            <div className="bg-gradient-to-br from-jade-300 to-jade-400 p-6 rounded-xl text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <TrendingUp className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg">Cash Flow</h3>
              <p className="text-jade-100 text-sm">View transactions</p>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-nude-200 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-jade-400 to-jade-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-jade-700">Recent Transactions</h3>
                </div>
                <Link to="/cashflow" className="text-jade-500 text-sm hover:underline font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-nude-50 rounded-xl transition-all duration-200 border border-transparent hover:border-nude-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                        transaction.type === 'income' 
                          ? 'bg-gradient-to-br from-jade-400 to-jade-500' 
                          : 'bg-gradient-to-br from-nude-400 to-nude-500'
                      }`}>
                        {transaction.type === 'income' ? 
                          <TrendingUp className="w-5 h-5 text-white" /> : 
                          <TrendingDown className="w-5 h-5 text-white" />
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-jade-700">{transaction.description}</p>
                        <p className="text-sm text-jade-500">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.type === 'income' ? 'text-jade-600' : 'text-nude-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-jade-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-jade-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-jade-700 mb-2">No transactions yet</h4>
                    <p className="text-jade-500 mb-4">Start by adding your first transaction</p>
                    <Link to="/add-transaction" className="inline-flex items-center px-4 py-2 bg-jade-600 text-white rounded-lg hover:bg-jade-700 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Top Expenses with better styling */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-nude-200 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-nude-500 to-nude-600 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-jade-700">Top Expenses</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(expenseCategories)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([category, amount], index) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-nude-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-nude-600' : index === 1 ? 'bg-nude-500' : 'bg-nude-400'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-jade-700">{category}</span>
                      </div>
                      <span className="font-bold text-nude-600">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                
                {Object.keys(expenseCategories).length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-nude-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingDown className="w-6 h-6 text-nude-600" />
                    </div>
                    <p className="text-jade-500 text-sm">No expenses recorded yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Subscription Upgrade */}
            {user?.subscriptionPlan === 'free' && (
              <div className="bg-gradient-to-br from-jade-100 to-jade-200 rounded-2xl p-6 border border-jade-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-jade-300 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-6 h-6 text-jade-600" />
                    <h3 className="font-bold text-jade-700 text-lg">Upgrade to Pro!</h3>
                  </div>
                  <p className="text-jade-600 mb-4 text-sm leading-relaxed">
                    Unlock advanced features like detailed insights, extended transaction history, and more premium tools!
                  </p>
                  <Link
                    to="/subscription"
                    className="inline-flex items-center bg-jade-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-jade-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    View Plans
                  </Link>
                </div>
              </div>
            )}

            {/* Premium badge for non-free users */}
            {user?.subscriptionPlan !== 'free' && (
              <div className="bg-gradient-to-br from-jade-100 to-jade-200 rounded-2xl p-6 border border-jade-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-6 h-6 text-jade-600" />
                  <h3 className="font-bold text-jade-700 text-lg">Premium Member</h3>
                </div>
                <p className="text-jade-600 text-sm">
                  You're enjoying all {user.subscriptionPlan.toUpperCase()} features! 🎉
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
