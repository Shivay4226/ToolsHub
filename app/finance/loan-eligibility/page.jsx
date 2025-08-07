'use client';

import { useState } from 'react';
import { Copy, Download, AlertCircle, Calculator } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'How is loan eligibility calculated?',
    answer: 'Based on your salary, existing EMIs, loan amount, tenure, and interest rate, we estimate your monthly EMI and check if it fits your repayment capacity.'
  },
  {
    question: 'What is EMI?',
    answer: 'EMI stands for Equated Monthly Installment - the fixed monthly payment you make to repay the loan.'
  },
  {
    question: 'Can I increase my eligibility?',
    answer: 'Reducing existing EMIs or increasing your salary improves eligibility. Also, longer tenure lowers monthly EMI.'
  },
  {
    question: 'Is this tool accurate?',
    answer: 'It provides an estimate. Final approval depends on your lender\'s policies and credit history.'
  }
];

// EMI calculation formula
function calculateEMI(principal, ratePerMonth, tenureMonths) {
  if (ratePerMonth === 0) return principal / tenureMonths;
  const emi =
    (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) /
    (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
  return emi;
}

export default function LoanEligibilityChecker() {
  const [salary, setSalary] = useState('');
  const [existingEMI, setExistingEMI] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkEligibility = () => {
    setError('');
    setResult(null);

    const sal = parseFloat(salary);
    const emiExist = parseFloat(existingEMI) || 0;
    const loanAmt = parseFloat(loanAmount);
    const tenure = parseFloat(tenureYears);
    const rateAnnual = parseFloat(interestRate);

    if (
      isNaN(sal) || sal <= 0 ||
      isNaN(loanAmt) || loanAmt <= 0 ||
      isNaN(tenure) || tenure <= 0 ||
      isNaN(rateAnnual) || rateAnnual < 0
    ) {
      setError('Please enter valid positive numbers for salary, loan amount, tenure and interest rate.');
      return;
    }

    setLoading(true);

    // Basic logic:
    // Max EMI you can pay = 50% of salary - existing EMI
    // Calculate EMI for requested loan
    // Compare EMI <= max EMI, else suggest max eligible loan

    const maxEMI = sal * 0.5 - emiExist;
    if (maxEMI <= 0) {
      setError('Your existing EMI exceeds 50% of your salary. Not eligible for new loan.');
      setLoading(false);
      return;
    }

    const tenureMonths = tenure * 12;
    const rateMonthly = rateAnnual / 12 / 100;

    const emiForLoan = calculateEMI(loanAmt, rateMonthly, tenureMonths);

    if (emiForLoan <= maxEMI) {
      setResult({
        eligible: true,
        maxEMI: maxEMI.toFixed(2),
        requestedLoanAmount: loanAmt.toFixed(2),
        requestedEMI: emiForLoan.toFixed(2),
        tenureYears: tenure,
        interestRate: rateAnnual.toFixed(2)
      });
    } else {
      // calculate max eligible loan for maxEMI
      // reverse EMI formula to get principal (P):
      // P = EMI * (1+r)^n -1 / (r*(1+r)^n)
      const pow = Math.pow(1 + rateMonthly, tenureMonths);
      const maxLoan =
        (maxEMI * (pow - 1)) / (rateMonthly * pow);

      const maxEMIForMaxLoan = calculateEMI(maxLoan, rateMonthly, tenureMonths);

      setResult({
        eligible: false,
        maxEMI: maxEMI.toFixed(2),
        maxEligibleLoanAmount: maxLoan.toFixed(2),
        maxEligibleEMI: maxEMIForMaxLoan.toFixed(2),
        tenureYears: tenure,
        interestRate: rateAnnual.toFixed(2)
      });
    }
    setLoading(false);
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
      a.download = 'loan-eligibility-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setSalary('');
    setExistingEMI('');
    setLoanAmount('');
    setTenureYears('');
    setInterestRate('');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Loan Eligibility Checker',
    description: 'Check your loan eligibility based on salary, existing EMIs, loan amount, tenure, and interest rate.',
    url: '/tools/loan-eligibility-checker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">
            Loan Eligibility Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate your loan eligibility quickly and easily.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="salary" className="text-sm font-semibold text-foreground mb-2">
                Monthly Salary (₹)
              </label>
              <input
                id="salary"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter your monthly salary"
                title="Monthly salary"
              />
            </div>

            <div>
              <label htmlFor="existingEMI" className="text-sm font-semibold text-foreground mb-2">
                Existing EMIs (₹)
              </label>
              <input
                id="existingEMI"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={existingEMI}
                onChange={(e) => setExistingEMI(e.target.value)}
                placeholder="Total existing monthly EMI"
                title="Existing monthly EMI"
              />
            </div>

            <div>
              <label htmlFor="loanAmount" className="text-sm font-semibold text-foreground mb-2">
                Desired Loan Amount (₹)
              </label>
              <input
                id="loanAmount"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter desired loan amount"
                title="Desired loan amount"
              />
            </div>

            <div>
              <label htmlFor="tenureYears" className="text-sm font-semibold text-foreground mb-2">
                Loan Tenure (Years)
              </label>
              <input
                id="tenureYears"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                placeholder="Enter loan tenure in years"
                title="Loan tenure"
              />
            </div>

            <div>
              <label htmlFor="interestRate" className="text-sm font-semibold text-foreground mb-2">
                Interest Rate (Annual %)
              </label>
              <input
                id="interestRate"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter annual interest rate (e.g., 7.5)"
                title="Interest rate"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={checkEligibility}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Check eligibility"
              >
                {loading ? 'Calculating...' : 'Check Eligibility'}
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

          {/* Right: Result */}
          <div className="flex-1 bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 min-h-[350px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Eligibility Result</h2>

                <div className="grid grid-cols-1 gap-6">
                  {result.eligible ? (
                    <>
                      <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                          Requested Loan Amount
                        </p>
                        <p className="text-2xl font-extrabold">₹ {result.requestedLoanAmount}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                          Estimated EMI
                        </p>
                        <p className="text-2xl font-extrabold">₹ {result.requestedEMI}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                          Maximum EMI Capacity
                        </p>
                        <p className="text-2xl font-extrabold">₹ {result.maxEMI}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white rounded-lg shadow p-5 border border-red-300 text-center">
                        <p className="text-destructive font-semibold mb-2">
                          Not Eligible for requested loan amount
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          Your max EMI capacity is ₹ {result.maxEMI}, which is less than the estimated EMI for requested loan.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                          Maximum Eligible Loan Amount
                        </p>
                        <p className="text-2xl font-extrabold">₹ {result.maxEligibleLoanAmount}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                        <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                          EMI for Max Eligible Loan
                        </p>
                        <p className="text-2xl font-extrabold">₹ {result.maxEligibleEMI}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 bg-green-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Copy result as JSON"
                  >
                    <Copy size={18} />
                    Copy JSON
                  </button>
                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 bg-green-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Download result as JSON"
                  >
                    <Download size={18} />
                    Download JSON
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg mt-16">
                Fill in your details and click "Check Eligibility" to see your loan eligibility result.
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
              <div className="text-primary text-5xl mb-4">🧮</div>
              <h3 className="font-semibold mb-2 text-lg">EMI Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Calculates monthly EMI based on loan details.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">📊</div>
              <h3 className="font-semibold mb-2 text-lg">Eligibility Check</h3>
              <p className="text-muted-foreground text-sm">
                Checks loan eligibility against your salary and existing EMIs.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-violet-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-violet-500 text-5xl mb-4">🔎</div>
              <h3 className="font-semibold mb-2 text-lg">Clear Results</h3>
              <p className="text-muted-foreground text-sm">
                Displays clear eligibility status and maximum loan amounts.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔐</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy</h3>
              <p className="text-muted-foreground text-sm">
                All calculations happen locally; your data is not stored.
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
