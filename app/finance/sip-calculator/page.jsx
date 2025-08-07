'use client';

import { useState } from 'react';
import { Copy, Download, AlertCircle, DollarSign, Clock, TrendingUp } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is SIP?',
    answer: 'Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds.'
  },
  {
    question: 'How is the SIP calculator useful?',
    answer: 'It helps estimate the future value of your investments based on expected returns and duration.'
  },
  {
    question: 'Can I rely on the calculated returns?',
    answer: 'Returns are estimates based on the input rate; actual returns depend on market performance.'
  },
  {
    question: 'Can I change the duration or return rate?',
    answer: 'Yes, you can input different values to see how they affect your investment outcome.'
  }
];

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [years, setYears] = useState('10');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateSIP = () => {
    setError('');
    setResult(null);

    const P = parseFloat(monthlyInvestment);
    const rAnnual = parseFloat(annualReturn);
    const t = parseFloat(years);

    if (isNaN(P) || P <= 0) {
      setError('Please enter a valid monthly investment amount (> 0).');
      return;
    }
    if (isNaN(rAnnual) || rAnnual <= 0) {
      setError('Please enter a valid annual return rate (> 0).');
      return;
    }
    if (isNaN(t) || t <= 0) {
      setError('Please enter a valid investment duration in years (> 0).');
      return;
    }

    const r = rAnnual / 12 / 100;
    const n = t * 12;

    const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const returns = fv - totalInvested;

    setResult({
      futureValue: fv,
      totalInvested,
      estimatedReturns: returns
    });
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
      a.download = 'sip-calculation-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setMonthlyInvestment('');
    setAnnualReturn('12');
    setYears('10');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'SIP Calculator',
    description: 'Calculate your Systematic Investment Plan (SIP) future value, investment, and returns.',
    url: '/tools/sip-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">SIP Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate your investment future value, total invested amount, and returns using SIP.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="monthly" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Monthly SIP Amount (₹)
              </label>
              <input
                id="monthly"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                placeholder="e.g. 5000"
                title="Enter the monthly SIP amount you want to invest"
              />
            </div>

            <div>
              <label htmlFor="annualReturn" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <TrendingUp size={18} /> Expected Annual Return Rate (%)
              </label>
              <input
                id="annualReturn"
                type="number"
                min="1"
                max="30"
                step="0.1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="e.g. 12"
                title="Enter expected annual return rate"
              />
            </div>

            <div>
              <label htmlFor="years" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Clock size={18} /> Investment Duration (years)
              </label>
              <input
                id="years"
                type="number"
                min="1"
                max="50"
                step="1"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g. 10"
                title="Enter investment duration in years"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateSIP}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate SIP"
              >
                Calculate
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
          <div className="flex-1 bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 min-h-[300px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Your SIP Investment Results</h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Total Invested
                    </p>
                    <p className="text-2xl font-extrabold text-gray-600">₹{result.totalInvested.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Estimated Returns
                    </p>
                    <p className="text-2xl font-extrabold text-blue-600">₹{result.estimatedReturns.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-green-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">Future Value</p>
                    <p className="text-2xl font-extrabold text-green-800">₹{result.futureValue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 bg-green-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Copy results as JSON"
                  >
                    <Copy size={18} />
                    Copy JSON
                  </button>
                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-2 text-green-700 hover:text-green-900 bg-green-100 px-5 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
                    title="Download results as JSON"
                  >
                    <Download size={18} />
                    Download JSON
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg mt-16">
                Enter inputs and click calculate to see your results here.
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
              <div className="text-primary text-5xl mb-4">💰</div>
              <h3 className="font-semibold mb-2 text-lg">SIP Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Calculates future value of monthly SIP investments.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">📈</div>
              <h3 className="font-semibold mb-2 text-lg">Expected Returns</h3>
              <p className="text-muted-foreground text-sm">
                Estimates returns based on your expected annual growth rate.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-violet-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-violet-500 text-5xl mb-4">⏳</div>
              <h3 className="font-semibold mb-2 text-lg">Duration Flexibility</h3>
              <p className="text-muted-foreground text-sm">
                Supports any investment duration in years.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy & Security</h3>
              <p className="text-muted-foreground text-sm">
                All calculations are done locally in your browser.
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
