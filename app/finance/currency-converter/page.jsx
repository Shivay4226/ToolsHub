'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, RefreshCw, AlertCircle, DollarSign } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'How does the currency converter work?',
    answer: 'It fetches live exchange rates from a public API to convert your amount between currencies.'
  },
  {
    question: 'Is the conversion rate accurate?',
    answer: 'Rates are fetched from a reliable API and updated regularly, but they may vary slightly in real time.'
  },
  {
    question: 'Can I convert between any currencies?',
    answer: 'You can convert between most world currencies supported by the exchange rate API.'
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes, only the amount and selected currencies are sent to the API. No personal data is stored.'
  }
];

// You can replace this with any public currency exchange API
const EXCHANGE_RATE_API = 'https://api.exchangerate.host/latest';

const currencyList = [
  'USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD', 'SGD', 'ZAR'
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch conversion on button click
  const convertCurrency = async () => {
    setError('');
    setResult(null);

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }
    if (!fromCurrency || !toCurrency) {
      setError('Please select both currencies.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${EXCHANGE_RATE_API}?base=${fromCurrency}&symbols=${toCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rate.');

      const data = await response.json();
      if (!data.rates || !data.rates[toCurrency]) throw new Error('Invalid currency data.');

      const rate = data.rates[toCurrency];
      const converted = amt * rate;

      setResult({
        amount: amt,
        fromCurrency,
        toCurrency,
        rate,
        convertedAmount: converted
      });
    } catch (e) {
      setError(e.message || 'An error occurred while converting.');
    } finally {
      setLoading(false);
    }
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
      a.download = 'currency-conversion-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('INR');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Currency Converter',
    description: 'Convert currencies using real-time exchange rates with this free online tool.',
    url: '/tools/currency-converter'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Currency Converter</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Convert currencies in real time using up-to-date exchange rates.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="amount" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Amount
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                title="Amount to convert"
              />
            </div>

            <div>
              <label htmlFor="fromCurrency" className="text-sm font-semibold text-foreground mb-2">
                From Currency
              </label>
              <select
                id="fromCurrency"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyList.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="toCurrency" className="text-sm font-semibold text-foreground mb-2">
                To Currency
              </label>
              <select
                id="toCurrency"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyList.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={convertCurrency}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Convert currency"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} /> Converting...
                  </div>
                ) : (
                  'Convert'
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
          <div className="flex-1 bg-blue-50 rounded-xl p-8 shadow-inner border border-blue-300 min-h-[300px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Conversion Result</h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Amount ({result.fromCurrency})
                    </p>
                    <p className="text-2xl font-extrabold"> {result.amount.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Converted Amount ({result.toCurrency})
                    </p>
                    <p className="text-2xl font-extrabold text-blue-700">{result.convertedAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Exchange Rate
                    </p>
                    <p className="text-2xl font-extrabold">1 {result.fromCurrency} = {result.rate.toFixed(4)} {result.toCurrency}</p>
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
                Enter amount and select currencies, then click Convert to see results.
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
              <div className="text-primary text-5xl mb-4">💱</div>
              <h3 className="font-semibold mb-2 text-lg">Real-Time Conversion</h3>
              <p className="text-muted-foreground text-sm">
                Converts currencies using live exchange rates.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">🌍</div>
              <h3 className="font-semibold mb-2 text-lg">Global Currencies</h3>
              <p className="text-muted-foreground text-sm">
                Supports most major world currencies.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-violet-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-violet-500 text-5xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2 text-lg">Fast & Responsive</h3>
              <p className="text-muted-foreground text-sm">
                Instant conversion results with easy-to-use interface.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy</h3>
              <p className="text-muted-foreground text-sm">
                All calculations are secure and data is not stored.
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
