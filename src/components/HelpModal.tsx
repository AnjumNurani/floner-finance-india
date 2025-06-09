
import React from 'react';
import { X, Mail, Phone, MessageCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 m-4 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Help & Support</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-jade-50 rounded-lg">
            <h3 className="font-semibold text-jade-700 mb-2">Quick Help</h3>
            <p className="text-sm text-jade-600">
              Need assistance with Enro? Our support team is here to help you manage your finances better.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:support@enro.com"
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 text-jade-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-500">support@enro.com</p>
              </div>
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 text-jade-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </a>

            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <MessageCircle className="w-5 h-5 text-jade-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-500">Available 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
