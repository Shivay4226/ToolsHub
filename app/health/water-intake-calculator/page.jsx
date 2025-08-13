'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Droplet, User, Scale, Calendar } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is a Water Intake Calculator?', answer: 'It estimates how much water you should drink daily based on weight, age, and activity.' },
  { question: 'Can I use metric and imperial units?', answer: 'Yes, you can choose between kg/lb for weight.' },
  { question: 'Does activity level affect water intake?', answer: 'Yes, higher activity levels increase recommended water intake.' },
  { question: 'Is this exact?', answer: 'This is an estimate; individual needs may vary.' }
];

export default function WaterIntakeCalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const activityMultiplier = {
    low: 30,       // ml per kg
    moderate: 35,
    high: 40
  };

  const validateInputs = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return 'Please enter a valid weight greater than zero.';
    const a = parseFloat(age);
    if (isNaN(a) || a <= 0) return 'Please enter a valid age greater than zero.';
    return '';
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    let wKg = unit === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    const intakeMl = wKg * activityMultiplier[activity];
    const intakeL = intakeMl / 1000;

    setLoading(true);
    setTimeout(() => {
      setResult(intakeL);
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setWeight('');
    setAge('');
    setActivity('moderate');
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'Water Intake Calculator',
    description: 'Calculate your recommended daily water intake based on weight, age, and activity.',
    url: '/health/water-intake-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Water Intake Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your daily water intake in liters based on weight, age, and activity level.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            {/* Unit Toggle */}
            <div className="flex gap-4">
              {['metric', 'imperial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setUnit(type)}
                  className={`flex-1 px-4 py-2 rounded-md font-semibold border transition-colors ${
                    unit === type
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border'
                  }`}
                >
                  {type === 'metric' ? 'Metric (kg)' : 'Imperial (lbs)'}
                </button>
              ))}
            </div>

            {/* Weight */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Scale size={18} /> Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              />
            </div>

            {/* Age */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Calendar size={18} /> Age (years)
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

            {/* Activity Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <User size={18} /> Activity Level
              </label>
              <select
                className="w-full p-4 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
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
          <div className="flex-1 bg-blue-50 rounded-xl p-8 shadow-inner border border-blue-300 min-h-[300px] flex flex-col justify-center items-center">
            {result !== null ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Recommended Water Intake</h2>
                <p className="text-2xl font-semibold text-blue-800 mb-4 font-mono">{result.toFixed(2)} liters/day</p>
                <p className="text-center text-blue-700">
                  This is an estimated daily water requirement based on your weight and activity level.
                </p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your weight, age, and activity level, then click Calculate to see recommended water intake.
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
