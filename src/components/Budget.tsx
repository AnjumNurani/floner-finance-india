
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  icon: string;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
}

const Budget = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('budget');

  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: '1', category: 'Food & Dining', budgeted: 8000, spent: 5200, icon: '🍽️' },
    { id: '2', category: 'Transportation', budgeted: 3000, spent: 2100, icon: '🚗' },
    { id: '3', category: 'Entertainment', budgeted: 2000, spent: 800, icon: '🎬' },
    { id: '4', category: 'Shopping', budgeted: 5000, spent: 3200, icon: '🛒' },
    { id: '5', category: 'Utilities', budgeted: 2500, spent: 2200, icon: '💡' },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Emergency Fund', target: 100000, current: 35000, deadline: '2024-12-31', icon: '🏦' },
    { id: '2', title: 'Vacation to Goa', target: 25000, current: 12000, deadline: '2024-08-15', icon: '🏖️' },
    { id: '3', title: 'New Laptop', target: 80000, current: 45000, deadline: '2024-09-30', icon: '💻' },
  ]);

  const canManageBudgets = user?.subscriptionPlan !== 'free';

  if (!canManageBudgets) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Budget & Goals</h1>
          <p className="text-gray-600 mb-8">Upgrade to Pro or Ultra to create and manage budgets and financial goals</p>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Unlock Budget Management</h3>
            <ul className="text-left text-blue-100 mb-6 space-y-2">
              <li>✓ Create custom budgets</li>
              <li>✓ Set financial goals</li>
              <li>✓ Track progress</li>
              <li>✓ Get alerts & reminders</li>
            </ul>
            <a
              href="/subscription"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-block"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const budgetUtilization = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budget & Goals</h1>
        <p className="text-gray-600 mt-1">Plan your finances and achieve your dreams</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-8 max-w-md">
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'budget' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600'
          }`}
        >
          📊 Budgets
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'goals' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600'
          }`}
        >
          🎯 Goals
        </button>
      </div>

      {activeTab === 'budget' && (
        <div>
          {/* Budget Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Budgeted</p>
                  <p className="text-2xl font-bold">₹{totalBudgeted.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold">₹{totalSpent.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-3xl">💸</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Remaining</p>
                  <p className="text-2xl font-bold">₹{(totalBudgeted - totalSpent).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-3xl">🏦</div>
              </div>
            </div>
          </div>

          {/* Budget Utilization */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Budget Utilization</h2>
              <span className="text-sm text-gray-500">{budgetUtilization.toFixed(1)}% used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${
                  budgetUtilization > 90 ? 'bg-red-500' : 
                  budgetUtilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {budgetUtilization > 90 ? '⚠️ You\'re close to your budget limit!' :
               budgetUtilization > 75 ? '⚡ Good spending pace, watch your expenses' :
               '✅ You\'re doing great with your budget!'}
            </p>
          </div>

          {/* Budget Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Budget Categories</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                + Add Category
              </button>
            </div>

            <div className="space-y-6">
              {budgets.map((budget) => {
                const percentage = budget.budgeted > 0 ? (budget.spent / budget.budgeted) * 100 : 0;
                const remaining = budget.budgeted - budget.spent;
                
                return (
                  <div key={budget.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{budget.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{budget.category}</h3>
                          <p className="text-sm text-gray-500">
                            ₹{budget.spent.toLocaleString('en-IN')} of ₹{budget.budgeted.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {remaining >= 0 ? `₹${remaining.toLocaleString('en-IN')} left` : `₹${Math.abs(remaining).toLocaleString('en-IN')} over`}
                        </p>
                        <p className="text-sm text-gray-500">{percentage.toFixed(1)}% used</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          percentage > 100 ? 'bg-red-500' :
                          percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div>
          {/* Goals Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Active Goals</p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Total Target</p>
                  <p className="text-2xl font-bold">₹{goals.reduce((sum, g) => sum + g.target, 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-3xl">🏆</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Progress</p>
                  <p className="text-2xl font-bold">
                    {goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + (g.current / g.target) * 100, 0) / goals.length) : 0}%
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>
          </div>

          {/* Goals List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Financial Goals</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                + Add Goal
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
                const remaining = goal.target - goal.current;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{goal.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-500">
                          Target: ₹{goal.target.toLocaleString('en-IN')} by {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress: ₹{goal.current.toLocaleString('en-IN')}</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          ₹{remaining.toLocaleString('en-IN')} remaining
                        </p>
                        <p className="text-xs text-gray-500">
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                        </p>
                      </div>
                      <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors duration-200">
                        Add Funds
                      </button>
                    </div>

                    {user?.subscriptionPlan === 'ultra' && daysLeft <= 30 && daysLeft > 0 && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800">
                          🔔 Reminder: Goal deadline approaching in {daysLeft} days
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
