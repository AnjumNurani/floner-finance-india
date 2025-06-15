
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Onboarding = () => {
  const { setIsOnboarded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Fenqro",
      description: "Your personal finance manager for smarter money decisions",
      image: "💰",
      color: "from-jade-400 to-jade-500"
    },
    {
      title: "Track Your Expenses",
      description: "Connect your bank accounts and monitor every transaction seamlessly",
      image: "📊",
      color: "from-jade-400 to-jade-500"
    },
    {
      title: "Plan Your Budget",
      description: "Set budgets, create goals, and achieve your financial dreams",
      image: "🎯",
      color: "from-jade-400 to-jade-500"
    },
    {
      title: "Calculate Your Taxes",
      description: "Get accurate Indian income tax calculations and save money legally",
      image: "🧮",
      color: "from-jade-400 to-jade-500"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('enro-onboarded', 'true');
      setIsOnboarded(true);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('enro-onboarded', 'true');
    setIsOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nude-50 to-jade-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-jade-500' : 'bg-nude-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Card */}
        <div className={`bg-gradient-to-br ${steps[currentStep].color} rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105`}>
          {/* Animated Character */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">
              {steps[currentStep].image}
            </div>
            <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
            <p className="text-white/90 leading-relaxed">{steps[currentStep].description}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleSkip}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Skip
            </button>
            
            <button
              onClick={handleNext}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>

        {/* Fenqro Branding */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-jade-600">Fenqro</h2>
          <p className="text-nude-600">Smart Finance, Smarter You</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
