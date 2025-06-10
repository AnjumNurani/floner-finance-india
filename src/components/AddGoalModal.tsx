
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: { title: string; target: number; deadline: string; icon: string }) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [icon, setIcon] = useState('🎯');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && target && deadline) {
      onAdd({
        title,
        target: parseFloat(target),
        deadline,
        icon
      });
      setTitle('');
      setTarget('');
      setDeadline('');
      setIcon('🎯');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-nude-50 rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-jade-800 mb-4">Add Financial Goal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Goal Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Emergency Fund, New Car, etc."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Target Amount (₹)</label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="50000"
              min="0"
              step="1000"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Target Date</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-jade-700 mb-1">Icon</label>
            <div className="flex space-x-2 mb-2">
              {['🎯', '🏦', '🏖️', '💻', '🚗', '🏠', '💍', '🎓', '✈️', '📱'].map((emoji) => (
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
              Add Goal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
