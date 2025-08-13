'use client';

import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateFAQSchema, generateToolSchema } from '@/lib/utils';
import { useState } from 'react';

const faqs = [
  {
    question: "What is a Domain Availability Checker?",
    answer: "It allows you to check if a domain name is currently available for registration."
  },
  {
    question: "Which domain extensions can I check?",
    answer: "You can check common domain extensions like .com, .net, .org, and others."
  },
  {
    question: "How does this tool work?",
    answer: "This tool queries a public domain database API to verify domain availability in real-time."
  },
  {
    question: "Is my search data stored?",
    answer: "No, your domain searches are not stored or tracked by this site."
  }
];

export default function DomainAvailabilityCheckerPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to parse domain and extension
  function parseDomain(fullDomain) {
    const parts = fullDomain.toLowerCase().trim().split('.');
    if (parts.length < 2) return null;
    return {
      name: parts.slice(0, parts.length - 1).join('.'),
      extension: parts[parts.length - 1],
    };
  }

  // Function to generate related domain suggestions
  function generateDomainSuggestions(name, extension) {
    const prefixes = ['get', 'my', 'the', 'go', 'try', 'best'];
    const suffixes = ['hub', 'app', 'online', 'pro', 'site', 'world'];
    const numbers = [101, 123, 360, 247, 999];
    const otherExtensions = ['net', 'org', 'co', 'io', 'dev', 'app', 'xyz', 'ai', 'tech'];

    const suggestions = new Set();

    prefixes.forEach(pre => suggestions.add(`${pre}${name}.${extension}`));
    suffixes.forEach(suf => suggestions.add(`${name}${suf}.${extension}`));
    numbers.forEach(num => suggestions.add(`${name}${num}.${extension}`));
    otherExtensions.forEach(ext => suggestions.add(`${name}.${ext}`));

    return Array.from(suggestions);
  }


  // Function to check domain availability
  async function checkDomainAvailability(checkDomain) {
    try {
      const res = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(checkDomain)}&type=NS`
      );
      const data = await res.json();
      return data.Status === 3 || !data.Answer; // true if available
    } catch {
      return false;
    }
  }

  // Main check function
  async function handleCheckAvailability() {
    setError('');
    setResults(null);

    if (!domain.trim()) {
      setError('Please enter a domain name.');
      return;
    }

    const parsed = parseDomain(domain);
    if (!parsed) {
      setError('Please enter a valid domain name including extension (e.g. example.com).');
      return;
    }

    setLoading(true);
    try {
      const isAvailable = await checkDomainAvailability(domain.trim());

      if (isAvailable) {
        setResults({ available: true });
      } else {
        const suggestions = generateDomainSuggestions(parsed.name, parsed.extension);
        console.log('Suggestions:', suggestions); // Debugging
        const availableSuggestions = [];

        for (let sug of suggestions) {
          const sugAvailable = await checkDomainAvailability(sug);
          if (sugAvailable) availableSuggestions.push(sug);
        }

        setResults({ available: false, suggestions: availableSuggestions });
      }
    } catch (e) {
      setError('Failed to check domain availability. Please try again later.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  const toolSchema = generateToolSchema({
    title: 'Domain Availability Checker',
    description: 'Check if any domain name is available for registration instantly.',
    url: '/developer/domain-availability-checker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Domain Availability Checker</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quickly check if any domain name is available for registration.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool interface */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div>
            <label htmlFor="domain-input" className="block text-sm font-medium mb-2">
              Enter domain name
            </label>
            <input
              id="domain-input"
              type="text"
              placeholder="e.g. example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCheckAvailability();
                }
              }}
              className="w-full p-3 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
              spellCheck={false}
              autoComplete="off"
            />

            <button
              onClick={handleCheckAvailability}
              disabled={loading}
              className="w-full py-3 px-4 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Domain Availability'}
            </button>

            {/* Error message */}
            {error && (
              <p className="mt-4 text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                {error}
              </p>
            )}

            {/* Result display */}
            {results && (
              <>
                <div
                  className={`mt-6 p-4 rounded border text-center font-semibold ${results.available
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : 'bg-red-100 border-red-400 text-red-700'
                    }`}
                >
                  {results.available
                    ? `Good news! The domain "${domain.trim()}" is available for registration.`
                    : `Sorry, the domain "${domain.trim()}" is already taken.`}
                </div>

                {/* Suggestions */}
                {!results.available && results.suggestions?.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
                    <p className="font-semibold mb-2">Available Alternatives:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {results.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setDomain(sug); handleCheckAvailability(sug); }}
                          className="p-3 border rounded-lg text-center hover:bg-primary/10 transition"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
