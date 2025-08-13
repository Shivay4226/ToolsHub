'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Calendar } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is a Sleep Tracker?', answer: 'A Sleep Tracker helps you monitor your sleep duration and patterns to improve sleep quality.' },
  { question: 'How do I use it?', answer: 'Enter the time you went to bed and the time you woke up. The calculator will estimate your total sleep duration.' },
  { question: 'Can it track sleep quality?', answer: 'This simple tool estimates duration only. For sleep quality, consider using a smartwatch or dedicated sleep app.' },
  { question: 'Why track sleep?', answer: 'Tracking sleep helps you identify patterns, improve rest, and maintain overall health.' }
];

export default function SleepTracker() {
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setError('');
    setResult(null);

    if (!bedTime || !wakeTime) {
      return setError('Please enter both bed time and wake up time.');
    }

    const bed = new Date(`1970-01-01T${bedTime}:00`);
    const wake = new Date(`1970-01-01T${wakeTime}:00`);

    // Handle overnight sleep
    if (wake <= bed) {
      wake.setDate(wake.getDate() + 1);
    }

    const diffMs = wake - bed;
    const diffHours = diffMs / 1000 / 60 / 60;

    setLoading(true);
    setTimeout(() => {
      setResult(diffHours);
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setBedTime('');
    setWakeTime('');
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'Sleep Tracker',
    description: 'Track your sleep duration by entering your bed time and wake-up time.',
    url: '/health/sleep-tracker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Sleep Tracker</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Enter your bedtime and wake-up time to calculate total sleep duration.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            {/* Bed Time */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Calendar size={18} /> Bed Time
              </label>
              <input
                type="time"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
              />
            </div>

            {/* Wake Time */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Calendar size={18} /> Wake Up Time
              </label>
              <input
                type="time"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
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
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
              >
                Clear
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-md p-3 text-sm font-semibold">
                <AlertCircle size={20} /> <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div className="flex-1 bg-purple-50 rounded-xl p-8 shadow-inner border border-purple-300 min-h-[300px] flex flex-col justify-center items-center">
            {result !== null ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Total Sleep Duration</h2>
                <p className="text-2xl font-semibold text-purple-800 mb-4 font-mono">
                  {Math.floor(result)} hours {Math.round((result % 1) * 60)} minutes
                </p>
                <p className="text-center text-purple-700">
                  This is the total estimated sleep duration.
                </p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your bedtime and wake-up time, then click Calculate to see your sleep duration.
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
