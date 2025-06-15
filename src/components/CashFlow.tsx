
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { PlusCircle, Plus } from 'lucide-react';

const CashFlow = () => {
  const { user, transactions, monthlyIncome, monthlyExpense } = useUser();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.description.localeCompare(b.description);
    });

  const transactionLimits = {
    free: 7,
    pro: 30,
    ultra: 90
  };

  const maxTransactions = transactionLimits[user?.subscriptionPlan || 'free'];
  const visibleTransactions = filteredTransactions.slice(0, maxTransactions);

  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = { income: 0, expense: 0 };
    acc[t.category][t.type] += t.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  // Simple chart data for monthly trends
  const monthlyData = [
    { month: 'Jan', income: 45000, expense: 32000 },
    { month: 'Feb', income: 48000, expense: 35000 },
    { month: 'Mar', income: 52000, expense: 38000 },
    { month: 'Apr', income: 50000, expense: 36000 },
    { month: 'May', income: 55000, expense: 42000 },
    { month: 'Jun', income: monthlyIncome, expense: monthlyExpense },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-jade-800">Cash Flow Analysis</h1>
            <p className="text-jade-600 mt-1">Track your income and expenses with detailed insights</p>
          </div>
        </div>
      </div>

      {/* Add Transaction Floating Button for mobile */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <Button variant="default" size="icon" asChild className="rounded-full shadow-lg bg-jade-500 hover:bg-jade-600 text-nude-50">
          <Link to="/add-transaction">
            <Plus className="h-7 w-7" />
            <span className="sr-only">Add Transaction</span>
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-jade-100 to-jade-200 rounded-xl p-6 text-jade-800 border border-jade-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-jade-700 text-sm">Total Income</p>
              <p className="text-2xl font-bold">₹{monthlyIncome.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-nude-200 to-nude-300 rounded-xl p-6 text-nude-800 border border-nude-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nude-700 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">₹{monthlyExpense.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-3xl">📉</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-jade-200 to-jade-300 rounded-xl p-6 text-jade-800 border border-jade-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-jade-700 text-sm">Net Savings</p>
              <p className="text-2xl font-bold">₹{(monthlyIncome - monthlyExpense).toLocaleString('en-IN')}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-nude-50 rounded-xl shadow-lg p-6 mb-8 border border-nude-200">
        <h2 className="text-xl font-semibold text-jade-800 mb-6">Monthly Trends</h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyData.map((data, index) => {
            const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
            const incomeHeight = (data.income / maxValue) * 200;
            const expenseHeight = (data.expense / maxValue) * 200;
            
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center space-y-1">
                <div className="flex space-x-1 h-48 items-end">
                  <div
                    className="bg-jade-400 rounded-t"
                    style={{ height: `${incomeHeight}px`, width: '20px' }}
                    title={`Income: ₹${data.income.toLocaleString('en-IN')}`}
                  />
                  <div
                    className="bg-nude-400 rounded-t"
                    style={{ height: `${expenseHeight}px`, width: '20px' }}
                    title={`Expense: ₹${data.expense.toLocaleString('en-IN')}`}
                  />
                </div>
                <span className="text-xs text-jade-600">{data.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-jade-400 rounded"></div>
            <span className="text-sm text-jade-600">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-nude-400 rounded"></div>
            <span className="text-sm text-jade-600">Expenses</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Transactions List */}
        <div className="lg:col-span-2">
          <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-jade-800">
                Transactions 
                {user?.subscriptionPlan === 'free' && (
                  <span className="text-sm text-jade-600 font-normal">(Last 7 days)</span>
                )}
                {user?.subscriptionPlan === 'pro' && (
                  <span className="text-sm text-jade-600 font-normal">(Last 30 days)</span>
                )}
                {user?.subscriptionPlan === 'ultra' && (
                  <span className="text-sm text-jade-600 font-normal">(Last 90 days)</span>
                )}
              </h2>
              
              <div className="flex items-center space-x-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-nude-300 rounded-lg text-sm focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expenses</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-nude-300 rounded-lg text-sm focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="description">Description</option>
                </select>
                
                {/* Add Transaction Button - Right inside the transactions section */}
                <Button asChild className="bg-jade-500 hover:bg-jade-600 text-nude-50 flex items-center">
                  <Link to="/add-transaction">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Transaction
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {visibleTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 rounded-lg border border-nude-200 transition-all duration-200 hover:shadow-md hover:bg-jade-50 ${
                    index >= maxTransactions ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-jade-100' : 'bg-nude-200'
                    }`}>
                      {transaction.type === 'income' ? '⬆️' : '⬇️'}
                    </div>
                    <div>
                      <p className="font-medium text-jade-800">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-jade-600">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'income' ? 'text-jade-600' : 'text-nude-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}

              {filteredTransactions.length > maxTransactions && (
                <div className="text-center py-6">
                  <div className="text-jade-600 mb-4">
                    {filteredTransactions.length - maxTransactions} more transactions available
                  </div>
                  <a
                    href="/subscription"
                    className="bg-jade-500 text-nude-50 px-6 py-2 rounded-lg hover:bg-jade-600 transition-colors duration-200"
                  >
                    Upgrade to View All
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-6">
          <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
            <h3 className="text-lg font-semibold text-jade-800 mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([category, amounts]) => {
                const total = amounts.expense;
                const percentage = monthlyExpense > 0 ? (total / monthlyExpense) * 100 : 0;
                
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-jade-700">{category}</span>
                      <span className="text-sm text-jade-600">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-nude-200 rounded-full h-2">
                      <div
                        className="bg-jade-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-jade-600 mt-1">{percentage.toFixed(1)}% of expenses</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Options (Premium) */}
          {user?.subscriptionPlan === 'ultra' && (
            <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
              <h3 className="text-lg font-semibold text-jade-800 mb-4">Export Reports</h3>
              <div className="space-y-3">
                <button className="w-full bg-jade-500 text-nude-50 py-2 px-4 rounded-lg hover:bg-jade-600 transition-colors duration-200">
                  📄 Export as PDF
                </button>
                <button className="w-full bg-nude-500 text-nude-50 py-2 px-4 rounded-lg hover:bg-nude-600 transition-colors duration-200">
                  📊 Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
