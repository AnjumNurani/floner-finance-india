
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const TaxCalculator = () => {
  const { user, monthlyIncome } = useUser();
  const [annualIncome, setAnnualIncome] = useState(monthlyIncome * 12);
  const [age, setAge] = useState('below60');
  const [deductions, setDeductions] = useState({
    section80C: 0,
    section80D: 0,
    hra: 0,
    lta: 0,
    professionalTax: 0
  });

  // Indian Income Tax Slabs for FY 2023-24
  const calculateTax = () => {
    let taxableIncome = annualIncome;
    
    // Apply deductions
    const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
    taxableIncome = Math.max(0, taxableIncome - totalDeductions);

    let tax = 0;
    let standardDeduction = 50000; // Standard deduction of ₹50,000
    taxableIncome = Math.max(0, taxableIncome - standardDeduction);

    // Tax slabs based on age
    let exemptionLimit = 250000; // Below 60 years
    if (age === '60to80') exemptionLimit = 300000; // 60-80 years
    if (age === 'above80') exemptionLimit = 500000; // Above 80 years

    if (taxableIncome <= exemptionLimit) {
      tax = 0;
    } else {
      let remainingIncome = taxableIncome - exemptionLimit;
      
      // 5% for income between exemption limit and 5 lakh
      if (remainingIncome > 0) {
        const taxableAt5 = Math.min(remainingIncome, 250000);
        tax += taxableAt5 * 0.05;
        remainingIncome -= taxableAt5;
      }
      
      // 20% for income between 5 lakh and 10 lakh
      if (remainingIncome > 0) {
        const taxableAt20 = Math.min(remainingIncome, 500000);
        tax += taxableAt20 * 0.20;
        remainingIncome -= taxableAt20;
      }
      
      // 30% for income above 10 lakh
      if (remainingIncome > 0) {
        tax += remainingIncome * 0.30;
      }
    }

    // Add 4% Health and Education Cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      grossIncome: annualIncome,
      totalDeductions,
      taxableIncome: Math.max(0, annualIncome - totalDeductions - standardDeduction),
      tax,
      cess,
      totalTax,
      netIncome: annualIncome - totalTax,
      monthlyTax: totalTax / 12,
      effectiveRate: annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0
    };
  };

  const taxDetails = calculateTax();

  const taxSavingTips = [
    "Invest up to ₹1.5 lakh in ELSS mutual funds under Section 80C",
    "Get health insurance to claim deduction under Section 80D",
    "Contribute to National Pension System (NPS) for additional ₹50,000 deduction",
    "Keep HRA receipts if you're paying rent",
    "Consider tax-saving fixed deposits",
    "Donate to charity for deduction under Section 80G"
  ];

  if (user?.subscriptionPlan === 'free') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-jade-800 mb-4">Tax Calculator</h1>
          <p className="text-jade-600 mb-8">Upgrade to Pro or Ultra to access the Indian Income Tax Calculator</p>
          
          <div className="bg-gradient-to-r from-jade-500 to-jade-600 rounded-xl p-8 text-nude-50 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Unlock Tax Calculator</h3>
            <ul className="text-left text-nude-100 mb-6 space-y-2">
              <li>✓ Accurate Indian tax calculations</li>
              <li>✓ Deduction optimization</li>
              <li>✓ Tax saving suggestions</li>
              <li>✓ Year-round tax planning</li>
            </ul>
            <a
              href="/subscription"
              className="bg-nude-50 text-jade-600 px-6 py-3 rounded-lg font-semibold hover:bg-nude-100 transition-colors duration-200 inline-block"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jade-800">Income Tax Calculator</h1>
        <p className="text-jade-600 mt-1">Calculate your Indian income tax for FY 2023-24</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
          <h2 className="text-xl font-semibold text-jade-700 mb-6">Income & Deductions</h2>
          
          <div className="space-y-6">
            {/* Annual Income */}
            <div>
              <label className="block text-sm font-medium text-jade-700 mb-2">
                Annual Income (₹)
              </label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full px-4 py-3 border border-nude-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                placeholder="Enter your annual income"
              />
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-medium text-jade-700 mb-2">
                Age Group
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-nude-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
              >
                <option value="below60">Below 60 years</option>
                <option value="60to80">60-80 years</option>
                <option value="above80">Above 80 years</option>
              </select>
            </div>

            {/* Deductions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-jade-700">Deductions</h3>
              
              <div>
                <label className="block text-sm font-medium text-jade-700 mb-1">
                  Section 80C (ELSS, PPF, etc.) - Max ₹1.5L
                </label>
                <input
                  type="number"
                  value={deductions.section80C}
                  onChange={(e) => setDeductions({...deductions, section80C: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-nude-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                  placeholder="0"
                  max="150000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-jade-700 mb-1">
                  Section 80D (Health Insurance)
                </label>
                <input
                  type="number"
                  value={deductions.section80D}
                  onChange={(e) => setDeductions({...deductions, section80D: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-nude-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-jade-700 mb-1">
                  HRA (House Rent Allowance)
                </label>
                <input
                  type="number"
                  value={deductions.hra}
                  onChange={(e) => setDeductions({...deductions, hra: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-nude-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent bg-nude-100"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tax Calculation Results */}
        <div className="space-y-6">
          {/* Tax Summary */}
          <div className="bg-gradient-to-br from-jade-500 to-jade-600 rounded-xl p-6 text-nude-50 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Annual Tax</span>
                <span className="font-bold">₹{taxDetails.totalTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Tax</span>
                <span className="font-bold">₹{Math.round(taxDetails.monthlyTax).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Effective Rate</span>
                <span className="font-bold">{taxDetails.effectiveRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between border-t border-jade-400 pt-2">
                <span>Net Annual Income</span>
                <span className="font-bold">₹{taxDetails.netIncome.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
            <h3 className="text-lg font-semibold text-jade-700 mb-4">Detailed Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-jade-600">Gross Income</span>
                <span>₹{taxDetails.grossIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-jade-600">Total Deductions</span>
                <span>₹{taxDetails.totalDeductions.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-jade-600">Standard Deduction</span>
                <span>₹50,000</span>
              </div>
              <div className="flex justify-between border-t border-nude-200 pt-2">
                <span className="text-jade-600">Taxable Income</span>
                <span className="font-semibold">₹{taxDetails.taxableIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-jade-600">Income Tax</span>
                <span>₹{taxDetails.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-jade-600">Health & Education Cess (4%)</span>
                <span>₹{taxDetails.cess.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Tax Saving Tips */}
          {user?.subscriptionPlan === 'ultra' && (
            <div className="bg-nude-50 rounded-xl shadow-lg p-6 border border-nude-200">
              <h3 className="text-lg font-semibold text-jade-700 mb-4">💡 Tax Saving Tips</h3>
              <div className="space-y-2">
                {taxSavingTips.slice(0, 3).map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-jade-500 mt-1">•</span>
                    <span className="text-sm text-jade-600">{tip}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-jade-600 text-sm font-medium hover:underline">
                View All Tips →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
