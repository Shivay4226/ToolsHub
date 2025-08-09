'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, RefreshCw, AlertCircle, DollarSign, List } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a Budget Planner?',
    answer: 'A tool to help you plan your monthly income and expenses to better manage your finances.'
  },
  {
    question: 'Can I add multiple expense categories?',
    answer: 'Yes, you can add as many expense categories as you need.'
  },
  {
    question: 'Will my data be saved?',
    answer: 'No, all data stays in your browser session and is not stored.'
  },
  {
    question: 'How can I use the results?',
    answer: 'Use the summary to see your total expenses and remaining budget for the month.'
  }
];

export default function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, category: '', amount: '' }
  ]);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now(), category: '', amount: '' }]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id, field, value) => {
    setExpenses(expenses.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const inc = parseFloat(income);
    if (isNaN(inc) || inc <= 0) {
      setError('Please enter a valid monthly income greater than zero.');
      return;
    }

    for (const exp of expenses) {
      if (!exp.category.trim()) {
        setError('Please fill in all expense categories.');
        return;
      }
      const amt = parseFloat(exp.amount);
      if (isNaN(amt) || amt < 0) {
        setError('Please enter valid positive amounts for all expenses.');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      const balance = inc - totalExpenses;

      setResult({ totalExpenses, balance });
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setIncome('');
    setExpenses([{ id: 1, category: '', amount: '' }]);
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'Budget Planner',
    description: 'Plan your monthly income and expenses to manage your budget effectively.',
    url: '/finance/budget-planner'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Budget Planner</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plan your monthly income and expenses to keep your budget on track.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label htmlFor="income" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <DollarSign size={18} /> Monthly Income
              </label>
              <input
                id="income"
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter your total monthly income"
                title="Monthly income"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <List size={18} /> Expenses
              </label>

              {expenses.map(({ id, category, amount }, i) => (
                <div key={id} className="flex gap-3 mb-4 items-center">
                  <input
                    type="text"
                    placeholder="Category (e.g. Rent)"
                    className="flex-1 p-3 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                    value={category}
                    onChange={(e) => updateExpense(id, 'category', e.target.value)}
                    title="Expense category"
                  />
                  <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Amount"
                    className="w-32 p-3 border border-input rounded-lg font-mono text-base bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
                    value={amount}
                    onChange={(e) => updateExpense(id, 'amount', e.target.value)}
                    title="Expense amount"
                  />
                  {expenses.length > 1 && (
                    <button
                      onClick={() => removeExpense(id)}
                      className="text-destructive hover:text-destructive-foreground transition"
                      aria-label="Remove expense"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addExpense}
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition"
                aria-label="Add expense category"
              >
                <PlusCircle size={20} />
                Add Expense
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Calculate budget"
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
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col justify-center items-center">
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
                  Budget Summary
                </h2>

                <p className="text-2xl font-semibold text-yellow-800 mb-4 break-words w-full max-w-md text-center font-mono">
                  Total Expenses: <span className="font-bold">{result.totalExpenses.toFixed(2)}</span>
                </p>

                <p className={`mt-4 text-3xl font-extrabold flex items-center gap-3 ${result.balance < 0 ? 'text-destructive' : 'text-green-700'} w-full max-w-md justify-center break-words font-mono`}>
                  Remaining Bal: <span>{result.balance.toFixed(2)}</span>
                </p>

                {result.balance < 0 && (
                  <p className="mt-4 text-destructive font-semibold text-center max-w-md px-4">
                    ⚠️ Warning: Your expenses exceed your income!
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your income and expenses, then click Calculate to see your budget summary.
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
