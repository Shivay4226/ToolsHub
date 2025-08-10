'use client';

import { useState } from 'react';
import { Percent } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: "How do I calculate percentage?",
    answer: "Percentage = (Obtained Marks ÷ Total Marks) × 100."
  },
  {
    question: "Can I calculate percentage for multiple subjects?",
    answer: "Yes, add all obtained marks together, divide by the total marks, and multiply by 100."
  },
  {
    question: "What is a passing percentage?",
    answer: "It depends on the exam, but often 33% or 40% is considered passing."
  },
  {
    question: "How can I improve my percentage?",
    answer: "Focus on weak subjects, practice regularly, and manage your exam time well."
  }
];

export default function PercentageCalculatorPage() {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState(null);

  const calculatePercentage = () => {
    const obtainedMarks = parseFloat(obtained);
    const totalMarks = parseFloat(total);

    if (obtainedMarks < 0 || totalMarks <= 0 || obtainedMarks > totalMarks) {
      alert('Please enter valid marks');
      return;
    }

    const percentage = (obtainedMarks / totalMarks) * 100;
    setResult({
      percentage: percentage.toFixed(2),
      grade:
        percentage >= 90
          ? 'A+'
          : percentage >= 80
          ? 'A'
          : percentage >= 70
          ? 'B'
          : percentage >= 60
          ? 'C'
          : percentage >= 50
          ? 'D'
          : 'F',
      status: percentage >= 40 ? 'Pass' : 'Fail'
    });
  };

  const toolSchema = generateToolSchema({
    title: 'Percentage Calculator - Calculate Your Marks Percentage',
    description: 'Easily calculate percentage from obtained marks and total marks with our free online percentage calculator.',
    url: '/education/percentage-calculator'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Percent className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Percentage Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quickly calculate your percentage from obtained marks and total marks. 
            Ideal for students, teachers, and competitive exam preparation.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Enter Your Marks</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Obtained Marks</label>
                <input
                  type="number"
                  value={obtained}
                  onChange={(e) => setObtained(e.target.value)}
                  placeholder="Enter obtained marks"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Marks</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Enter total marks"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background"
                />
              </div>
              <button
                onClick={calculatePercentage}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90"
              >
                Calculate Percentage
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Result</h2>
            {result ? (
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="text-sm text-primary font-medium">Percentage</div>
                  <div className="text-3xl font-bold">{result.percentage}%</div>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="text-sm">Grade</div>
                  <div className="text-lg font-semibold">{result.grade}</div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    result.status === 'Pass'
                      ? 'bg-green-500/5 border border-green-500/20'
                      : 'bg-red-500/5 border border-red-500/20'
                  }`}
                >
                  <div className="text-sm">Status</div>
                  <div className="text-xl font-bold">{result.status}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Enter your marks and click "Calculate Percentage"
              </div>
            )}
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* Tips */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Tips to Improve Percentage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">📚 Focus on high-weightage topics first.</div>
            <div className="bg-muted/20 p-4 rounded-lg">📝 Practice past question papers.</div>
            <div className="bg-muted/20 p-4 rounded-lg">⏱ Manage time efficiently during exams.</div>
            <div className="bg-muted/20 p-4 rounded-lg">💡 Revise regularly to retain concepts.</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
