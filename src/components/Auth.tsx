
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Auth = () => {
  const { setUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create user object
    const user = {
      id: Date.now().toString(),
      name: formData.name || 'User',
      email: formData.email,
      phone: formData.phone,
      subscriptionPlan: 'free' as const,
      connectedAccounts: 0
    };

    // Save to localStorage and context
    localStorage.setItem('enro-user', JSON.stringify(user));
    setUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nude-50 to-jade-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">💰</div>
          <h1 className="text-3xl font-bold text-jade-600">Fenqro</h1>
          <p className="text-nude-600">Your Smart Finance Manager</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex rounded-lg bg-nude-100 p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin ? 'bg-jade-500 text-white shadow-sm' : 'text-nude-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin ? 'bg-jade-500 text-white shadow-sm' : 'text-nude-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-jade-500 to-jade-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-jade-600 hover:to-jade-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-6 pt-6 border-t border-nude-200">
            <button
              onClick={() => {
                const demoUser = {
                  id: 'demo',
                  name: 'Demo User',
                  email: 'demo@fenqro.com',
                  phone: '+91 9876543210',
                  subscriptionPlan: 'free' as const,
                  connectedAccounts: 1
                };
                localStorage.setItem('enro-user', JSON.stringify(demoUser));
                setUser(demoUser);
              }}
              className="w-full bg-nude-100 text-nude-700 py-2 px-4 rounded-lg font-medium hover:bg-nude-200 transition-all duration-200"
            >
              Try Demo Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
