  'use client';

  import { useState } from 'react';
  import { GraduationCap } from 'lucide-react';
  import AdBanner from '@/components/ads/AdBanner';
  import FAQ from '@/components/ui/FAQ';
  import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

  const faqs = [
    {
      question: "What is GPA?",
      answer: "GPA (Grade Point Average) is the weighted average of your grades over a set of courses, calculated by dividing total grade points earned by total credits."
    },
    {
      question: "How is GPA calculated?",
      answer: "Multiply the grade point for each subject by its credit hours, sum these values, and divide by the total credits."
    },
    {
      question: "What is a good GPA?",
      answer: "A GPA above 3.5 (on a 4.0 scale) or 8.5 (on a 10.0 scale) is generally considered excellent."
    },
    {
      question: "Does GPA affect job opportunities?",
      answer: "Yes, many employers consider GPA, especially for fresh graduates, as an indicator of academic performance."
    }
  ];

  const gradeOptions = [
    { grade: 'A+', point: 4.0 },
    { grade: 'A', point: 3.7 },
    { grade: 'B+', point: 3.3 },
    { grade: 'B', point: 3.0 },
    { grade: 'C+', point: 2.7 },
    { grade: 'C', point: 2.3 },
    { grade: 'D', point: 2.0 },
    { grade: 'F', point: 0.0 }
  ];

  export default function GPACalculatorPage() {
    const [subjects, setSubjects] = useState([{ name: '', credits: '', grade: '' }]);
    const [result, setResult] = useState(null);

    const handleSubjectChange = (index, field, value) => {
      const newSubjects = [...subjects];
      newSubjects[index][field] = value;
      setSubjects(newSubjects);
    };

    const addSubject = () => {
      setSubjects([...subjects, { name: '', credits: '', grade: '' }]);
    };

    const calculateGPA = () => {
      let totalPoints = 0;
      let totalCredits = 0;

      subjects.forEach(sub => {
        const credits = parseFloat(sub.credits);
        const gradePoint = parseFloat(sub.grade);
        if (!isNaN(credits) && !isNaN(gradePoint)) {
          totalPoints += credits * gradePoint;
          totalCredits += credits;
        }
      });

      if (totalCredits === 0) {
        alert('Please enter valid credits and grades');
        return;
      }

      const gpa = totalPoints / totalCredits;
      setResult({
        gpa: gpa.toFixed(2),
        totalCredits,
        performance:
          gpa >= 3.5 ? 'Excellent' : gpa >= 3.0 ? 'Good' : gpa >= 2.0 ? 'Average' : 'Needs Improvement'
      });
    };

    const toolSchema = generateToolSchema({
      title: 'GPA Calculator - Calculate Your Grade Point Average',
      description: 'Free online GPA calculator. Enter your courses, credits, and grades to calculate your GPA instantly.',
      url: '/education/gpa-calculator'
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
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">GPA Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your Grade Point Average (GPA) quickly and easily. Plan your studies better with accurate GPA results.
            </p>
          </div>

          {/* Ad Banner */}
          <AdBanner position="top" className="mb-8" />

          {/* Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Input Section */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Course Details</h2>
              <div className="space-y-6">
                {subjects.map((sub, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      placeholder="Subject Name"
                      className="px-3 py-2 border border-input rounded-lg bg-background"
                    />
                    <input
                      type="number"
                      value={sub.credits}
                      onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
                      placeholder="Credits"
                      className="px-3 py-2 border border-input rounded-lg bg-background"
                    />
                    <select
                      value={sub.grade}
                      onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                      className="px-3 py-2 border border-input rounded-lg bg-background"
                    >
                      <option value="">Grade</option>
                      {gradeOptions.map((g) => (
                        <option key={g.grade} value={g.point}>{g.grade}</option>
                      ))}
                    </select>
                  </div>
                ))}
                <button onClick={addSubject} className="w-full bg-muted/30 py-2 rounded-lg">
                  + Add Subject
                </button>
                <button
                  onClick={calculateGPA}
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90"
                >
                  Calculate GPA
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">GPA Result</h2>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="text-sm text-primary font-medium">GPA</div>
                    <div className="text-3xl font-bold">{result.gpa}</div>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="text-sm">Total Credits</div>
                    <div className="text-lg font-semibold">{result.totalCredits}</div>
                  </div>
                  <div className="bg-green-500/5 p-4 rounded-lg">
                    <div className="text-sm">Performance</div>
                    <div className="text-xl font-bold">{result.performance}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  Enter your course details and click "Calculate GPA"
                </div>
              )}
            </div>
          </div>

          {/* Ad Banner */}
          <AdBanner position="middle" className="mb-8" />

          {/* Tips */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">GPA Improvement Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/20 p-4 rounded-lg">📚 Focus on high-credit subjects for maximum GPA impact.</div>
              <div className="bg-muted/20 p-4 rounded-lg">⏱ Manage time effectively for balanced study across subjects.</div>
              <div className="bg-muted/20 p-4 rounded-lg">🤝 Seek help from professors or peers in difficult topics.</div>
              <div className="bg-muted/20 p-4 rounded-lg">📝 Regularly review grades and adjust study plans.</div>
            </div>
          </div>

          {/* FAQ */}
          <FAQ faqs={faqs} />
        </div>
      </>
    );
  }
