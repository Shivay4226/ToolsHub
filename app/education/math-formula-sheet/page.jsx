'use client';

import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const sampleFormulas = [
  { id: 1, grade: 1, title: 'Addition', formula: 'a + b' },
  { id: 2, grade: 1, title: 'Subtraction', formula: 'a - b' },
  { id: 3, grade: 2, title: 'Multiplication', formula: 'a × b' },
  { id: 4, grade: 2, title: 'Division', formula: 'a ÷ b' },
  { id: 5, grade: 3, title: 'Area of Square', formula: 'Area = side²' },
  { id: 6, grade: 3, title: 'Area of Rectangle', formula: 'Area = length × breadth' },
  { id: 7, grade: 4, title: 'Area of Triangle', formula: 'Area = 1/2 × base × height' },
  { id: 8, grade: 4, title: 'Perimeter of Circle', formula: 'Perimeter = 2πr' },
  { id: 9, grade: 5, title: 'Pythagoras Theorem', formula: 'a² + b² = c²' },
  { id: 10, grade: 5, title: 'Simple Interest', formula: 'SI = (P × R × T) / 100' },
  { id: 11, grade: 6, title: 'Perimeter of Rectangle', formula: 'Perimeter = 2(l + b)' },
  { id: 12, grade: 6, title: 'Volume of Cube', formula: 'Volume = side³' },
  { id: 13, grade: 7, title: 'Volume of Cuboid', formula: 'Volume = l × b × h' },
  { id: 14, grade: 7, title: 'Area of Parallelogram', formula: 'Area = base × height' },
  { id: 15, grade: 8, title: 'Speed Formula', formula: 'Speed = Distance / Time' },
  { id: 16, grade: 8, title: 'Density Formula', formula: 'Density = Mass / Volume' },
  { id: 17, grade: 9, title: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a' },
  { id: 18, grade: 9, title: 'Slope Formula', formula: 'Slope = (y₂ - y₁) / (x₂ - x₁)' },
  { id: 19, grade: 10, title: 'Trigonometric Identity', formula: 'sin²θ + cos²θ = 1' },
  { id: 20, grade: 10, title: 'Surface Area of Sphere', formula: 'Area = 4πr²' },
  { id: 21, grade: 11, title: 'Derivative of xⁿ', formula: 'd/dx(xⁿ) = n × xⁿ⁻¹' },
  { id: 22, grade: 11, title: 'Integration of xⁿ', formula: '∫xⁿ dx = (xⁿ⁺¹) / (n+1) + C' },
  { id: 23, grade: 12, title: 'Binomial Theorem', formula: '(a + b)ⁿ = Σ [nCk × aⁿ⁻ᵏ × bᵏ]' },
  { id: 24, grade: 12, title: 'Differential Equation Solution', formula: 'dy/dx = f(x) → y = ∫f(x) dx + C' },
  { id: 25, grade: 'others', title: 'Euler’s Formula', formula: 'e^(iπ) + 1 = 0' },
  { id: 26, grade: 'others', title: 'Law of Gravitation', formula: 'F = G × (m₁ × m₂) / r²' },
  { id: 27, grade: 'others', title: 'Ohm’s Law', formula: 'V = I × R' },
  { id: 28, grade: 'others', title: 'Einstein’s Mass–Energy', formula: 'E = mc²' }
];

const faqs = [
  { question: 'What is this tool?', answer: 'A quick sheet to view and filter math formulas by grade level and category.' },
  { question: 'Can I export formulas?', answer: 'Currently, this tool is for quick on-screen reference. Export features can be added later.' },
  { question: 'Is the data saved?', answer: 'This version stores data in-memory. LocalStorage or backend persistence can be added if needed.' }
];

export default function MathFormulaSheet() {
  const [formulas] = useState(sampleFormulas);
  const [query, setQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  const filtered = useMemo(() => {
    return formulas.filter(f => {
      const matchesQuery = query.trim() === '' ||
        f.title.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase()) ||
        f.formula.toLowerCase().includes(query.toLowerCase()) ||
        f.description.toLowerCase().includes(query.toLowerCase());

      const matchesGrade = gradeFilter === '' || f.grade === gradeFilter;

      return matchesQuery && matchesGrade;
    });
  }, [formulas, query, gradeFilter]);

  const toolSchema = generateToolSchema({
    title: 'Math Formula Sheet - Quick reference by grade and category',
    description: 'View and filter common math formulas for grades 1-12 and beyond.',
    url: '/education/math-formula-sheet'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Math Formula Sheet</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A quick reference of math formulas. Filter by grade level or search to find exactly what you need.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, category or formula..."
              className="px-3 py-2 border border-input rounded-lg bg-background flex-1"
            />
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-lg bg-background"
            >
              <option value="">All Grades</option>
              <option value="1-5">Grade 1-5</option>
              <option value="6-8">Grade 6-8</option>
              <option value="9-10">Grade 9-10</option>
              <option value="11-12">Grade 11-12</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-muted-foreground p-12 text-center">
              No formulas found for your selection.
            </div>
          ) : (
            filtered.map(f => (
              <div key={f.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{f.title}</div>
                  <div className="text-sm text-muted-foreground">{f.grade}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Category: {f.category || 'N/A'}
                </div>
                <div className="mt-3 font-mono whitespace-pre-wrap bg-muted/10 p-3 rounded-lg">
                  {f.formula}
                </div>
                {f.description && <div className="mt-2 text-sm">{f.description}</div>}
              </div>
            ))
          )}
        </div>
        
        <AdBanner position="middle" className="my-8" />

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
