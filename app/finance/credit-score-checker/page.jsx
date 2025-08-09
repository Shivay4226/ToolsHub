'use client';

import { useState } from 'react';
import { Copy, Download, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a credit score?',
    answer: 'A credit score is a numerical value that represents your creditworthiness based on your credit history.'
  },
  {
    question: 'Why is my credit score important?',
    answer: 'It influences your ability to get loans, credit cards, and favorable interest rates.'
  },
  {
    question: 'What is a good credit score?',
    answer: 'Generally, a score above 700 is considered good, and above 800 is excellent.'
  },
  {
    question: 'How can I improve my credit score?',
    answer: 'Pay your bills on time, reduce outstanding debts, and avoid multiple credit inquiries.'
  }
];

function getCreditRating(score) {
  if (score >= 800)
    return { rating: 'Excellent', color: 'text-green-700', advice: 'Keep up the great work maintaining your credit!' };
  if (score >= 700)
    return { rating: 'Good', color: 'text-green-500', advice: 'Your credit score is good but can still improve.' };
  if (score >= 600)
    return { rating: 'Fair', color: 'text-yellow-600', advice: 'Work on improving your credit habits to raise your score.' };
  if (score >= 500)
    return { rating: 'Poor', color: 'text-red-600', advice: 'You may have difficulty securing loans. Try to improve your score.' };
  return { rating: 'Very Poor', color: 'text-red-800', advice: 'Consider taking steps to rebuild your credit immediately.' };
}

export default function CreditScoreChecker() {
  const [score, setScore] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkScore = () => {
    setError('');
    setResult(null);

    const numericScore = parseInt(score, 10);
    if (isNaN(numericScore) || numericScore < 300 || numericScore > 850) {
      setError('Please enter a valid credit score between 300 and 850.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const rating = getCreditRating(numericScore);
      setResult({ score: numericScore, ...rating });
      setLoading(false);
    }, 800);
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
      a.download = 'credit-score-result.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setScore('');
    setResult(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'Credit Score Checker',
    description: 'Check your credit score rating and get personalized advice based on your credit score.',
    url: '/tools/credit-score-checker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Credit Score Checker</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Enter your credit score to see your rating and get advice to improve your credit health.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Input */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <label htmlFor="score" className="text-sm font-semibold text-foreground">
              Enter Credit Score (300 - 850)
            </label>
            <input
              id="score"
              type="number"
              min="300"
              max="850"
              placeholder="e.g. 720"
              className="p-4 border border-input rounded-lg font-mono text-lg bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-colors"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                onClick={checkScore}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                aria-label="Check credit score"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} />
                    Checking...
                  </div>
                ) : (
                  'Check Score'
                )}
              </button>
              <button
                onClick={clearAll}
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
                aria-label="Clear input"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-lg p-3 font-semibold">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div className="flex-1 bg-blue-50 rounded-xl p-8 shadow-inner border border-blue-300 min-h-[300px] flex flex-col justify-between">
            {result ? (
              <>
                <h2 className={`text-3xl font-bold mb-6 text-center ${result.color}`}>
                  <CheckCircle className="inline mr-2" size={28} />
                  {result.rating}
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Credit Score
                    </p>
                    <p className="text-4xl font-extrabold text-gray-700">{result.score}</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-5 border border-blue-200 text-center">
                    <p className="text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      Advice
                    </p>
                    <p className="text-lg font-medium text-gray-800">{result.advice}</p>
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
                Enter your credit score above and click "Check Score" to get your rating.
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
              <div className="text-primary text-5xl mb-4">📊</div>
              <h3 className="font-semibold mb-2 text-lg">Instant Rating</h3>
              <p className="text-muted-foreground text-sm">
                Get your credit score rating instantly with advice.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-green-500 text-5xl mb-4">🔍</div>
              <h3 className="font-semibold mb-2 text-lg">Easy to Use</h3>
              <p className="text-muted-foreground text-sm">
                Simple input and instant feedback.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-violet-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-violet-500 text-5xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2 text-lg">Fast & Responsive</h3>
              <p className="text-muted-foreground text-sm">
                Works seamlessly on all devices.
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border border-amber-500/20 hover:shadow-lg transition cursor-default">
              <div className="text-amber-500 text-5xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-lg">Privacy</h3>
              <p className="text-muted-foreground text-sm">
                No data is stored or shared.
              </p>
            </div>
          </div>
        </div>

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
