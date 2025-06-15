
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import StarFLogo from './StarFLogo';
import HelpModal from './HelpModal';
import { Menu, X, HelpCircle, Home, TrendingUp, Target, Calculator, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useUser();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('enro-user');
    setUser(null);
  };

  const handleHelpClick = () => {
    setIsHelpModalOpen(true);
    setIsSidebarOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Cash Flow', href: '/cashflow', icon: TrendingUp },
    { name: 'Budget', href: '/budget', icon: Target },
    { name: 'Tax Calc', href: '/tax-calculator', icon: Calculator },
    { name: 'Add Transaction', href: '/add-transaction', icon: Plus },
  ];

  return (
    <>
      <nav className="bg-nude-50 shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-nude-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <StarFLogo size={36} />
                <span className="text-xl font-bold text-jade-600">Fenqro</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-jade-100 text-jade-700' 
                        : 'text-jade-600 hover:bg-nude-100 hover:text-jade-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Subscription Badge */}
              <Link
                to="/subscription"
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.subscriptionPlan === 'free'
                    ? 'bg-nude-100 text-jade-600'
                    : user?.subscriptionPlan === 'pro'
                    ? 'bg-nude-200 text-jade-700'
                    : 'bg-jade-100 text-jade-700'
                }`}
              >
                {user?.subscriptionPlan?.toUpperCase()}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group hidden md:block">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-nude-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-jade-100 rounded-full flex items-center justify-center text-jade-700 font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-jade-700">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-nude-50 rounded-lg shadow-lg border border-nude-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/subscription"
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100"
                  >
                    Plan Upgrade
                  </Link>
                  <Link
                    to="/terms"
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/privacy"
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100"
                  >
                    Privacy Policy
                  </Link>
                  <button
                    onClick={handleHelpClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </button>
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
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-nude-100 text-jade-600"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Only Profile and Settings, no duplicate navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-16 left-0 w-64 h-full bg-nude-50 shadow-lg border-r border-nude-200 transform transition-transform duration-300">
            <div className="p-4">
              {/* User Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-jade-100 rounded-full flex items-center justify-center text-jade-700 font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-jade-700">{user?.name}</p>
                    <p className="text-xs text-jade-500">{user?.subscriptionPlan?.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/subscription"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg"
                  >
                    Plan Upgrade
                  </Link>
                  <Link
                    to="/terms"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/privacy"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg"
                  >
                    Privacy Policy
                  </Link>
                  <button
                    onClick={handleHelpClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-jade-600 hover:bg-nude-100 rounded-lg cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
};

export default Navbar;
