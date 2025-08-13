'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: "What is JSON and why format it?",
    answer: "JSON (JavaScript Object Notation) is a lightweight data format. Formatting makes it readable and easier to debug by adding proper indentation and structure."
  },
  {
    question: "Is my JSON data safe?",
    answer: "Yes, all processing happens in your browser. Your JSON data never leaves your device and is not stored on our servers."
  },
  {
    question: "Can I format large JSON files?",
    answer: "Yes, our formatter can handle large JSON files efficiently. However, very large files (>10MB) might slow down your browser."
  },
  {
    question: "What if my JSON has errors?",
    answer: "Our validator will highlight syntax errors and show you exactly where the problem is, making it easy to fix invalid JSON."
  }
];

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(null);

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON to format');
        setOutput('');
        setIsValid(false);
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      setIsValid(true);
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
      setIsValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON to minify');
        setOutput('');
        setIsValid(false);
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setIsValid(true);
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
      setIsValid(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(null);
  };

  const toolSchema = generateToolSchema({
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON data online. Fast, free, and secure JSON formatter tool.',
    url: '/developer/json-formatter'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toolSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            JSON Formatter & Validator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Format, validate, and beautify your JSON data. Fast, secure, and completely free online JSON formatter.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool Interface */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">
                  Input JSON
                </label>
                <button
                  onClick={clearAll}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
                className="w-full h-64 p-3 border border-input rounded-lg font-mono text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={formatJSON}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary transition-colors"
                >
                  Format JSON
                </button>
                <button
                  onClick={minifyJSON}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Minify JSON
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">
                  Formatted Output
                </label>
                {output && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent transition-colors"
                      title="Download JSON"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                )}
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-64 p-3 border border-input rounded-lg font-mono text-sm bg-muted/20 text-foreground transition-colors"
              />
              
              {/* Status */}
              <div className="mt-3">
                {error && (
                  <div className="text-destructive text-sm bg-destructive/10 p-2 rounded border border-destructive/20">
                    {error}
                  </div>
                )}
                {isValid === true && (
                  <div className="text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                    ✓ Valid JSON
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* Features */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                <span>✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">JSON Validation</h3>
              <p className="text-sm text-muted-foreground">Validates JSON syntax and shows detailed error messages</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-500">
                <span>🎨</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Pretty Format</h3>
              <p className="text-sm text-muted-foreground">Beautifies JSON with proper indentation and structure</p>
            </div>
            <div className="text-center">
              <div className="bg-violet-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-violet-500">
                <span>🗜️</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Minify</h3>
              <p className="text-sm text-muted-foreground">Compresses JSON by removing unnecessary whitespace</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-500">
                <span>🔒</span>
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Secure</h3>
              <p className="text-sm text-muted-foreground">Processes data locally in your browser for privacy</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}