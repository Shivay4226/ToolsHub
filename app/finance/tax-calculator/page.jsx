'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is this Tax Calculator?',
    answer: 'It estimates your income tax based on the annual income and filing status.'
  },
  {
    question: 'Are tax slabs updated?',
    answer: 'This calculator uses a simple slab system; please verify with official tax guidelines.'
  },
  {
    question: 'Can I use this for all countries?',
    answer: 'No, it is designed with Indian tax slabs as an example. You can customize it.'
  }
];

// Example simple tax slabs for Individual (FY 2023-24, India)
const taxSlabs = {
  individual: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 }
  ],
  senior: [
    { limit: 300000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 }
  ]
};

function calculateTax(income, slabs) {
  let tax = 0;
  let previousLimit = 0;

  for (const slab of slabs) {
    if (income > slab.limit) {
      tax += (slab.limit - previousLimit) * slab.rate;
      previousLimit = slab.limit;
    } else {
      tax += (income - previousLimit) * slab.rate;
      break;
    }
  }
  return tax;
}

export default function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [status, setStatus] = useState('individual');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setIncome('');
    setStatus('individual');
    setResult(null);
    setError('');
  }

  function handleCalculate() {
    setError('');
    setResult(null);

    const inc = parseFloat(income);
    if (isNaN(inc) || inc < 0) {
      setError('Please enter a valid positive income amount.');
      return;
    }

    setLoading(true);

    try {
      const slabs = taxSlabs[status];
      const taxPayable = calculateTax(inc, slabs);
      setResult({ income: inc, status, taxPayable });
    } catch {
      setError('Calculation error, please try again.');
    } finally {
      setLoading(false);
    }
  }

  const toolSchema = generateToolSchema({
    title: 'Tax Calculator',
    description: 'Calculate your estimated income tax based on your income and filing status.',
    url: '/finance/tax-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Tax Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate your income tax liability quickly using this simple calculator.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="income" className="block mb-2 font-semibold text-foreground">
                Annual Income (₹)
              </label>
              <input
                id="income"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 750000"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="status" className="block mb-2 font-semibold text-foreground">
                Filing Status
              </label>
              <select
                id="status"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="individual">Individual (Below 60 years)</option>
                <option value="senior">Senior Citizen (60-80 years)</option>
              </select>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate tax"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} /> Calculating...
                  </div>
                ) : (
                  'Calculate'
                )}
              </button>
              <button
                onClick={resetForm}
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
                aria-label="Reset form"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-lg p-3 mt-4 text-sm font-semibold">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="flex-1 bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 min-h-[300px] flex flex-col justify-center items-center space-y-6">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-8 text-green-700 text-center">Tax Summary</h2>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-green-200">
                  <h3 className="text-green-900 font-semibold mb-2 text-lg">Annual Income</h3>
                  <p className="text-2xl font-extrabold text-green-800 font-mono break-words whitespace-pre-wrap">
                    ₹{result.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-green-200">
                  <h3 className="text-green-900 font-semibold mb-2 text-lg">Filing Status</h3>
                  <p className="text-xl text-green-800 font-semibold">
                    {result.status === 'individual' ? 'Individual (Below 60 years)' : 'Senior Citizen (60-80 years)'}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-green-200">
                  <h3 className="text-green-900 font-semibold mb-2 text-lg">Estimated Tax Payable</h3>
                  <p className="text-3xl font-extrabold text-green-900 font-mono break-words whitespace-pre-wrap">
                    ₹{result.taxPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your annual income and filing status, then click Calculate.
              </p>
            )}
          </div>

        </div>

        <AdBanner position="middle" className="my-10" />

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
