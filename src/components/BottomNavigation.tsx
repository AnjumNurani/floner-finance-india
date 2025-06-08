
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Target, Calculator, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Cash Flow', href: '/cashflow', icon: TrendingUp },
    { name: 'Budget', href: '/budget', icon: Target },
    { name: 'Tax Calc', href: '/tax-calculator', icon: Calculator },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-nude-50 border-t border-nude-200 z-40 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200 ${
                isActive 
                  ? 'text-jade-600' 
                  : 'text-jade-400 hover:text-jade-600'
              }`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 ${
                  isActive ? 'text-jade-600' : 'text-jade-400'
                }`} 
              />
              <span className={`text-xs font-medium truncate ${
                isActive ? 'text-jade-600' : 'text-jade-400'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
