'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Copy } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const FAQS = [
  {
    question: 'What is keyword density?',
    answer: 'Keyword density is the percentage of times a keyword or phrase appears on a page compared to the total number of words.'
  },
  {
    question: 'Why is keyword density important?',
    answer: 'It helps optimize your content for search engines by avoiding keyword stuffing and ensuring relevance.'
  },
  {
    question: 'How many keywords can I check at once?',
    answer: 'You can check multiple keywords by separating them with commas.'
  },
  {
    question: 'Can this tool check phrases?',
    answer: 'Yes, the tool can check single words or multi-word phrases as keywords.'
  }
];

function countOccurrences(text, keyword) {
  if (!keyword.trim()) return 0;
  const pattern = new RegExp(`\\b${keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [results, setResults] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('keyword_density_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('keyword_density_history', JSON.stringify(history));
  }, [history]);

  function analyze() {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const total = words.length;
    setTotalWords(total);

    const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean);

    const res = keywords.map(k => {
      const count = countOccurrences(text, k);
      const density = total > 0 ? ((count / total) * 100).toFixed(2) : '0.00';
      return { keyword: k, count, density };
    });
    setResults(res);

    if(text.trim() || keywords.length > 0){
      setHistory(prev => [
        {
          id: Date.now(),
          text: text.slice(0, 300),
          keywords,
          results: res,
          totalWords: total,
          at: new Date().toISOString()
        },
        ...prev
      ].slice(0, 50));
    }
  }

  function clearHistory() {
    if (!confirm('Clear all history?')) return;
    setHistory([]);
  }

  function removeItem(id) {
    setHistory(prev => prev.filter(h => h.id !== id));
  }

  function copyToClipboard(str) {
    navigator.clipboard.writeText(str);
  }

  const toolSchema = generateToolSchema({
    title: 'Keyword Density Checker - Analyze Keyword Frequency',
    description: 'Check keyword frequency and density in your text content for SEO optimization.',
    url: '/tools/keyword-density-checker'
  });

  const faqSchema = generateFAQSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Keyword Density Checker</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Analyze the frequency and density of your keywords in your text for better SEO.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
          <label className="block font-semibold mb-2">Paste your text here:</label>
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full px-3 py-2 border rounded resize-none mb-4"
            placeholder="Enter or paste your text content"
          />

          <label className="block font-semibold mb-2">Enter keywords or phrases (comma separated):</label>
          <input
            type="text"
            value={keywordsInput}
            onChange={e => setKeywordsInput(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
            placeholder="e.g. SEO, keyword density, optimization"
          />

          <button
            onClick={analyze}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
          >
            Analyze
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <div>Total Words: <strong>{totalWords}</strong></div>
            <table className="w-full mt-4 text-left border-collapse border border-border rounded">
              <thead>
                <tr className="bg-muted/20">
                  <th className="border border-border px-3 py-2">Keyword/Phrase</th>
                  <th className="border border-border px-3 py-2">Count</th>
                  <th className="border border-border px-3 py-2">Density (%)</th>
                </tr>
              </thead>
              <tbody>
                {results.map(({ keyword, count, density }) => (
                  <tr key={keyword}>
                    <td className="border border-border px-3 py-2">{keyword}</td>
                    <td className="border border-border px-3 py-2">{count}</td>
                    <td className="border border-border px-3 py-2">{density}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* History Section */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mt-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">History</h3>
            <button
              onClick={clearHistory}
              className="px-3 py-1 bg-muted rounded hover:bg-muted/80 transition flex items-center gap-2 text-sm"
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-muted-foreground">No history yet.</div>
          ) : (
            <div className="space-y-4 max-h-72 overflow-auto">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="p-4 border rounded bg-background shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-sm text-muted-foreground">{new Date(h.at).toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(h.text)}
                        className="px-2 py-1 bg-muted rounded text-sm flex items-center gap-1 hover:bg-muted/80 transition"
                      >
                        <Copy size={14} /> Copy Text
                      </button>
                      <button
                        onClick={() => removeItem(h.id)}
                        className="px-2 py-1 text-red-500 text-sm hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    Keywords: {h.keywords.join(', ')}
                  </div>
                  <table className="w-full mt-2 text-left border-collapse border border-border rounded text-xs">
                    <thead>
                      <tr className="bg-muted/20">
                        <th className="border border-border px-2 py-1">Keyword</th>
                        <th className="border border-border px-2 py-1">Count</th>
                        <th className="border border-border px-2 py-1">Density (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {h.results.map(({ keyword, count, density }) => (
                        <tr key={keyword}>
                          <td className="border border-border px-2 py-1">{keyword}</td>
                          <td className="border border-border px-2 py-1">{count}</td>
                          <td className="border border-border px-2 py-1">{density}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>

        <AdBanner position="middle" className="mt-8" />

        <div className="bg-card rounded-lg border border-border p-6 mt-8 mb-8">
          <h3 className="text-xl font-semibold mb-3">Tips</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Keep your keyword density natural and avoid stuffing.</li>
            <li>Use relevant keywords that relate to your content topic.</li>
            <li>Analyze multiple keywords or phrases for better SEO insight.</li>
            <li>Regularly update your content and re-check keyword density.</li>
          </ul>
        </div>

        <FAQ faqs={FAQS} />
      </div>
    </>
  );
}
