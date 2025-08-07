'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: "What is EMI and how is it calculated?",
    answer: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower monthly. It's calculated using the loan amount, interest rate, and tenure using the formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]"
  },
  {
    question: "What factors affect my EMI amount?",
    answer: "EMI depends on three main factors: Principal loan amount (higher amount = higher EMI), Interest rate (higher rate = higher EMI), and Loan tenure (longer tenure = lower EMI but higher total interest)."
  },
  {
    question: "Should I choose a longer or shorter loan tenure?",
    answer: "Shorter tenure means higher EMI but less total interest paid. Longer tenure means lower EMI but more total interest. Choose based on your monthly income and financial goals."
  },
  {
    question: "Can I prepay my loan to reduce EMI burden?",
    answer: "Yes, prepaying your loan reduces the outstanding principal, which can either reduce your EMI amount or loan tenure. Most banks allow prepayment with minimal or no charges."
  }
];

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseFloat(tenure) * 12;

    if (principal <= 0 || interestRate <= 0 || tenure <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal)
    });
  };

  const toolSchema = generateToolSchema({
    title: 'EMI Calculator - Calculate Loan EMI Online',
    description: 'Calculate your loan EMI (Equated Monthly Installment) with our free online EMI calculator. Get instant results for home loans, personal loans, and car loans.',
    url: '/finance/emi-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toolSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EMI Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your Equated Monthly Installment (EMI) for home loans, personal loans, and car loans. 
            Plan your finances better with accurate EMI calculations.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Loan Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg font-medium bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg font-medium bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                  placeholder="Enter interest rate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg font-medium bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                  placeholder="Enter loan tenure"
                />
              </div>

              <button
                onClick={calculateEMI}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Calculate EMI
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">EMI Breakdown</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="text-sm text-primary font-medium">Monthly EMI</div>
                  <div className="text-3xl font-bold text-foreground">
                    ₹{result.emi.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">Principal Amount</div>
                    <div className="text-lg font-semibold text-foreground">
                      ₹{result.principal.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">Total Interest</div>
                    <div className="text-lg font-semibold text-foreground">
                      ₹{result.totalInterest.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/20">
                  <div className="text-sm text-green-600 dark:text-green-400">Total Amount Payable</div>
                  <div className="text-2xl font-bold text-foreground">
                    ₹{result.totalAmount.toLocaleString()}
                  </div>
                </div>

                {/* Interest vs Principal Chart */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Amount Breakdown</h3>
                  <div className="flex h-8 rounded-lg overflow-hidden border border-border">
                    <div 
                      className="bg-primary/90 flex items-center justify-center text-primary-foreground text-xs font-medium transition-all duration-500"
                      style={{ width: `${(result.principal / result.totalAmount) * 100}%` }}
                    >
                      Principal ({(result.principal / result.totalAmount * 100).toFixed(1)}%)
                    </div>
                    <div 
                      className="bg-amber-500/90 flex items-center justify-center text-amber-50 text-xs font-medium transition-all duration-500"
                      style={{ width: `${(result.totalInterest / result.totalAmount) * 100}%` }}
                    >
                      Interest ({(result.totalInterest / result.totalAmount * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <p>Enter loan details and click "Calculate EMI" to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* Tips */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">EMI Planning Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center">
                <span className="mr-2">💡</span> Choose the Right Tenure
              </h3>
              <p className="text-muted-foreground text-sm">
                Longer tenure reduces EMI but increases total interest. Choose a balance that fits your monthly budget and financial goals.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center">
                <span className="mr-2">📊</span> Compare Interest Rates
              </h3>
              <p className="text-muted-foreground text-sm">
                Even a 0.5% difference in interest rate can save lakhs over the loan tenure. Compare rates from different lenders.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center">
                <span className="mr-2">💰</span> Consider Prepayment
              </h3>
              <p className="text-muted-foreground text-sm">
                Make prepayments when possible to reduce principal amount and save on interest. Check prepayment charges first.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center">
                <span className="mr-2">📈</span> Plan Your Budget
              </h3>
              <p className="text-muted-foreground text-sm">
                EMI should not exceed 40-50% of your monthly income to maintain a healthy financial lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}