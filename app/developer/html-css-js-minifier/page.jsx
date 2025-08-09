'use client';

import AdBanner from '@/components/ads/AdBanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FAQ from '@/components/ui/FAQ';
import { generateFAQSchema, generateToolSchema } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { useState } from 'react';

const tabItems = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'js', label: 'JS' },
];

function CodeTypeTabs({ codeType, setCodeType }) {
  return (
    <Tabs
      defaultValue={codeType}
      onValueChange={setCodeType}
    >
      <TabsList className="max-h-40 h-[6.5vh]">
        {tabItems.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="
                data-[state=active]:bg-primary
                data-[state=active]:text-white
                data-[state=active]:font-semibold
                font-medium
                text-md
                px-4
                py-2
              "
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

const faqs = [
  {
    question: "What does this minifier do?",
    answer: "It removes unnecessary whitespace, comments, and line breaks from your HTML, CSS, or JavaScript code to reduce size and improve load times."
  },
  {
    question: "Does it affect code functionality?",
    answer: "No, it only removes spaces and comments without changing how your code works."
  },
  {
    question: "Can I minify all three code types here?",
    answer: "Yes, just select the code type from the dropdown and paste your code to get a minified version."
  },
  {
    question: "Is my code saved or sent anywhere?",
    answer: "No, all minification happens locally in your browser; your code never leaves your device."
  }
];

// Simple minification functions for demo
const minifyHTML = (code) => {
  // Remove comments, line breaks, multiple spaces between tags/text
  return code
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/\n+/g, '') // Remove line breaks
    .replace(/\s{2,}/g, ' ') // Reduce multiple spaces to one
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .trim();
};

const minifyCSS = (code) => {
  // Remove comments, whitespace, line breaks
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around symbols
    .replace(/\n/g, '') // Remove line breaks
    .replace(/\s+/g, ' ') // Replace multiple spaces with one
    .trim();
};

const minifyJS = (code) => {
  // Remove comments (single-line and multi-line) and whitespace
  return code
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\s*([{}();=,+\-*<>])\s*/g, '$1') // Remove spaces around common JS symbols
    .replace(/\n/g, '') // Remove line breaks
    .replace(/\s+/g, ' ') // Replace multiple spaces with one
    .trim();
};

export default function HtmlCssJsMinifier() {
  const [codeType, setCodeType] = useState('html');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState('');

  const minifyCode = () => {
    setError('');
    try {
      if (!inputCode.trim()) {
        setOutputCode('');
        setError('Please enter some code to minify.');
        return;
      }

      let result = '';
      switch (codeType) {
        case 'html':
          result = minifyHTML(inputCode);
          break;
        case 'css':
          result = minifyCSS(inputCode);
          break;
        case 'js':
          result = minifyJS(inputCode);
          break;
        default:
          setError('Unsupported code type.');
          return;
      }
      setOutputCode(result);
    } catch (e) {
      setError('An error occurred during minification.');
      setOutputCode('');
    }
  };

  const copyText = (text) => navigator.clipboard.writeText(text);

  const toolSchema = generateToolSchema({
    title: 'HTML, CSS, JS Minifier',
    description: 'Minify your HTML, CSS, or JavaScript code easily online to reduce file size and improve performance.',
    url: '/tools/html-css-js-minifier'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">HTML, CSS, JS Minifier</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Minify your HTML, CSS, or JavaScript code easily online to reduce file size and improve performance.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool Interface */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="segmented-control">
              <CodeTypeTabs codeType={codeType} setCodeType={setCodeType} />
            </div>

          </div>

          <label htmlFor="input-code" className="block font-medium mb-2">
            Enter your {codeType.toUpperCase()} code:
          </label>
          <textarea
            id="input-code"
            rows={10}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={`Paste your ${codeType.toUpperCase()} code here...`}
            className="w-full p-3 border border-input rounded font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          {error && (
            <p className="mt-2 text-destructive text-sm bg-destructive/10 p-2 rounded border border-destructive/20">
              {error}
            </p>
          )}

          <button
            onClick={minifyCode}
            className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            type="button"
          >
            Minify
          </button>

          {outputCode && (
            <>
              <label htmlFor="output-code" className="block font-medium mt-6 mb-2">
                Minified {codeType.toUpperCase()} code:
              </label>
              <div className="relative">
                <textarea
                  id="output-code"
                  rows={10}
                  value={outputCode}
                  readOnly
                  className="w-full p-3 border border-input rounded font-mono text-sm resize-y bg-muted"
                />
                <button
                  onClick={() => copyText(outputCode)}
                  title="Copy minified code"
                  className="absolute top-2 right-2 p-2 hover:bg-accent rounded"
                  type="button"
                >
                  <Copy size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
