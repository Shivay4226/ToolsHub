'use client';

import { useState, useEffect } from 'react';
import { Copy, Download } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is a Regular Expression (Regex)?',
    answer: 'A regular expression is a pattern used to match character combinations in strings. It’s powerful for searching, replacing, and validating data.',
  },
  {
    question: 'Is this Regex Tester safe?',
    answer: 'Yes, everything runs locally in your browser. Your data is not sent to any server.',
  },
  {
    question: 'Can I test global or case-insensitive patterns?',
    answer: 'Yes, use the options for "g", "i", and "m" to control regex behavior.',
  },
  {
    question: 'Does it support multiline text?',
    answer: 'Yes, the tool supports multiline text and regex patterns with the "m" flag.',
  },
];

export default function RegexTesterPage() {
  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const runTest = () => {
    setError('');
    try {
      const flagStr = Object.entries(flags)
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join('');

      const regex = new RegExp(pattern, flagStr);
      const allMatches = [...text.matchAll(regex)];

      const results = allMatches.map((m) => ({
        index: m.index ?? -1,
        match: m[0],
        groups: m.slice(1),
      }));

      setMatches(results);
    } catch (e) {
      setError(`Invalid regex: ${e.message}`);
      setMatches([]);
    }
  };

  const copyToClipboard = () => {
    if (matches.length > 0) {
      const matchText = matches.map((m) => `Match: "${m.match}" at index ${m.index}`).join('\n');
      navigator.clipboard.writeText(matchText);
    }
  };

  const downloadMatches = () => {
    const matchText = matches.map((m) => `Match: "${m.match}" at index ${m.index}`).join('\n');
    const blob = new Blob([matchText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regex-matches.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setText('');
    setPattern('');
    setMatches([]);
    setError('');
  };

  const toggleFlag = (flag) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const toolSchema = generateToolSchema({
    title: 'Regex Tester Online',
    description: 'Test and debug your regular expressions instantly in your browser.',
    url: '/tools/regex-tester',
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Regex Tester</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your regular expressions against any input text. Safe, fast, and browser-based.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        {/* Tool UI */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">Input Text</label>
                <button
                  onClick={clearAll}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to test against..."
                className="w-full h-64 p-3 border border-input rounded-lg font-mono text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-1">Regex Pattern</label>
                <input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="e.g. \\b\\w+\\b"
                  className="w-full p-2 border border-input rounded-lg font-mono text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                />
              </div>

              <div className="flex gap-4 items-center mt-4">
                {['g', 'i', 'm'].map((flag) => (
                  <label key={flag} className="flex items-center gap-1 text-sm text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flags[flag]}
                      onChange={() => toggleFlag(flag)}
                      className="accent-primary"
                    />
                    <span>{flag}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={runTest}
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Run Test
              </button>
            </div>

            {/* Output Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">Matches</label>
                <div
                  className={`flex gap-2 transition-opacity duration-300 ${
                    matches.length ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <button
                    onClick={copyToClipboard}
                    className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent transition-colors"
                    title="Copy"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={downloadMatches}
                    className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="w-full h-64 overflow-y-auto p-3 border border-input rounded-lg font-mono text-sm bg-muted/20 text-foreground transition-colors">
                {error && (
                  <div className="text-destructive text-sm bg-destructive/10 p-2 rounded border border-destructive/20">
                    {error}
                  </div>
                )}
                {!error && matches.length > 0 && (
                  <div className="space-y-2">
                    {matches.map((m, i) => (
                      <div key={i}>
                        <div>
                          <strong>Match:</strong> "{m.match}" at index {m.index}
                        </div>
                        {m.groups && m.groups.length > 0 && (
                          <div className="ml-4 text-muted-foreground text-xs">
                            {m.groups.map((g, gi) => (
                              <div key={gi}>Group {gi + 1}: {g || '(empty)'}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {!error && matches.length === 0 && text && pattern && (
                  <div className="text-muted-foreground">No matches found.</div>
                )}
              </div>

              {/* Status message */}
              <div className="mt-3 min-h-[40px]">
                {!error && matches.length > 0 && (
                  <div className="text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                    ✓ {matches.length} match{matches.length !== 1 && 'es'} found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AdBanner position="middle" className="mb-8" />

        {/* Features */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Instant Matching', desc: 'See matches instantly as you run regex patterns.' },
              { icon: '📜', title: 'Multiline Support', desc: 'Supports large text blocks and multiline patterns.' },
              { icon: '⚙️', title: 'Flag Options', desc: 'Toggle global, case-insensitive, and multiline matching.' },
              { icon: '🔒', title: 'Privacy First', desc: 'All regex processing happens locally in your browser.' },
            ].map((feat, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary text-xl">
                  {feat.icon}
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
