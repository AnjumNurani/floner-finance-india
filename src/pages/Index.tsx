
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from '../components/Onboarding';
import Auth from '../components/Auth';
import Dashboard from '../components/Dashboard';
import CashFlow from '../components/CashFlow';
import Budget from '../components/Budget';
import TaxCalculator from '../components/TaxCalculator';
import Settings from '../components/Settings';
import Profile from '../components/Profile';
import Subscription from '../components/Subscription';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfService from '../components/TermsOfService';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { useUser } from '../context/UserContext';

const Index = () => {
  const { user, isOnboarded } = useUser();

  if (!isOnboarded) {
    return <Onboarding />;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-nude-50">
      <Navbar />
      <div className="pt-16 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cashflow" element={<CashFlow />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Index;
