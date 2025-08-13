'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Heart } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is a Heart Rate Zone Calculator?', answer: 'It estimates your training zones based on your maximum heart rate to optimize workouts.' },
  { question: 'How is maximum heart rate calculated?', answer: 'This calculator uses 220 minus your age as the estimated max heart rate.' },
  { question: 'Why are heart rate zones important?', answer: 'Zones help target specific training goals like fat burning, endurance, or peak performance.' },
  { question: 'Is this exact?', answer: 'This is an estimate; individual fitness levels may vary.' }
];

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const a = parseFloat(age);
    if (isNaN(a) || a <= 0) return 'Please enter a valid age greater than zero.';
    const r = parseFloat(restingHR);
    if (isNaN(r) || r <= 0) return 'Please enter a valid resting heart rate greater than zero.';
    return '';
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    const maxHR = 220 - parseFloat(age);
    const zones = {
      'Warm-up (50-60%)': [(maxHR * 0.5).toFixed(0), (maxHR * 0.6).toFixed(0)],
      'Fat Burn (60-70%)': [(maxHR * 0.6).toFixed(0), (maxHR * 0.7).toFixed(0)],
      'Cardio (70-80%)': [(maxHR * 0.7).toFixed(0), (maxHR * 0.8).toFixed(0)],
      'Hard (80-90%)': [(maxHR * 0.8).toFixed(0), (maxHR * 0.9).toFixed(0)],
      'Maximum (90-100%)': [(maxHR * 0.9).toFixed(0), maxHR.toFixed(0)]
    };

    setLoading(true);
    setTimeout(() => {
      setResult({ maxHR, zones });
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setAge('');
    setRestingHR('');
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'Heart Rate Zone Calculator',
    description: 'Calculate your heart rate zones for effective training based on age and resting heart rate.',
    url: '/health/heart-rate-zone-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Heart Rate Zone Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your training zones based on your maximum heart rate to optimize workouts.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            {/* Age */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Age (years)
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            {/* Resting Heart Rate */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Resting Heart Rate (bpm)
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
                placeholder="Enter your resting heart rate"
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

          {/* Right: Results */}
          <div className="flex-1 bg-red-50 rounded-xl p-8 shadow-inner border border-red-300 min-h-[300px] flex flex-col justify-center items-center">
            {result !== null ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-red-700 text-center">Heart Rate Zones</h2>
                <p className="text-2xl font-semibold text-red-800 mb-4 font-mono">
                  Max HR: {result.maxHR} bpm
                </p>
                <div className="space-y-2 w-full">
                  {Object.entries(result.zones).map(([zone, range]) => (
                    <p key={zone} className="text-red-700 font-semibold">
                      {zone}: {range[0]} - {range[1]} bpm
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your age and resting heart rate, then click Calculate to see your heart rate zones.
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
