'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

// Dummy Tabs components from shadcn/ui style, adjust if you have your own Tabs
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'; // adjust import as needed

const faqs = [
  {
    question: 'What is Debt-to-Income Ratio?',
    answer:
      'Debt-to-Income (DTI) ratio is the percentage of your gross monthly income that goes towards paying your monthly debts.'
  },
  {
    question: 'Why is DTI important?',
    answer:
      'Lenders use DTI to measure your ability to manage monthly payments and repay debts.'
  },
  {
    question: 'What is a good DTI ratio?',
    answer:
      'Generally, a DTI below 36% is considered good; above 43% may impact your loan eligibility.'
  }
];

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];


export default function DebtToIncomeCalculator() {
  // State to track selected period tab: 'monthly', 'yearly', 'daily'
  const [period, setPeriod] = useState('monthly');

  const [debts, setDebts] = useState('');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setDebts('');
    setIncome('');
    setResult(null);
    setError('');
  }

  // Convert input values to monthly amounts based on selected period
  function toMonthlyAmount(value) {
    const val = parseFloat(value);
    if (isNaN(val) || val < 0) return null;

    switch (period) {
      case 'yearly':
        return val / 12;
      case 'daily':
        return val * 30; // approximate 30 days in month
      case 'monthly':
      default:
        return val;
    }
  }

  function formatAmount(value) {
    return value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '-';
  }

  function handleCalculate() {
    setError('');
    setResult(null);

    const debtsMonthly = toMonthlyAmount(debts);
    const incomeMonthly = toMonthlyAmount(income);

    if (debtsMonthly === null) {
      setError('Please enter a valid positive amount for debts.');
      return;
    }
    if (incomeMonthly === null || incomeMonthly === 0) {
      setError('Please enter a valid positive income amount.');
      return;
    }
    if (debtsMonthly > incomeMonthly) {
      setError('Debts cannot exceed income.');
      return;
    }

    setLoading(true);
    const dti = (debtsMonthly / incomeMonthly) * 100;
    setResult({
      debtsOriginal: debts,
      incomeOriginal: income,
      debtsMonthly,
      incomeMonthly,
      dti,
      period,
    });
    setLoading(false);
  }

  const toolSchema = generateToolSchema({
    title: 'Debt-to-Income Calculator',
    description: 'Calculate your debt-to-income ratio to understand your financial health.',
    url: '/finance/debt-to-income-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Debt-to-Income Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your debt-to-income ratio to see how much of your income goes toward paying debts.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        {/* Tabs for period selection */}
        <Tabs value={period} onValueChange={setPeriod} className="max-w-md mx-auto mb-10">
          <TabsList className='max-h-40 h-[6.5vh]'>
            {periods?.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}
                className="
                data-[state=active]:bg-primary
                data-[state=active]:text-white
                data-[state=active]:font-semibold
                font-medium
                text-md
                px-4
                py-2
              ">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="debts" className="block mb-2 font-semibold text-foreground">
                Total Debts ({period.charAt(0).toUpperCase() + period.slice(1)})
              </label>
              <input
                id="debts"
                type="number"
                min="0"
                step="any"
                placeholder={`e.g. ${period === 'yearly' ? 180000 : period === 'monthly' ? 15000 : 500}`}
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="income" className="block mb-2 font-semibold text-foreground">
                Income ({period.charAt(0).toUpperCase() + period.slice(1)})
              </label>
              <input
                id="income"
                type="number"
                min="0"
                step="any"
                placeholder={`e.g. ${period === 'yearly' ? 720000 : period === 'monthly' ? 60000 : 2000}`}
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate DTI"
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

          {/* Right: Result */}
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col justify-center items-center space-y-6">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-8 text-yellow-700 text-center">DTI Summary</h2>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-yellow-200">
                  <h3 className="text-yellow-900 font-semibold mb-2 text-lg">Total Debts (Monthly)</h3>
                  <p className="text-2xl font-extrabold text-yellow-800 font-mono break-words whitespace-pre-wrap">
                    ₹{formatAmount(result.debtsMonthly)}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-yellow-200">
                  <h3 className="text-yellow-900 font-semibold mb-2 text-lg">Income (Monthly)</h3>
                  <p className="text-2xl font-extrabold text-yellow-800 font-mono break-words whitespace-pre-wrap">
                    ₹{formatAmount(result.incomeMonthly)}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md border border-yellow-200">
                  <h3 className="text-yellow-900 font-semibold mb-2 text-lg">Debt-to-Income Ratio</h3>
                  <p
                    className={`text-3xl font-extrabold font-mono break-words whitespace-pre-wrap ${result.dti < 36 ? 'text-green-700' : 'text-destructive'
                      }`}
                  >
                    {result.dti.toFixed(2)}%
                  </p>
                  <p className="mt-1 text-center font-semibold text-yellow-800">
                    {result.dti < 36
                      ? 'Good DTI — manageable debt load'
                      : 'High DTI — may affect loan eligibility'}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your debts and income above, select the time period, and click Calculate.
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
