'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, RefreshCw, Search, Code, LayoutGrid } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'What is an IP address?',
    answer: 'An IP address uniquely identifies devices on the internet or local network.'
  },
  {
    question: 'How does this tool work?',
    answer:
      'It fetches your public IP automatically and lets you lookup details about any other IP or hostname.'
  },
  {
    question: 'What info do you provide about the IP?',
    answer:
      'Location, city, region, country, ISP, organization, timezone, and more if available.'
  },
  {
    question: 'Is my data private?',
    answer: 'Yes, all lookups happen via trusted public APIs and your data is not stored.'
  }
];

const DEFAULT_IP_API = 'https://api.ipify.org?format=json';
const IP_INFO_API = 'https://ipinfo.io'; // free tier supports limited requests, requires token for more
const IPINFO_TOKEN = null; // or 'your_token_here'

export default function IpAddressInfoFinder() {
  const [input, setInput] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [viewJson, setViewJson] = useState(false);

  useEffect(() => {
    fetchUserIp();
  }, []);

  const fetchUserIp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(DEFAULT_IP_API);
      if (!res.ok) throw new Error('Failed to fetch IP');
      const data = await res.json();
      setInput(data.ip);
      fetchIpInfo(data.ip);
    } catch {
      setError('Unable to fetch your IP address.');
    } finally {
      setLoading(false);
    }
  };

  const fetchIpInfo = async (query) => {
    setLoadingInfo(true);
    setError('');
    setInfo(null);
    if (!query) {
      setError('Please enter an IP address or hostname.');
      setLoadingInfo(false);
      return;
    }

    try {
      const url = IPINFO_TOKEN
        ? `${IP_INFO_API}/${query}/json?token=${IPINFO_TOKEN}`
        : `${IP_INFO_API}/${query}/json`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch IP info');
      const data = await res.json();

      if (data.error) {
        setError(`Error: ${data.error.message || 'No data found for this IP.'}`);
        setInfo(null);
      } else {
        setInfo(data);
      }
    } catch {
      setError('Failed to fetch IP information.');
      setInfo(null);
    } finally {
      setLoadingInfo(false);
    }
  };

  const onSearchClick = () => {
    fetchIpInfo(input.trim());
  };

  const copyToClipboard = () => {
    if (info) {
      navigator.clipboard.writeText(JSON.stringify(info, null, 2));
    }
  };

  const downloadInfo = () => {
    if (info) {
      const blob = new Blob([JSON.stringify(info, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ip-info-${input || 'result'}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setInput('');
    setInfo(null);
    setError('');
  };

  const toolSchema = generateToolSchema({
    title: 'IP Address Info Finder',
    description: 'Find your public IP or lookup any IP/hostname info including location, ISP, and more.',
    url: '/tools/ip-address-info-finder'
  });

  const faqSchema = generateFAQSchema(faqs);

  // Helper to split location coords if available
  const getCoords = (loc) => {
    if (!loc) return null;
    const [lat, lon] = loc.split(',');
    return { lat, lon };
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">IP Address Info Finder</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automatically detects your public IP and lets you lookup detailed info about any IP or hostname.
          </p>
        </div>

        <AdBanner position="top" className="mb-8" />

        {/* Input + Actions */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              className="flex-grow p-3 border border-input rounded-lg font-mono text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
              placeholder="Enter IP address or hostname"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
              disabled={loading}
            />
            <button
              onClick={onSearchClick}
              disabled={loading}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              title="Lookup IP Info"
            >
              <Search size={16} />
              Lookup
            </button>
            <button
              onClick={fetchUserIp}
              disabled={loading}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
              title="Fetch My IP"
            >
              <RefreshCw size={16} />
              My IP
            </button>
          </div>

          {/* Loading and error */}
          <div className="mt-4 min-h-[40px]">
            {loading && <p className="text-muted-foreground">Fetching your IP address...</p>}
            {loadingInfo && <p className="text-muted-foreground">Fetching IP information...</p>}
            {error && <p className="text-destructive">{error}</p>}
          </div>
        </div>

        {/* Display IP info */}
        {info && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-foreground">
                IP Information: <span className="font-mono">{input}</span>
              </h2>

              <div className="flex gap-3 items-center">
                {/* View toggle button */}
                <button
                  onClick={() => setViewJson(!viewJson)}
                  title={viewJson ? 'View Card' : 'View JSON'}
                  className="text-muted-foreground hover:text-primary p-2 rounded hover:bg-accent transition-colors"
                >
                  {viewJson ? <LayoutGrid size={20} /> : <Code size={20} />}
                </button>

                <button
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-primary p-2 rounded hover:bg-accent transition-colors"
                  title="Copy Info"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={downloadInfo}
                  className="text-muted-foreground hover:text-primary p-2 rounded hover:bg-accent transition-colors"
                  title="Download Info"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>

            {/* Card view */}
            {!viewJson && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground">
                <div>
                  <p><span className="font-semibold">IP:</span> {info.ip || 'N/A'}</p>
                  <p><span className="font-semibold">Hostname:</span> {info.hostname || 'N/A'}</p>
                  <p><span className="font-semibold">City:</span> {info.city || 'N/A'}</p>
                  <p><span className="font-semibold">Region:</span> {info.region || 'N/A'}</p>
                  <p><span className="font-semibold">Country:</span> {info.country || 'N/A'}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Location:</span> {info.loc || 'N/A'}</p>
                  <p><span className="font-semibold">Organization:</span> {info.org || 'N/A'}</p>
                  <p><span className="font-semibold">Timezone:</span> {info.timezone || 'N/A'}</p>
                  {getCoords(info.loc) && (
                    <p>
                      <a
                        href={`https://www.google.com/maps?q=${getCoords(info.loc).lat},${getCoords(info.loc).lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        View on Google Maps
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* JSON view */}
            {viewJson && (
              <pre className="whitespace-pre-wrap text-sm font-mono bg-muted/20 p-4 rounded overflow-x-auto max-h-[400px]">
                {JSON.stringify(info, null, 2)}
              </pre>
            )}
          </div>
        )}

        <AdBanner position="middle" className="mb-8" />

        {/* Features */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                🌐
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Auto Detect IP</h3>
              <p className="text-sm text-muted-foreground">Find your public IP automatically on page load.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-500">
                🔍
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Lookup Any IP</h3>
              <p className="text-sm text-muted-foreground">Get detailed info about any IP address or hostname.</p>
            </div>
            <div className="text-center">
              <div className="bg-violet-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-violet-500">
                📋
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Copy & Download</h3>
              <p className="text-sm text-muted-foreground">Easily copy or download IP info as JSON.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-500">
                🔒
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Privacy First</h3>
              <p className="text-sm text-muted-foreground">No data is stored; all lookups are done via trusted APIs.</p>
            </div>
          </div>
        </div>

        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
