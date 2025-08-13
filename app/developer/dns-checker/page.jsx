  'use client';

  import AdBanner from '@/components/ads/AdBanner';
  import FAQ from '@/components/ui/FAQ';
  import { generateFAQSchema, generateToolSchema } from '@/lib/utils';
  import { useState } from 'react';

  const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA'];

  const faqs = [
    {
      question: "What is a DNS Checker?",
      answer: "A DNS Checker allows you to look up DNS records for any domain name to verify their settings."
    },
    {
      question: "Which DNS record types can I check?",
      answer: "You can check common DNS record types like A, AAAA, CNAME, MX, TXT, NS, and SOA."
    },
    {
      question: "How does this tool work?",
      answer: "This tool uses Google's free DNS-over-HTTPS API to fetch DNS records instantly."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, your queries are sent securely to Google's DNS servers and no data is stored by this site."
    }
  ];

  export default function DNSCheckerPage() {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleCheckAllDNS() {
      if (!domain.trim()) {
        setError('Please enter a domain name');
        setResults({});
        return;
      }
      setLoading(true);
      setError('');
      setResults({});

      try {
        const allResults = {};
        // Query all record types in parallel
        await Promise.all(
          RECORD_TYPES.map(async (type) => {
            const res = await fetch(
              `https://dns.google/resolve?name=${encodeURIComponent(domain.trim())}&type=${type}`
            );
            const data = await res.json();
            if (data.Status === 0 && data.Answer) {
              allResults[type] = data.Answer;
            } else {
              allResults[type] = null; // no results or error
            }
          })
        );
        setResults(allResults);
      } catch (e) {
        setError('Network error. Please try again.');
        setResults({});
      }
      setLoading(false);
    }

    const toolSchema = generateToolSchema({
      title: 'DNS Checker',
      description: 'Check all DNS record types for any domain instantly using Google DNS-over-HTTPS API.',
      url: '/developer/dns-checker'
    });

    const faqSchema = generateFAQSchema(faqs);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">DNS Checker</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quickly check all common DNS records for any domain using Google DNS-over-HTTPS API.
            </p>
          </div>

          {/* Ad Banner */}
          <AdBanner position="top" className="mb-8" />

          {/* Tool interface */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
            {/* Left: Inputs and results */}
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
                    handleCheckAllDNS();
                  }
                }}
                className="w-full p-3 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                spellCheck={false}
                autoComplete="off"
              />

              <button
                onClick={handleCheckAllDNS}
                disabled={loading}
                className="w-full py-3 px-4 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check All DNS Records'}
              </button>

              {/* Error message */}
              {error && (
                <p className="mt-4 text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                  {error}
                </p>
              )}

              {/* Result display */}
              {Object.keys(results).length > 0 && (
                <div className="mt-6 overflow-auto bg-muted rounded p-4 border border-border text-sm font-mono">
                  {RECORD_TYPES.map((type) => (
                    <div key={type} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-semibold mb-2">{type} Records</h3>
                      {results[type] === null && (
                        <p className="italic text-muted-foreground">No records found.</p>
                      )}
                      {results[type] && (
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-1">Name</th>
                              <th className="text-left p-1">TTL</th>
                              <th className="text-left p-1">Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results[type].map((rec, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted'}>
                                <td className="p-1">{rec.name}</td>
                                <td className="p-1">{rec.TTL ?? rec.ttl ?? '-'}</td>
                                <td className="p-1 break-words">{rec.data}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))}
                </div>
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
