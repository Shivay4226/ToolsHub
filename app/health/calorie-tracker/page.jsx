'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, Microwave , List } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  { question: 'What is a Calorie Tracker?', answer: 'A Calorie Tracker helps you monitor calories consumed from foods to manage your diet.' },
  { question: 'Do I need an account?', answer: 'No, this tool works fully on the page without signing up.' },
  { question: 'Can I add multiple foods?', answer: 'Yes, you can add as many foods as you want and see the total calories.' },
  { question: 'Can I edit or remove foods?', answer: 'Yes, you can remove foods from the list to update your total calories.' }
];

export default function CalorieTracker() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);

  const handleAdd = () => {
    setError('');
    const calNum = parseFloat(calories);
    const qtyNum = parseFloat(quantity);

    if (!foodName.trim()) return setError('Please enter a food name.');
    if (isNaN(calNum) || calNum <= 0) return setError('Please enter a valid calorie value.');
    if (isNaN(qtyNum) || qtyNum <= 0) return setError('Please enter a valid quantity.');

    const totalCalories = calNum * qtyNum;
    const newEntry = { foodName, calories: calNum, quantity: qtyNum, totalCalories };

    setLoading(true);
    setTimeout(() => {
      setEntries([...entries, newEntry]);
      setFoodName('');
      setCalories('');
      setQuantity('');
      setLoading(false);
    }, 300);
  };

  const handleClear = () => {
    setFoodName('');
    setCalories('');
    setQuantity('');
    setError('');
    setEntries([]);
  };

  const handleRemove = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const totalCaloriesConsumed = entries.reduce((sum, item) => sum + item.totalCalories, 0);

  const toolSchema = generateToolSchema({
    title: 'Calorie Tracker',
    description: 'Track calories consumed from foods and see your total intake.',
    url: '/health/calorie-tracker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Calorie Tracker</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Add foods you eat and track your calories instantly.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Left: Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Microwave  size={18} /> Food Name
              </label>
              <input
                type="text"
                className="w-full p-4 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Calories per Unit
              </label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories per unit"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full p-4 border border-input rounded-md font-mono bg-background text-foreground focus:ring-2 focus:ring-primary/60 focus:border-transparent"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Number of units consumed"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} /> Adding...
                  </div>
                ) : (
                  'Add Food'
                )}
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-destructive/90 transition-colors shadow-md"
              >
                Clear All
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-md p-3 text-sm font-semibold">
                <AlertCircle size={20} /> <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-inner border border-yellow-300 min-h-[300px] flex flex-col">
            <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">Calories Consumed</h2>

            {entries.length > 0 ? (
              <>
                <ul className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {entries.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-yellow-100 rounded-md shadow-sm">
                      <div>
                        <p className="font-semibold text-yellow-800">{item.foodName}</p>
                        <p className="text-sm text-yellow-700">
                          {item.quantity} × {item.calories} cal = {item.totalCalories.toFixed(2)} cal
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-red-600 hover:text-red-800 font-bold"
                        title="Remove"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="text-center text-xl font-bold text-yellow-900">
                  Total: {totalCaloriesConsumed.toFixed(2)} cal
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground text-lg px-4 max-w-md flex-1 flex items-center justify-center">
                <List size={32} className="mr-2" /> Add foods to see calories consumed
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
