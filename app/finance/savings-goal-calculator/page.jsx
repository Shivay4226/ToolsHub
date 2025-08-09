'use client';

import { useState } from 'react';
import { Copy, Download, AlertCircle, Target, DollarSign, TrendingUp, Clock } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a savings goal calculator?',
    answer: 'It helps estimate how long it will take to reach your savings target based on your monthly deposits and interest rate.'
  },
  {
    question: 'Can I change the interest rate?',
    answer: 'Yes, adjust the expected interest rate to see different time frames.'
  },
  {
    question: 'What if I increase my monthly deposits?',
    answer: 'Increasing deposits will reduce the time needed to reach your savings goal.'
  },
  {
    question: 'Are results guaranteed?',
    answer: 'Results are estimates based on inputs; actual returns depend on market performance.'
  }
];

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('5');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateSavingsGoal = () => {
    setError('');
    setResult(null);

    const goal = parseFloat(goalAmount);
    const monthly = parseFloat(monthlyDeposit);
    const rateAnnual = parseFloat(interestRate);

    if (isNaN(goal) || goal <= 0) {
      setError('Please enter a valid savings goal amount (> 0).');
      return;
    }
    if (isNaN(monthly) || monthly <= 0) {
      setError('Please enter a valid monthly deposit amount (> 0).');
      return;
    }
    if (isNaN(rateAnnual) || rateAnnual < 0) {
      setError('Please enter a valid interest rate (0 or more).');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const r = rateAnnual / 12 / 100; // monthly interest rate

      let months;
      if (r === 0) {
        months = goal / monthly;
      } else {
        months = Math.log((goal * r) / monthly + 1) / Math.log(1 + r);
      }

      const years = months / 12;
      const totalDeposited = monthly * months;
      const interestEarned = totalDeposited > goal ? totalDeposited - goal : goal - totalDeposited;

      setResult({
        months,
        years,
        totalDeposited,
        interestEarned,
        goal,
        monthly,
        rateAnnual,
      });

      setLoading(false);
    }, 700);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'savings-goal-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setGoalAmount('');
    setMonthlyDeposit('');
    setInterestRate('5');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Savings Goal Calculator',
    description: 'Calculate how long it will take to reach your savings goal with monthly deposits and interest.',
    url: '/tools/savings-goal-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Savings Goal Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate the time needed to reach your savings target based on monthly deposits and expected interest.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="goalAmount" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Target size={18} /> Savings Goal Amount (₹)
              </label>
              <input
                id="goalAmount"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="e.g. 500000"
                title="Enter your savings goal amount"
              />
            </div>

            <div>
              <label htmlFor="monthlyDeposit" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Monthly Deposit (₹)
              </label>
              <input
                id="monthlyDeposit"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                placeholder="e.g. 10000"
                title="Enter your monthly deposit amount"
              />
            </div>

            <div>
              <label htmlFor="interestRate" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <TrendingUp size={18} /> Expected Annual Interest Rate (%)
              </label>
              <input
                id="interestRate"
                type="number"
                min="0"
                max="30"
                step="0.1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 5"
                title="Enter expected annual interest rate"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateSavingsGoal}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate savings goal"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="animate-spin" size={20} />
                    Calculating...
                  </div>
                ) : (
                  'Calculate'
                )}
              </button>
              <button
                onClick={clearAll}
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
                aria-label="Clear inputs"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-lg p-3 mt-2 text-sm font-semibold">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="flex-1 bg-blue-50 rounded-xl p-8 shadow-inner border border-blue-300 min-h-[300px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
                  Savings Goal Summary
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Savings Goal
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">₹{result.goal.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Monthly Deposit
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">₹{result.monthly.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Interest Rate
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">{result.rateAnnual.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Months Needed
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">{Math.ceil(result.months)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Years Needed
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">{result.years.toFixed(1)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Total Deposited
                    </p>
                    <p className="text-2xl font-extrabold text-blue-800">₹{result.totalDeposited.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-blue-700 hover:text-blue-900 bg-blue-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Copy result as JSON"
                  >
                    <Copy size={18} />
                    Copy JSON
                  </button>
                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-2 text-blue-700 hover:text-blue-900 bg-blue-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Download result as JSON"
                  >
                    <Download size={18} />
                    Download JSON
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg mt-16">
                Enter your savings goal, monthly deposit, and interest rate, then click Calculate.
              </p>
            )}
          </div>
        </div>

        <AdBanner position="middle" className="my-10" />

        {/* Features */}
        <div className="bg-card rounded-xl border border-border p-8 mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-foreground">
            <div className="text-center p-4 rounded-lg border border-primary/20 hover:shadow-lg transition cursor-default">
              <div className="text-primary text-5xl mb-4">🎯</div>
              <h3 className="font-semibold mb-2 text-lg">Goal Estimation</h3>
              <p className="text-muted-foreground text-sm">
                Estimate time to reach your savings goal with interest.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-blue-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-blue-500 text-5xl mb-4">💵</div>
              <h3 className="font-semibold mb-2 text-lg">Monthly Deposits</h3>
              <p className="text-muted-foreground text-sm">
                Input your planned monthly savings.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">📈</div>
              <h3 className="font-semibold mb-2 text-lg">Interest Rate</h3>
              <p className="text-muted-foreground text-sm">
                Factor in expected interest to refine your timeline.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy & Security</h3>
              <p className="text-muted-foreground text-sm">
                Calculations happen locally; your data stays private.
              </p>
            </div>
          </div>
        </div>

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
