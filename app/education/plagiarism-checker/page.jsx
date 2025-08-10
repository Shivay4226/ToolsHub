'use client';

import React, { useEffect, useState } from 'react';
import { Search, Upload, Trash2, Copy } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const DEFAULT_FAQS = [
  { question: 'How accurate is the local check?', answer: 'The built-in check compares documents using simple term-frequency cosine similarity — it is fast and useful for detecting copied text between provided documents, but it does not search the web.' },
  { question: 'Can this check the web for plagiarism?', answer: 'Not by default. You can configure an external plagiarism detection API (with an API key) in the tool settings to check against web sources.' },
  { question: 'Where is my data stored?', answer: 'History is stored locally in your browser (localStorage). No data is sent anywhere unless you enable an external API and click "Use External API".' }
];

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function termFreq(tokens) {
  const t = {};
  tokens.forEach(tok => t[tok] = (t[tok] || 0) + 1);
  return t;
}

function dotProduct(a, b) {
  let sum = 0;
  for (const k in a) if (b[k]) sum += a[k] * b[k];
  return sum;
}

function magnitude(a) {
  let sum = 0;
  for (const k in a) sum += a[k] * a[k];
  return Math.sqrt(sum);
}

function cosineSimilarity(a, b) {
  const dp = dotProduct(a, b);
  const mag = magnitude(a) * magnitude(b);
  return mag === 0 ? 0 : dp / mag;
}

export default function PlagiarismChecker() {
  const [sourceText, setSourceText] = useState('');
  const [compareText, setCompareText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useExternal, setUseExternal] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem('plagiarism_history');
    const cfg = localStorage.getItem('plagiarism_cfg');
    if (s) setHistory(JSON.parse(s));
    if (cfg) {
      try {
        const parsed = JSON.parse(cfg);
        setApiUrl(parsed.apiUrl || '');
        setApiKey(parsed.apiKey || '');
        setUseExternal(parsed.useExternal || false);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plagiarism_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('plagiarism_cfg', JSON.stringify({ apiUrl, apiKey, useExternal }));
  }, [apiUrl, apiKey, useExternal]);

  async function handleFileUpload(e, target = 'source') {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('text')) {
      alert('Only text files are supported for upload (.txt).');
      return;
    }
    const txt = await file.text();
    if (target === 'source') setSourceText(txt);
    else setCompareText(txt);
  }

  async function handleCheck() {
    setError(null);
    setResult(null);
    if (!sourceText.trim() || !compareText.trim()) {
      setError('Please provide both source and text to compare.');
      return;
    }

    setLoading(true);
    try {
      if (useExternal && apiUrl) {
        const payload = { source: sourceText, compare: compareText };
        const headers = { 'Content-Type': 'application/json' };
        if (apiKey) headers['Authorization'] = apiKey;
        const res = await fetch(apiUrl, { method: 'POST', headers, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`API Error ${res.status}`);
        const data = await res.json();
        const score = typeof data.score === 'number' ? data.score : null;
        setResult({ type: 'external', score, raw: data });
        setHistory(prev => [{ id: Date.now(), type: 'external', score, source: sourceText.slice(0,300), compare: compareText.slice(0,300), at: new Date().toISOString() }, ...prev].slice(0,50));
      } else {
        const aTokens = tokenize(sourceText);
        const bTokens = tokenize(compareText);
        const aTf = termFreq(aTokens);
        const bTf = termFreq(bTokens);
        const score = cosineSimilarity(aTf, bTf);
        setResult({ type: 'local', score, details: { aTokens: aTokens.length, bTokens: bTokens.length } });
        setHistory(prev => [{ id: Date.now(), type: 'local', score, source: sourceText.slice(0,300), compare: compareText.slice(0,300), at: new Date().toISOString() }, ...prev].slice(0,50));
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Check failed');
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    if (!confirm('Clear all history?')) return;
    setHistory([]);
  }

  function removeItem(id) {
    setHistory(prev => prev.filter(h => h.id !== id));
  }

  function copyText(t) {
    navigator.clipboard?.writeText(t);
  }

  const toolSchema = generateToolSchema({
    title: 'Plagiarism Checker - Compare Text Similarity',
    description: 'Compare two pieces of text for similarity. Built-in local check (cosine similarity) and optional external API integration.',
    url: '/tools/plagiarism-checker'
  });

  const faqSchema = generateFAQSchema(DEFAULT_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Plagiarism Checker</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Compare two documents for similarity. Use the local check or connect an external plagiarism API.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Source Text</label>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border rounded resize-none"
                placeholder="Paste or upload your source text here"
              />
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-1 cursor-pointer text-sm text-primary">
                  <input type="file" accept="text/*" className="hidden" onChange={(e) => handleFileUpload(e, 'source')} />
                  <Upload size={18} />
                  Upload
                </label>
                <button
                  onClick={() => setSourceText('')}
                  className="px-3 py-1 bg-muted rounded text-sm hover:bg-muted/80 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compare With</label>
              <textarea
                value={compareText}
                onChange={(e) => setCompareText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border rounded resize-none"
                placeholder="Paste or upload text to compare"
              />
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-1 cursor-pointer text-sm text-primary">
                  <input type="file" accept="text/*" className="hidden" onChange={(e) => handleFileUpload(e, 'compare')} />
                  <Upload size={18} />
                  Upload
                </label>
                <button
                  onClick={() => setCompareText('')}
                  className="px-3 py-1 bg-muted rounded text-sm hover:bg-muted/80 transition"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input type="checkbox" checked={useExternal} onChange={(e) => setUseExternal(e.target.checked)} />
              Use External API
            </label>

            {useExternal && (
              <>
                <input
                  type="text"
                  placeholder="API URL"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="px-3 py-1 border rounded w-full max-w-md"
                />
                <input
                  type="text"
                  placeholder="API Key (optional)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="px-3 py-1 border rounded w-full max-w-xs"
                />
              </>
            )}

            <button
              onClick={handleCheck}
              disabled={loading}
              className="ml-auto px-5 py-2 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition flex items-center gap-2"
            >
              {loading ? 'Checking...' : (<><Search size={18} /> Check</>)}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Result</h3>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {result ? (
              <div className="p-4 border rounded bg-background">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Method</div>
                    <div className="font-medium">{result.type === 'local' ? 'Local TF Cosine Similarity' : 'External API Result'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Similarity</div>
                    <div className="text-3xl font-bold">{Math.round((result.score ?? 0) * 100)}%</div>
                  </div>
                </div>

                {result.details && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Tokens: source {result.details.aTokens}, compare {result.details.bTokens}
                  </div>
                )}

                {result.raw && (
                  <pre className="mt-3 text-xs overflow-auto max-h-40 bg-white p-2 rounded border">
                    {JSON.stringify(result.raw, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">No result yet. Click Check to compare.</div>
            )}
          </div>
        </div>

        {/* History section at bottom */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm mt-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">History</h3>
            <button
              onClick={clearAll}
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
                  title="Click to copy source or compare text"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-sm text-muted-foreground">{new Date(h.at).toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyText(h.source)}
                        className="px-2 py-1 bg-muted rounded text-sm flex items-center gap-1 hover:bg-muted/80 transition"
                      >
                        <Copy size={14} /> Copy Source
                      </button>
                      <button
                        onClick={() => copyText(h.compare)}
                        className="px-2 py-1 bg-muted rounded text-sm flex items-center gap-1 hover:bg-muted/80 transition"
                      >
                        <Copy size={14} /> Copy Compare
                      </button>
                      <button
                        onClick={() => removeItem(h.id)}
                        className="px-2 py-1 text-red-500 text-sm hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold">Similarity: {Math.round((h.score ?? 0) * 100)}%</div>
                  <div className="mt-1 text-sm text-muted-foreground truncate" title={h.source}>
                    Source: {h.source}
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
            <li>The local check only compares two texts you provide and does not search the web.</li>
            <li>For web-wide plagiarism detection, use a paid/external API that scans the internet and provide the endpoint and key above.</li>
            <li>Keep sensitive content off public APIs unless you trust and own the endpoint.</li>
          </ul>
        </div>

        <FAQ faqs={DEFAULT_FAQS} />
      </div>
    </>
  );
}
