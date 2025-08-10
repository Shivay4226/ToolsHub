'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Copy } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const FAQS = [
  {
    question: 'What is a meta tag?',
    answer: 'Meta tags provide metadata about a web page and are used by search engines and browsers.'
  },
  {
    question: 'Why analyze meta tags?',
    answer: 'To ensure your page is SEO-friendly, properly described, and optimized for social media sharing.'
  },
  {
    question: 'Can I analyze any website?',
    answer: 'You can analyze websites that allow cross-origin fetches or paste raw HTML directly.'
  },
  {
    question: 'What meta tags are important?',
    answer: 'Title, description, viewport, charset, keywords, Open Graph, and Twitter card tags are commonly important.'
  }
];

function parseMetaTags(htmlString) {
  if (!htmlString) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const metaTags = [];

  // Title
  const title = doc.querySelector('title')?.textContent;
  if (title) metaTags.push({ name: 'title', content: title });

  // Meta tags
  doc.querySelectorAll('meta').forEach((meta) => {
    const nameAttr = meta.getAttribute('name');
    const propertyAttr = meta.getAttribute('property');
    const httpEquivAttr = meta.getAttribute('http-equiv');
    const charsetAttr = meta.getAttribute('charset');
    const content = meta.getAttribute('content');

    if (charsetAttr) {
      metaTags.push({ name: 'charset', content: charsetAttr });
    } else if (httpEquivAttr) {
      metaTags.push({ name: `http-equiv:${httpEquivAttr}`, content });
    } else if (nameAttr) {
      metaTags.push({ name: nameAttr.toLowerCase(), content });
    } else if (propertyAttr) {
      metaTags.push({ name: propertyAttr.toLowerCase(), content });
    }
  });

  return metaTags;
}

export default function MetaTagAnalyzer() {
  const [input, setInput] = useState('');
  const [html, setHtml] = useState('');
  const [metaTags, setMetaTags] = useState([]);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('meta_tag_analyzer_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('meta_tag_analyzer_history', JSON.stringify(history));
  }, [history]);

  async function fetchHTML(url) {
    try {
      // Basic check for protocol, add if missing
      let fetchUrl = url.trim();
      if (!fetchUrl.startsWith('http://') && !fetchUrl.startsWith('https://')) {
        fetchUrl = 'https://' + fetchUrl;
      }
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(fetchUrl)}`);
      if (!res.ok) throw new Error('Failed to fetch HTML content');
      const text = await res.text();
      return text;
    } catch (e) {
      setError(e.message);
      return null;
    }
  }

  async function analyze() {
    setError(null);
    setMetaTags([]);
    let sourceHtml = '';

    if (input.trim().startsWith('<')) {
      // Assume raw HTML input
      sourceHtml = input.trim();
    } else {
      // Assume URL input, fetch HTML
      const fetched = await fetchHTML(input);
      if (!fetched) return;
      sourceHtml = fetched;
    }

    setHtml(sourceHtml);
    const tags = parseMetaTags(sourceHtml);
    setMetaTags(tags);

    setHistory((prev) => [
      {
        id: Date.now(),
        input: input.trim(),
        metaTags: tags,
        at: new Date().toISOString()
      },
      ...prev
    ].slice(0, 30));
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

  // Basic warnings for essential tags
  const essentialTags = ['title', 'description', 'viewport', 'charset'];
  const missingTags = essentialTags.filter(t => !metaTags.find(m => m.name === t));

  const toolSchema = generateToolSchema({
    title: 'Meta Tag Analyzer - Check SEO Meta Tags',
    description: 'Analyze meta tags of your webpage or HTML content for SEO and social media optimization.',
    url: '/tools/meta-tag-analyzer'
  });

  const faqSchema = generateFAQSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Meta Tag Analyzer</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter a URL or paste raw HTML to analyze meta tags for SEO and social media optimization.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
          <label className="block font-semibold mb-2">Enter URL or Raw HTML:</label>
          <textarea
            rows={6}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full px-3 py-2 border rounded resize-none mb-4"
            placeholder="https://example.com or paste full HTML here"
          />
          <button
            onClick={analyze}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
          >
            Analyze
          </button>
          {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
        </div>

        {metaTags.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">Meta Tags Found</h2>

            {missingTags.length > 0 && (
              <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-800">
                <strong>Warning:</strong> Missing essential meta tags: {missingTags.join(', ')}
              </div>
            )}

            <table className="w-full text-left border-collapse border border-border rounded">
              <thead>
                <tr className="bg-muted/20">
                  <th className="border border-border px-3 py-2">Name / Property</th>
                  <th className="border border-border px-3 py-2">Content</th>
                </tr>
              </thead>
              <tbody>
                {metaTags.map(({ name, content }, idx) => (
                  <tr key={idx}>
                    <td className="border border-border px-3 py-2 font-mono lowercase">{name}</td>
                    <td className="border border-border px-3 py-2 break-words">{content || '—'}</td>
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
              {history.map(h => (
                <div
                  key={h.id}
                  className="p-4 border rounded bg-background shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-sm text-muted-foreground break-words max-w-xs">
                      <strong>Input:</strong> {h.input.length > 60 ? h.input.slice(0, 60) + '...' : h.input}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(h.input)}
                        className="px-2 py-1 bg-muted rounded text-sm flex items-center gap-1 hover:bg-muted/80 transition"
                      >
                        <Copy size={14} /> Copy
                      </button>
                      <button
                        onClick={() => removeItem(h.id)}
                        className="px-2 py-1 text-red-500 text-sm hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground max-h-28 overflow-auto">
                    <strong>Meta Tags:</strong>
                    <ul className="list-disc list-inside">
                      {h.metaTags.map(({ name, content }, i) => (
                        <li key={i} className="break-words">
                          <code>{name}:</code> {content || '—'}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AdBanner position="middle" className="mt-8" />

        <div className="bg-card rounded-lg border border-border p-6 mt-8">
          <h3 className="text-xl font-semibold mb-3">Tips</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Always include a descriptive &lt;title&gt; tag for your page.</li>
            <li>Write concise and relevant &lt;meta name="description"&gt; content.</li>
            <li>Use Open Graph tags to improve social media sharing appearance.</li>
            <li>Validate your meta tags regularly to maintain SEO health.</li>
          </ul>
        </div>

        <FAQ faqs={FAQS} />
      </div>
    </>
  );
}
