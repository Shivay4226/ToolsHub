'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, User, Ruler, Scale } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is Body Fat Percentage?', answer: 'Body fat percentage is the proportion of fat in your body compared to your total weight.' },
  { question: 'Which formula is used?', answer: 'This calculator uses the US Navy Method to estimate body fat based on measurements.' },
  { question: 'Can I enter measurements in both metric and imperial?', answer: 'Yes, you can choose metric (cm/kg) or imperial (in/lbs) units.' },
  { question: 'Is this 100% accurate?', answer: 'It is an estimate. For precise results, professional measurements are recommended.' }
];

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState({ cm: '', ft: '', in: '' });
  const [waist, setWaist] = useState({ cm: '', in: '' });
  const [neck, setNeck] = useState({ cm: '', in: '' });
  const [hip, setHip] = useState({ cm: '', in: '' }); // Only for females
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!age || age <= 0) return 'Please enter a valid age.';
    if (!weight || weight <= 0) return 'Please enter a valid weight.';
    if (unit === 'metric') {
      if (!height.cm || height.cm <= 0) return 'Please enter a valid height.';
      if (!waist.cm || waist.cm <= 0) return 'Please enter a valid waist measurement.';
      if (gender === 'female' && (!hip.cm || hip.cm <= 0)) return 'Please enter a valid hip measurement.';
      if (!neck.cm || neck.cm <= 0) return 'Please enter a valid neck measurement.';
    } else {
      const totalHeight = (parseFloat(height.ft) || 0) * 12 + (parseFloat(height.in) || 0);
      if (totalHeight <= 0) return 'Please enter a valid height.';
      if (!waist.in || waist.in <= 0) return 'Please enter a valid waist measurement.';
      if (gender === 'female' && (!hip.in || hip.in <= 0)) return 'Please enter a valid hip measurement.';
      if (!neck.in || neck.in <= 0) return 'Please enter a valid neck measurement.';
    }
    return '';
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    // Convert all inputs to cm and kg if necessary
    const wKg = unit === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    const hCm = unit === 'metric' ? parseFloat(height.cm) : (parseFloat(height.ft) || 0) * 30.48 + (parseFloat(height.in) || 0) * 2.54;
    const neckCm = unit === 'metric' ? parseFloat(neck.cm) : parseFloat(neck.in) * 2.54;
    const waistCm = unit === 'metric' ? parseFloat(waist.cm) : parseFloat(waist.in) * 2.54;
    const hipCm = gender === 'female' ? (unit === 'metric' ? parseFloat(hip.cm) : parseFloat(hip.in) * 2.54) : 0;

    let bodyFat = 0;
    if (gender === 'male') {
      // US Navy formula for males
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(hCm)) - 450;
    } else {
      // US Navy formula for females
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(hCm)) - 450;
    }

    setLoading(true);
    setTimeout(() => {
      setResult(bodyFat);
      setLoading(false);
    }, 500);
  };

  const clearAll = () => {
    setAge('');
    setWeight('');
    setHeight({ cm: '', ft: '', in: '' });
    setWaist({ cm: '', in: '' });
    setNeck({ cm: '', in: '' });
    setHip({ cm: '', in: '' });
    setGender('male');
    setError('');
    setResult(null);
  };

  const toolSchema = generateToolSchema({
    title: 'Body Fat Calculator',
    description: 'Calculate your estimated body fat percentage based on gender, age, weight, and body measurements.',
    url: '/health/body-fat-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Body Fat Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estimate your body fat percentage using your gender, age, weight, and body measurements.
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

            {/* Neck */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Neck ({unit === 'metric' ? 'cm' : 'in'})
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={neck[unit]}
                onChange={(e) => setNeck((prev) => ({ ...prev, [unit]: e.target.value }))}
                placeholder={`Enter neck measurement in ${unit === 'metric' ? 'cm' : 'inches'}`}
              />
            </div>

            {/* Waist */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Waist ({unit === 'metric' ? 'cm' : 'in'})
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={waist[unit]}
                onChange={(e) => setWaist((prev) => ({ ...prev, [unit]: e.target.value }))}
                placeholder={`Enter waist measurement in ${unit === 'metric' ? 'cm' : 'inches'}`}
              />
            </div>

            {/* Hip for females */}
            {gender === 'female' && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  Hip ({unit === 'metric' ? 'cm' : 'in'})
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                  value={hip[unit]}
                  onChange={(e) => setHip((prev) => ({ ...prev, [unit]: e.target.value }))}
                  placeholder={`Enter hip measurement in ${unit === 'metric' ? 'cm' : 'inches'}`}
                />
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
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col justify-center items-center">
            {result !== null ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Body Fat Percentage</h2>
                <p className="text-2xl font-semibold text-yellow-800 mb-4 font-mono">
                  {result.toFixed(2)}%
                </p>
                <p className="text-center text-yellow-700">
                  This is an estimate of your body fat percentage.
                </p>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md">
                Enter your details, then click Calculate to see your estimated body fat percentage.
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
