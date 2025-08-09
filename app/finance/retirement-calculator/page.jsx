'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, User, Calendar, PiggyBank, DollarSign, TrendingUp } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a Retirement Calculator?',
    answer: 'It estimates how much your savings will grow until retirement based on your inputs.'
  },
  {
    question: 'What inputs do I need to provide?',
    answer: 'You need to provide your current age, planned retirement age, current savings, monthly savings, and expected annual return.'
  },
  {
    question: 'Is this calculation accurate?',
    answer: 'This gives an estimate based on inputs; actual results depend on market performance and other factors.'
  },
  {
    question: 'Is my data stored?',
    answer: 'No, your inputs and results are not stored or shared.'
  }
];

function calculateRetirementSavings({ currentAge, retirementAge, currentSavings, monthlySavings, annualReturn }) {
  const years = retirementAge - currentAge;
  if (years <= 0) return 0;

  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;

  // Future value of current savings compounded monthly
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

  // Future value of monthly savings (ordinary annuity formula)
  const futureValueSavings =
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return futureValueCurrent + futureValueSavings;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const cAge = parseInt(currentAge, 10);
    const rAge = parseInt(retirementAge, 10);
    const cSavings = parseFloat(currentSavings);
    const mSavings = parseFloat(monthlySavings);
    const aReturn = parseFloat(annualReturn);

    if (
      isNaN(cAge) || cAge <= 0 ||
      isNaN(rAge) || rAge <= cAge ||
      isNaN(cSavings) || cSavings < 0 ||
      isNaN(mSavings) || mSavings < 0 ||
      isNaN(aReturn) || aReturn < 0
    ) {
      setError('Please enter valid positive numbers and ensure retirement age is greater than current age.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savings = calculateRetirementSavings({
        currentAge: cAge,
        retirementAge: rAge,
        currentSavings: cSavings,
        monthlySavings: mSavings,
        annualReturn: aReturn
      });

      setResult({
        totalSavings: savings,
        yearsToRetirement: rAge - cAge
      });
      setLoading(false);
    }, 500); // simulate delay
  };

  const clearAll = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlySavings('');
    setAnnualReturn('');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Retirement Calculator',
    description: 'Estimate your savings growth until retirement based on your inputs.',
    url: '/finance/retirement-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Retirement Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate how much your savings will grow until your planned retirement.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="currentAge" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <User size={18} /> Current Age
              </label>
              <input
                id="currentAge"
                type="number"
                min="1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="e.g. 30"
                title="Your current age"
              />
            </div>

            <div>
              <label htmlFor="retirementAge" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Calendar size={18} /> Retirement Age
              </label>
              <input
                id="retirementAge"
                type="number"
                min="1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                placeholder="e.g. 60"
                title="Age you want to retire"
              />
            </div>

            <div>
              <label htmlFor="currentSavings" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <PiggyBank size={18} /> Current Savings ($)
              </label>
              <input
                id="currentSavings"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="e.g. 10000"
                title="Amount you have saved so far"
              />
            </div>

            <div>
              <label htmlFor="monthlySavings" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Monthly Savings ($)
              </label>
              <input
                id="monthlySavings"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
                placeholder="e.g. 500"
                title="Amount you save each month"
              />
            </div>

            <div>
              <label htmlFor="annualReturn" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <TrendingUp size={18} /> Expected Annual Return (%)
              </label>
              <input
                id="annualReturn"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="e.g. 7"
                title="Expected annual investment return rate"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate retirement savings"
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
          <div className="flex-1 bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 min-h-[300px] flex flex-col justify-center items-center">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
                  Estimated Savings at Retirement
                </h2>
                <p className="text-4xl font-extrabold text-green-900">
                  ${result.totalSavings.toFixed(2)}
                </p>
                <p className="mt-4 text-green-800 font-semibold">
                  Over {result.yearsToRetirement} years
                </p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg">
                Enter your details and click Calculate to see your estimated retirement savings.
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
