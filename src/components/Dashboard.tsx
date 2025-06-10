
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user, balance, transactions, monthlyIncome, monthlyExpense } = useUser();
  const [selectedAccount, setSelectedAccount] = useState('SBI Main');

  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100 : 0;
  const financialHealthScore = Math.min(100, Math.max(0, 50 + savingsRate));

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-nude-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jade-700">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-jade-600 mt-1">Here's your financial overview for today</p>
        </div>

        {/* Account Balance Card */}
        <div className="bg-nude-100 rounded-2xl p-6 text-jade-700 mb-8 shadow-lg border border-nude-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-jade-600 text-sm">Current Balance</p>
              <h2 className="text-3xl font-bold">₹{balance.toLocaleString('en-IN')}</h2>
            </div>
            <div className="text-right">
              <p className="text-jade-600 text-sm">Connected Account</p>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="bg-nude-50 border border-nude-200 rounded-lg px-3 py-1 text-jade-700 text-sm"
              >
                <option value="SBI Main">SBI Main</option>
                {user?.subscriptionPlan !== 'free' && (
                  <>
                    <option value="HDFC Savings">HDFC Savings</option>
                    <option value="ICICI Current">ICICI Current</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nude-50 rounded-lg p-3 border border-nude-200">
              <p className="text-jade-600 text-xs">This Month Income</p>
              <p className="text-lg font-semibold text-jade-700">+₹{monthlyIncome.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-nude-50 rounded-lg p-3 border border-nude-200">
              <p className="text-jade-600 text-xs">This Month Expenses</p>
              <p className="text-lg font-semibold text-rose-600">-₹{monthlyExpense.toLocaleString('en-IN')}</p>
            </div>
          </div>
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
            {/* Financial Health Score */}
            <div className="bg-nude-50 rounded-xl shadow-md p-6 border border-nude-200">
              <h3 className="text-lg font-semibold text-jade-700 mb-4">Financial Health</h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E6D9C7"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2C775C"
                    strokeWidth="3"
                    strokeDasharray={`${financialHealthScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-jade-700">{Math.round(financialHealthScore)}</span>
                </div>
              </div>
              <p className="text-center text-sm text-jade-600">
                {financialHealthScore >= 80 ? 'Excellent! 🎉' : 
                 financialHealthScore >= 60 ? 'Good 👍' : 
                 financialHealthScore >= 40 ? 'Fair 😐' : 'Needs Improvement 📈'}
              </p>
            </div>

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
                  Unlock advanced features like multiple accounts, detailed insights, and more!
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
