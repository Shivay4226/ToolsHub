'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Ruler, Scale, Calendar, User } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is BMR?', answer: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic life functions while at rest.' },
  { question: 'Which formula is used?', answer: 'This calculator uses the Harris-Benedict equation to estimate your BMR.' },
  { question: 'Can I enter height in feet and inches?', answer: 'Yes, you can choose Imperial units and enter your height in feet and inches.' },
  { question: 'Why is BMR important?', answer: 'Knowing your BMR helps you plan your calorie intake for weight loss, maintenance, or gain.' }
];

export default function BMRCalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState({ cm: '', ft: '', in: '' });
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return 'Please enter a valid weight greater than zero.';

    const a = parseFloat(age);
    if (isNaN(a) || a <= 0) return 'Please enter a valid age greater than zero.';

    if (unit === 'metric') {
      const h = parseFloat(height.cm);
      if (isNaN(h) || h <= 0) return 'Please enter a valid height greater than zero.';
    } else {
      const ft = parseFloat(height.ft) || 0;
      const inch = parseFloat(height.in) || 0;
      if (ft <= 0 && inch <= 0) return 'Please enter a valid height.';
    }
    return '';
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    let hCm = 0;
    if (unit === 'metric') {
      hCm = parseFloat(height.cm);
    } else {
      const totalInches = (parseFloat(height.ft) || 0) * 12 + (parseFloat(height.in) || 0);
      hCm = totalInches * 2.54;
    }

    let wKg = unit === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    let aYears = parseFloat(age);

    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * wKg) + (4.799 * hCm) - (5.677 * aYears);
    } else {
      bmr = 447.593 + (9.247 * wKg) + (3.098 * hCm) - (4.330 * aYears);
    }

    setLoading(true);
    setTimeout(() => {
      setResult(bmr);
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setWeight('');
    setHeight({ cm: '', ft: '', in: '' });
    setAge('');
    setGender('male');
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) in metric or imperial units.',
    url: '/health/bmr-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">BMR Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your BMR in metric (cm/kg) or imperial (ft/in/lbs) units.
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
                  {type === 'metric' ? 'Metric (cm / kg)' : 'Imperial (ft/in / lbs)'}
                </button>
              ))}
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <User size={18} /> Gender
              </label>
              <select
                className="w-full p-4 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
              />
            </div>

            {/* Height */}
            {unit === 'metric' ? (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Ruler size={18} /> Height (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                  value={height.cm}
                  onChange={(e) => setHeight((prev) => ({ ...prev, cm: e.target.value }))}
                  placeholder="Example: 170"
                />
              </div>
            ) : (
              <div className="flex gap-3">
                {['ft', 'in'].map((field) => (
                  <div key={field} className="flex-1">
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      {field === 'ft' ? 'Feet' : 'Inches'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                      value={height[field]}
                      onChange={(e) => setHeight((prev) => ({ ...prev, [field]: e.target.value }))}
                      placeholder={field === 'ft' ? 'e.g. 5' : 'e.g. 8'}
                    />
                  </div>
                ))}
              </div>
            )}

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
          <div className="flex-1 bg-green-50 rounded-xl p-8 shadow-inner border border-green-300 min-h-[300px] flex flex-col justify-center items-center">
            {result !== null ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">BMR Result</h2>
                <p className="text-2xl font-semibold text-green-800 mb-4 font-mono">
                  {result.toFixed(2)} calories/day
                </p>
                <p className="text-center text-green-700">This is the number of calories your body burns at rest.</p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your details, then click Calculate to see your BMR.
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
