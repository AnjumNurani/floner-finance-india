
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: { category: string; budgeted: number; icon: string }) => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [category, setCategory] = useState('');
  const [budgeted, setBudgeted] = useState('');
  const [icon, setIcon] = useState('📊');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && budgeted) {
      onAdd({
        category,
        budgeted: parseFloat(budgeted),
        icon
      });
      setCategory('');
      setBudgeted('');
      setIcon('📊');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-nude-50 rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-jade-800 mb-4">Add Budget Category</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Category Name</label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Groceries, Gas, etc."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Budget Amount (₹)</label>
            <Input
              type="number"
              value={budgeted}
              onChange={(e) => setBudgeted(e.target.value)}
              placeholder="5000"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Icon</label>
            <div className="flex space-x-2 mb-2">
              {['📊', '🍽️', '🚗', '🏠', '💊', '🎬', '🛒', '💡', '📱', '✈️'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`p-2 rounded-lg border-2 ${
                    icon === emoji ? 'border-jade-500 bg-jade-100' : 'border-nude-200 bg-nude-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-jade-500 hover:bg-jade-600 text-nude-50"
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;

