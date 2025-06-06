
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import StarFLogo from './StarFLogo';

const Navbar = () => {
  const { user, setUser } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Cash Flow', href: '/cashflow', icon: '📊' },
    { name: 'Budget', href: '/budget', icon: '🎯' },
    { name: 'Tax Calculator', href: '/tax-calculator', icon: '🧮' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('floner-user');
    setUser(null);
  };

  return (
    <nav className="bg-green-50 shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <StarFLogo size={36} />
              <span className="text-xl font-bold text-green-700">Floner</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'bg-green-200 text-green-800'
                    : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Subscription Badge */}
            <Link
              to="/subscription"
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user?.subscriptionPlan === 'free'
                  ? 'bg-green-100 text-green-600'
                  : user?.subscriptionPlan === 'pro'
                  ? 'bg-green-200 text-green-700'
                  : 'bg-green-300 text-green-800'
              }`}
            >
              {user?.subscriptionPlan?.toUpperCase()}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-100 transition-colors duration-200">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block text-sm font-medium text-green-700">
                  {user?.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
                  location.pathname === item.href
                    ? 'text-green-800 bg-green-100'
                    : 'text-green-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
