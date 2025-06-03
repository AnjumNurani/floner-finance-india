
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Settings = () => {
  const { user, setUser } = useUser();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      budgetAlerts: true,
      goalReminders: true,
      weeklyReports: false
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketingEmails: false
    },
    display: {
      currency: 'INR',
      dateFormat: 'DD/MM/YYYY',
      theme: 'light',
      language: 'en'
    }
  });

  const sections = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'display', name: 'Display', icon: '🎨' },
    { id: 'account', name: 'Account', icon: '👤' }
  ];

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !prev[section as keyof typeof prev][key as keyof typeof prev[section as keyof typeof prev]]
      }
    }));
  };

  const handleSelectChange = (section: string, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.'
    );
    
    if (confirm) {
      const secondConfirm = window.confirm('This is your final warning. Type DELETE to confirm.');
      if (secondConfirm) {
        localStorage.removeItem('floner-user');
        localStorage.removeItem('floner-onboarded');
        setUser(null);
        alert('Your account has been deleted.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{section.icon}</span>
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeSection === 'general' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                            SBI
                          </div>
                          <div>
                            <p className="font-medium">SBI Main Account</p>
                            <p className="text-sm text-gray-500">••••3456 • Connected</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Disconnect
                        </button>
                      </div>
                      
                      {user?.subscriptionPlan !== 'free' && (
                        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors duration-200">
                          + Connect Another Account
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Export</h3>
                    {user?.subscriptionPlan === 'ultra' ? (
                      <div className="space-y-3">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                          Export All Data
                        </button>
                        <p className="text-sm text-gray-500">
                          Download all your financial data in CSV format
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Data export is available with Ultra plan</p>
                        <a href="/subscription" className="text-green-600 hover:underline text-sm">
                          Upgrade to Ultra →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email Notifications', desc: 'Receive important updates via email' },
                        { key: 'push', label: 'Push Notifications', desc: 'Get real-time alerts on your device' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                              onChange={() => handleToggle('notifications', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Alerts</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'budgetAlerts', label: 'Budget Alerts', desc: 'Get notified when approaching budget limits' },
                        { key: 'goalReminders', label: 'Goal Reminders', desc: 'Reminders to contribute to your financial goals' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly financial summary reports' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                              onChange={() => handleToggle('notifications', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Privacy</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'dataSharing', label: 'Data Sharing', desc: 'Allow sharing anonymized data for research' },
                        { key: 'analytics', label: 'Analytics', desc: 'Help improve our app with usage analytics' },
                        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and offers' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                              onChange={() => handleToggle('privacy', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                    <div className="space-y-3">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                        Change Password
                      </button>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'display' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Display Preferences</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      key: 'currency',
                      label: 'Currency',
                      desc: 'Default currency for displaying amounts',
                      type: 'select',
                      options: [
                        { value: 'INR', label: 'Indian Rupee (₹)' },
                        { value: 'USD', label: 'US Dollar ($)' },
                        { value: 'EUR', label: 'Euro (€)' }
                      ]
                    },
                    {
                      key: 'dateFormat',
                      label: 'Date Format',
                      desc: 'How dates are displayed throughout the app',
                      type: 'select',
                      options: [
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                      ]
                    },
                    {
                      key: 'language',
                      label: 'Language',
                      desc: 'App interface language',
                      type: 'select',
                      options: [
                        { value: 'en', label: 'English' },
                        { value: 'hi', label: 'हिंदी (Hindi)' },
                        { value: 'mr', label: 'मराठी (Marathi)' }
                      ]
                    }
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                      <select
                        value={settings.display[item.key as keyof typeof settings.display]}
                        onChange={(e) => handleSelectChange('display', item.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {item.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Management</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Plan: {user?.subscriptionPlan?.toUpperCase()}</p>
                          <p className="text-sm text-gray-500">
                            {user?.subscriptionPlan === 'free' ? 'Free forever' : 'Next billing: July 3, 2024'}
                          </p>
                        </div>
                        <a
                          href="/subscription"
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          {user?.subscriptionPlan === 'free' ? 'Upgrade' : 'Manage'}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Support</h3>
                    <div className="space-y-3">
                      <a
                        href="/help"
                        className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <span>❓</span>
                          <div>
                            <p className="font-medium">Help Center</p>
                            <p className="text-sm text-gray-500">Find answers to common questions</p>
                          </div>
                        </div>
                      </a>
                      
                      <a
                        href="mailto:support@floner.com"
                        className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <span>📧</span>
                          <div>
                            <p className="font-medium">Contact Support</p>
                            <p className="text-sm text-gray-500">Get help from our support team</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
