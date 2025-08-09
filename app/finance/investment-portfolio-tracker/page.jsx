'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is an Investment Portfolio Tracker?',
    answer: 'It helps you track your investments, their current value, and your overall gains or losses.'
  },
  {
    question: 'Can I add multiple investments?',
    answer: 'Yes, you can add as many investments as you want and update them anytime.'
  },
  {
    question: 'Does this tool update market prices automatically?',
    answer: 'No, you need to update current values manually for now.'
  },
  {
    question: 'Is my data stored?',
    answer: 'No, this tool does not store your data. It works only in your browser.'
  }
];

export default function InvestmentPortfolioTracker() {
  const [investments, setInvestments] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [error, setError] = useState('');

  const addInvestment = () => {
    setError('');
    if (!name.trim()) {
      setError('Please enter investment name.');
      return;
    }
    const invested = parseFloat(amount);
    const current = parseFloat(currentValue);
    if (isNaN(invested) || invested <= 0) {
      setError('Please enter a valid invested amount greater than zero.');
      return;
    }
    if (isNaN(current) || current < 0) {
      setError('Please enter a valid current value (0 or more).');
      return;
    }
    setInvestments((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim(), invested, current }
    ]);
    setName('');
    setAmount('');
    setCurrentValue('');
  };

  const removeInvestment = (id) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  };

  // Totals
  const totalInvested = investments.reduce((acc, inv) => acc + inv.invested, 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + inv.current, 0);
  const totalGain = totalCurrent - totalInvested;
  const totalGainPercent = totalInvested ? (totalGain / totalInvested) * 100 : 0;

  const toolSchema = generateToolSchema({
    title: 'Investment Portfolio Tracker',
    description: 'Track your investments and see your portfolio performance.',
    url: '/tools/investment-portfolio-tracker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">
            Investment Portfolio Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Manage and track your investments with ease.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        {/* Input Section */}
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Investment Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-input rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Apple Stocks"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Amount Invested
              </label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full p-3 border border-input rounded-lg font-mono"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Current Value
              </label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full p-3 border border-input rounded-lg font-mono"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="e.g. 1200"
              />
            </div>
            <div>
              <button
                onClick={addInvestment}
                className="w-full py-3 px-6 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                aria-label="Add investment"
              >
                Add Investment
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-destructive bg-destructive/10 p-3 rounded border border-destructive/20 font-semibold">
              {error}
            </p>
          )}
        </div>

        {/* Investments List */}
        {investments.length > 0 ? (
          <div className="bg-yellow-50 rounded-xl p-6 shadow-inner border border-yellow-300">
            <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">
              Your Investments
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-yellow-200">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-right">Invested</th>
                    <th className="p-3 text-right">Current Value</th>
                    <th className="p-3 text-right">Gain/Loss</th>
                    <th className="p-3 text-right">Gain/Loss %</th>
                    <th className="p-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map(({ id, name, invested, current }) => {
                    const gain = current - invested;
                    const gainPercent = invested ? (gain / invested) * 100 : 0;
                    return (
                      <tr key={id} className="border-b border-yellow-200">
                        <td className="p-3">{name}</td>
                        <td className="p-3 text-right font-mono whitespace-nowrap">
                          {invested.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-mono whitespace-nowrap">
                          {current.toFixed(2)}
                        </td>
                        <td
                          className={`p-3 text-right font-mono whitespace-nowrap ${
                            gain >= 0 ? 'text-green-600' : 'text-destructive'
                          }`}
                        >
                          {gain.toFixed(2)}
                        </td>
                        <td
                          className={`p-3 text-right font-mono whitespace-nowrap ${
                            gainPercent >= 0 ? 'text-green-600' : 'text-destructive'
                          }`}
                        >
                          {gainPercent.toFixed(2)}%
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => removeInvestment(id)}
                            title="Remove investment"
                            className="text-destructive hover:text-destructive/80 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold text-yellow-800">
                Total Invested:{' '}
                <span className="font-mono">{totalInvested.toFixed(2)}</span>
              </p>
              <p className="text-xl font-semibold text-yellow-800 mt-2">
                Total Current Value:{' '}
                <span className="font-mono">{totalCurrent.toFixed(2)}</span>
              </p>
              <p
                className={`text-2xl font-extrabold mt-4 ${
                  totalGain >= 0 ? 'text-green-700' : 'text-destructive'
                }`}
              >
                Total Gain/Loss: {totalGain.toFixed(2)} (
                {totalGainPercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg mt-10">
            Add your investments above to see your portfolio summary.
          </p>
        )}

        <AdBanner position="middle" className="my-10" />

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
