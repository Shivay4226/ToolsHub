'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Ruler, Scale } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is a BMI Calculator?', answer: 'A BMI Calculator helps you determine your Body Mass Index based on your height and weight.' },
  { question: 'Can I enter height in feet and inches?', answer: 'Yes, you can choose Imperial units and enter height in feet and inches.' },
  { question: 'What are the BMI categories?', answer: 'Underweight: <18.5, Normal: 18.5–24.9, Overweight: 25–29.9, Obese: ≥30.' },
  { question: 'Is BMI accurate?', answer: 'BMI is a good general guide but may not reflect body composition accurately.' }
];

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState({ cm: '', ft: '', in: '' });
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return 'Please enter a valid weight greater than zero.';

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

    let bmi = 0;
    if (unit === 'metric') {
      const h = parseFloat(height.cm);
      const meters = h > 3 ? h / 100 : h;
      bmi = parseFloat(weight) / (meters * meters);
    } else {
      const totalInches = (parseFloat(height.ft) || 0) * 12 + (parseFloat(height.in) || 0);
      bmi = (parseFloat(weight) / (totalInches * totalInches)) * 703;
    }

    const category =
      bmi < 18.5 ? 'Underweight' :
      bmi < 25 ? 'Normal' :
      bmi < 30 ? 'Overweight' : 'Obese';

    setLoading(true);
    setTimeout(() => {
      setResult({ bmi, category });
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setWeight('');
    setHeight({ cm: '', ft: '', in: '' });
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) in metric or imperial units.',
    url: '/health/bmi-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">BMI Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calculate your BMI in metric (cm/kg) or imperial (ft/in/lbs) units.
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
                  <Ruler size={18} /> Height (cm or meters)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                  value={height.cm}
                  onChange={(e) => setHeight((prev) => ({ ...prev, cm: e.target.value }))}
                  placeholder="Example: 170 or 1.70"
                />
              </div>
            ) : (
              <div className="flex gap-3">
                {['ft', 'in'].map((field, i) => (
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
            {result ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">BMI Result</h2>
                <p className="text-2xl font-semibold text-blue-800 mb-4 font-mono">
                  BMI: <span className="font-bold">{result.bmi.toFixed(2)}</span>
                </p>
                <p className="mt-4 text-3xl font-extrabold text-blue-700 font-mono">{result.category}</p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your height and weight, then click Calculate to see your BMI.
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
