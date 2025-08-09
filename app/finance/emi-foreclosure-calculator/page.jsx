'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Save } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is EMI Foreclosure?',
    answer: 'EMI Foreclosure means paying off your loan before the tenure ends to save on interest.'
  },
  {
    question: 'What is foreclosure charge?',
    answer: 'Foreclosure charge is a fee charged by lenders for prepaying the loan.'
  },
  {
    question: 'Will foreclosure save me money?',
    answer: 'Yes, by foreclosing early, you avoid paying interest on remaining EMIs.'
  },
  {
    question: 'Is foreclosure allowed anytime?',
    answer: 'Check your loan agreement, some lenders have a lock-in period or fees.'
  }
];

// Helper to calculate EMI using standard formula
function calculateEMI(principal, annualInterestRate, tenureMonths) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  return (
    (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1)
  );
}

// Helper to calculate remaining principal after n EMIs
function calculateRemainingPrincipal(principal, annualInterestRate, tenureMonths, paidEMIs) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const emi = calculateEMI(principal, annualInterestRate, tenureMonths);
  // Formula for outstanding principal after 'paidEMIs'
  const remainingPrincipal =
    principal *
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - Math.pow(1 + monthlyInterestRate, paidEMIs)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
  return remainingPrincipal;
}

export default function EmiForeclosureCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [paidEMIs, setPaidEMIs] = useState('');
  const [foreclosureCharge, setForeclosureCharge] = useState('0');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setPaidEMIs('');
    setForeclosureCharge('0');
    setResult(null);
    setError('');
  }

  function validateInputs() {
    if (!principal || principal <= 0) return 'Enter a valid loan amount';
    if (!interestRate || interestRate <= 0) return 'Enter a valid interest rate';
    if (!tenure || tenure <= 0) return 'Enter a valid loan tenure in months';
    if (paidEMIs === '' || paidEMIs < 0) return 'Enter valid number of EMIs paid (>= 0)';
    if (paidEMIs > tenure) return 'EMIs paid cannot be more than total tenure';
    if (foreclosureCharge < 0) return 'Foreclosure charge cannot be negative';
    return null;
  }

  function handleCalculate() {
    setError('');
    setResult(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const p = parseFloat(principal);
      const r = parseFloat(interestRate);
      const n = parseInt(tenure);
      const paid = parseInt(paidEMIs);
      const fc = parseFloat(foreclosureCharge) / 100;

      const emi = calculateEMI(p, r, n);
      const remainingPrincipal = calculateRemainingPrincipal(p, r, n, paid);
      const foreclosureAmount = remainingPrincipal + remainingPrincipal * fc;

      // Total amount if no foreclosure = emi * (n - paid)
      // Interest saved = total remaining EMIs amount - remaining principal
      const totalRemainingEmisAmount = emi * (n - paid);
      const interestSaved = totalRemainingEmisAmount - remainingPrincipal;

      setResult({
        emi,
        remainingPrincipal,
        foreclosureAmount,
        interestSaved
      });
    } catch (e) {
      setError('Error calculating foreclosure details.');
    } finally {
      setLoading(false);
    }
  }

  const toolSchema = generateToolSchema({
    title: 'EMI Foreclosure Calculator',
    description: 'Calculate your foreclosure amount and interest saved by prepaying your loan early.',
    url: '/finance/emi-foreclosure-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">EMI Foreclosure Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your foreclosure amount and interest savings by paying off your loan early.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="principal" className="block mb-2 font-semibold text-foreground">
                Loan Amount (Principal)
              </label>
              <input
                id="principal"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 500000"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="interestRate" className="block mb-2 font-semibold text-foreground">
                Annual Interest Rate (%)
              </label>
              <input
                id="interestRate"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 7.5"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="tenure" className="block mb-2 font-semibold text-foreground">
                Loan Tenure (Months)
              </label>
              <input
                id="tenure"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 60"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="paidEMIs" className="block mb-2 font-semibold text-foreground">
                Number of EMIs Paid
              </label>
              <input
                id="paidEMIs"
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 12"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={paidEMIs}
                onChange={(e) => setPaidEMIs(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="foreclosureCharge" className="block mb-2 font-semibold text-foreground">
                Foreclosure Charges (%) <small>(Optional)</small>
              </label>
              <input
                id="foreclosureCharge"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 2"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={foreclosureCharge}
                onChange={(e) => setForeclosureCharge(e.target.value)}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate foreclosure"
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
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col justify-center items-center">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Foreclosure Summary</h2>
                <p className="text-2xl font-semibold text-yellow-800 mb-4 break-words w-full max-w-md text-center font-mono">
                  EMI Amount: <span className="font-bold">{result.emi.toFixed(2)}</span>
                </p>
                <p className="text-2xl font-semibold text-yellow-800 mb-4 break-words w-full max-w-md text-center font-mono">
                  Remaining Principal: <span className="font-bold">{result.remainingPrincipal.toFixed(2)}</span>
                </p>
                <p className="text-2xl font-semibold text-yellow-800 mb-4 break-words w-full max-w-md text-center font-mono">
                  Foreclosure Amount: <span className="font-bold">{result.foreclosureAmount.toFixed(2)}</span>
                </p>
                <p
                  className={`mt-4 text-3xl font-extrabold w-full max-w-md text-center ${
                    result.interestSaved < 0 ? 'text-destructive' : 'text-green-700'
                  } break-words font-mono`}
                >
                  Interest Saved: <span>{result.interestSaved.toFixed(2)}</span>
                </p>
                {result.interestSaved < 0 && (
                  <p className="mt-2 text-destructive font-semibold text-center max-w-md px-4">
                    Note: Negative interest saved means no savings.
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter details and click Calculate to see foreclosure summary.
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
