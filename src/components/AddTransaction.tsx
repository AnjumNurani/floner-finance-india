
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useToast } from '@/hooks/use-toast';

const AddTransaction = () => {
  const { addTransaction } = useUser();
  const { toast } = useToast();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description && category) {
      addTransaction({
        type,
        amount: parseFloat(amount),
        description,
        category,
        date: new Date().toLocaleDateString('en-GB'),
        account: 'SBI Main'
      });
      
      // Show success toast
      toast({
        title: "Transaction Added Successfully!",
        description: `₹${amount} ${type} has been recorded.`,
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setCategory('');
    }
  };

  return (
    <div className="min-h-screen bg-nude-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jade-700">Add Transaction</h1>
          <p className="text-jade-600 mt-1">Record a new income or expense</p>
        </div>

        <div className="bg-nude-50 rounded-xl shadow-md p-6 border border-nude-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-jade-700 mb-2">
                Transaction Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    type === 'income'
                      ? 'bg-jade-100 text-jade-700 border border-jade-200'
                      : 'bg-nude-100 text-jade-600 border border-nude-200'
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    type === 'expense'
                      ? 'bg-jade-100 text-jade-700 border border-jade-200'
                      : 'bg-nude-100 text-jade-600 border border-nude-200'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-jade-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-nude-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jade-500 focus:border-transparent"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-jade-700 mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-nude-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jade-500 focus:border-transparent"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-jade-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-nude-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jade-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-jade-600 text-nude-50 py-2 px-4 rounded-lg hover:bg-jade-700 transition-colors duration-200 font-medium"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
