'use client';

import { useState } from 'react';
import { Copy, Download, AlertCircle, Target, CalendarCheck, TrendingUp, Clock, DollarSign } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a financial goal planner?',
    answer: 'It helps you plan how long it will take to reach your financial target based on your monthly savings and expected returns.'
  },
  {
    question: 'Can I change the expected return rate?',
    answer: 'Yes, you can adjust the expected return rate to see how it affects your goal timeline.'
  },
  {
    question: 'What if I want to save more or less monthly?',
    answer: 'Simply update the monthly savings input to see updated calculations.'
  },
  {
    question: 'Are the results guaranteed?',
    answer: 'No, results are estimates based on the inputs; actual market returns may vary.'
  }
];

export default function FinancialGoalPlanner() {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlySaving, setMonthlySaving] = useState('');
  const [annualReturn, setAnnualReturn] = useState('8');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculation: How many months needed to reach target based on compound interest formula
  const calculateGoal = () => {
    setError('');
    setResult(null);

    const goal = parseFloat(targetAmount);
    const monthly = parseFloat(monthlySaving);
    const annualR = parseFloat(annualReturn);

    if (isNaN(goal) || goal <= 0) {
      setError('Please enter a valid target amount greater than zero.');
      return;
    }
    if (isNaN(monthly) || monthly <= 0) {
      setError('Please enter a valid monthly saving amount greater than zero.');
      return;
    }
    if (isNaN(annualR) || annualR < 0) {
      setError('Please enter a valid expected annual return rate (0 or more).');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Monthly return rate
      const r = annualR / 12 / 100;

      // If return rate is zero, simple division
      let monthsNeeded;
      if (r === 0) {
        monthsNeeded = goal / monthly;
      } else {
        // Formula: FV = P * (( (1 + r)^n - 1) / r )
        // Solve for n (number of months):
        // n = log( (FV * r / P) + 1 ) / log(1 + r)
        monthsNeeded = Math.log((goal * r) / monthly + 1) / Math.log(1 + r);
      }

      const yearsNeeded = monthsNeeded / 12;
      const totalSaved = monthly * monthsNeeded;
      const interestEarned = totalSaved > goal ? totalSaved - goal : goal - totalSaved;

      setResult({
        monthsNeeded,
        yearsNeeded,
        totalSaved,
        interestEarned,
        targetAmount: goal,
        monthlySaving: monthly,
        annualReturn: annualR,
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
      a.download = 'financial-goal-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setTargetAmount('');
    setMonthlySaving('');
    setAnnualReturn('8');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Financial Goal Planner',
    description: 'Plan how long it will take to reach your financial goal based on monthly savings and expected returns.',
    url: '/tools/financial-goal-planner'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Financial Goal Planner</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate how long it will take to reach your financial target based on your monthly savings and expected returns.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="targetAmount" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Target size={18} /> Target Amount (₹)
              </label>
              <input
                id="targetAmount"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g. 1000000"
                title="Enter your financial goal target amount"
              />
            </div>

            <div>
              <label htmlFor="monthlySaving" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Monthly Saving (₹)
              </label>
              <input
                id="monthlySaving"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(e.target.value)}
                placeholder="e.g. 10000"
                title="Enter how much you can save monthly"
              />
            </div>

            <div>
              <label htmlFor="annualReturn" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <TrendingUp size={18} /> Expected Annual Return Rate (%)
              </label>
              <input
                id="annualReturn"
                type="number"
                min="0"
                max="30"
                step="0.1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="e.g. 8"
                title="Enter expected annual return rate"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateGoal}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate financial goal"
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
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
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
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
                  Goal Summary
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Target Amount
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">₹{result.targetAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Monthly Saving
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">₹{result.monthlySaving.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Expected Annual Return
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">{result.annualReturn.toFixed(2)}%</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Months Needed
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">{Math.ceil(result.monthsNeeded)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Years Needed
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">{result.yearsNeeded.toFixed(1)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-yellow-200 text-center break-words">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Total Amount Saved
                    </p>
                    <p className="text-2xl font-extrabold text-yellow-800">₹{result.totalSaved.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-yellow-700 hover:text-yellow-900 bg-yellow-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Copy result as JSON"
                  >
                    <Copy size={18} />
                    Copy JSON
                  </button>
                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-2 text-yellow-700 hover:text-yellow-900 bg-yellow-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Download result as JSON"
                  >
                    <Download size={18} />
                    Download JSON
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg mt-16">
                Enter your goal, monthly saving, and expected return, then click Calculate.
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
              <h3 className="font-semibold mb-2 text-lg">Goal Planning</h3>
              <p className="text-muted-foreground text-sm">
                Calculate how long it will take to reach your financial target.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">💰</div>
              <h3 className="font-semibold mb-2 text-lg">Monthly Savings</h3>
              <p className="text-muted-foreground text-sm">
                Plan your savings based on realistic monthly contributions.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-violet-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-violet-500 text-5xl mb-4">📈</div>
              <h3 className="font-semibold mb-2 text-lg">Expected Returns</h3>
              <p className="text-muted-foreground text-sm">
                Include your expected returns to get a more accurate timeline.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy & Security</h3>
              <p className="text-muted-foreground text-sm">
                All calculations are performed locally; your data stays private.
              </p>
            </div>
          </div>
        </div>

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
