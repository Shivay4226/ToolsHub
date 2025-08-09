'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is compound interest?',
    answer: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.'
  },
  {
    question: 'How often is interest compounded?',
    answer: 'You can select compounding frequency like yearly, semi-annually, quarterly, monthly, or daily.'
  },
  {
    question: 'Can I calculate for multiple years?',
    answer: 'Yes, you can input any number of years for the calculation.'
  },
  {
    question: 'Is this tool accurate?',
    answer: 'Yes, it uses the standard compound interest formula for calculation.'
  }
];

const compoundingOptions = [
  { value: 1, label: 'Yearly' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' }
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFreq, setCompoundFreq] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function calculateCompoundInterest() {
    setError('');
    setResult(null);

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(compoundFreq);

    if (isNaN(P) || P <= 0) {
      setError('Please enter a valid principal amount greater than zero.');
      return;
    }
    if (isNaN(r) || r <= 0) {
      setError('Please enter a valid annual interest rate greater than zero.');
      return;
    }
    if (isNaN(t) || t <= 0) {
      setError('Please enter a valid time period in years greater than zero.');
      return;
    }
    if (isNaN(n) || n <= 0) {
      setError('Please select a valid compounding frequency.');
      return;
    }

    setLoading(true);

    // Compound Interest formula: A = P (1 + r/n)^(nt)
    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    setTimeout(() => {
      setResult({ totalAmount: A, interest });
      setLoading(false);
    }, 500); // simulate delay
  }

  const toolSchema = generateToolSchema({
    title: 'Compound Interest Calculator',
    description: 'Calculate the total amount and interest earned with compound interest.',
    url: '/tools/compound-interest-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Compound Interest Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your investment growth over time with compound interest.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label htmlFor="principal" className="block mb-2 font-semibold text-foreground">
                Principal Amount
              </label>
              <input
                id="principal"
                type="number"
                min="0"
                step="any"
                className="w-full p-3 border border-input rounded-lg font-mono"
                placeholder="e.g. 1000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="rate" className="block mb-2 font-semibold text-foreground">
                Annual Interest Rate (%) 
              </label>
              <input
                id="rate"
                type="number"
                min="0"
                step="any"
                className="w-full p-3 border border-input rounded-lg font-mono"
                placeholder="e.g. 5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="time" className="block mb-2 font-semibold text-foreground">
                Time Period (years)
              </label>
              <input
                id="time"
                type="number"
                min="0"
                step="any"
                className="w-full p-3 border border-input rounded-lg font-mono"
                placeholder="e.g. 10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="compoundFreq" className="block mb-2 font-semibold text-foreground">
                Compounding Frequency
              </label>
              <select
                id="compoundFreq"
                className="w-full p-3 border border-input rounded-lg font-mono"
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(Number(e.target.value))}
              >
                {compoundingOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={calculateCompoundInterest}
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-md"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <RefreshCw className="animate-spin" size={20} />
                  Calculating...
                </div>
              ) : (
                'Calculate'
              )}
            </button>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-lg p-3 mt-4 font-semibold">
                <AlertCircle size={20} />
                {error}
              </div>
            )}
          </div>

          {/* Result */}
          <div className="bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 flex flex-col justify-center items-center min-h-[280px] text-center">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-green-700">Result</h2>
                <p className="text-lg font-semibold">
                  Total Amount: <br />
                  <span className="text-4xl font-extrabold text-green-900">
                    ₹{result.totalAmount.toFixed(2)}
                  </span>
                </p>
                <p className="mt-4 text-green-800 font-semibold">
                  Interest Earned: <br />
                  <span className="text-3xl font-bold">
                    ₹{result.interest.toFixed(2)}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-muted-foreground text-lg">
                Enter your details and click Calculate to see the results.
              </p>
            )}
          </div>
        </div>

        <AdBanner position="middle" className="my-10" />

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
