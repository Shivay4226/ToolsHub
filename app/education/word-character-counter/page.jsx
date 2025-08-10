'use client';

import { useState } from 'react';
import { Type } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: "How does this Word & Character Counter work?",
    answer: "Simply type or paste your text into the box, and it will automatically count words and characters in real-time."
  },
  {
    question: "Does it count spaces as characters?",
    answer: "Yes, it counts both with and without spaces for clarity."
  },
  {
    question: "Is there a limit to the text I can enter?",
    answer: "No, you can enter as much text as you like, though extremely large inputs may affect performance."
  },
  {
    question: "Can I use it for multiple languages?",
    answer: "Yes, it works for all languages supported by your device's keyboard."
  }
];

export default function WordCharacterCounterPage() {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;

  const toolSchema = generateToolSchema({
    title: 'Word & Character Counter - Count Words and Characters Online',
    description: 'Free online tool to count words and characters in your text instantly. Perfect for writers, students, and professionals.',
    url: '/writing/word-character-counter'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Word & Character Counter</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Instantly count words, characters (with and without spaces) as you type or paste your text.
            Ideal for writers, students, and social media posts.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Enter Your Text</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={10}
              className="w-full px-4 py-3 border border-input rounded-lg bg-background resize-none"
            ></textarea>
          </div>

          {/* Results Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Results</h2>
            {text.length > 0 ? (
              <>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center shadow hover:shadow-md transition">
                    <h2 className="text-lg font-semibold text-gray-700">Words</h2>
                    <p className="text-3xl font-bold text-blue-600">{wordCount}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center shadow hover:shadow-md transition">
                    <h2 className="text-lg font-semibold text-gray-700">Characters</h2>
                    <p className="text-3xl font-bold text-green-600">{charCount}</p>
                  </div>
                </div>
                <div className="mt-4 bg-green-50 p-4 rounded-lg text-center shadow hover:shadow-md transition">
                  <h2 className="text-lg font-semibold text-gray-700">Characters (without spaces)</h2>
                  <p className="text-3xl font-bold text-green-600">{charCountNoSpaces}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Start typing or paste text to see the word and character counts
              </div>
            )}
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* Tips */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Tips for Writing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">✍ Keep sentences concise for clarity.</div>
            <div className="bg-muted/20 p-4 rounded-lg">📖 Read aloud to catch mistakes.</div>
            <div className="bg-muted/20 p-4 rounded-lg">🔍 Check word limits for essays or posts.</div>
            <div className="bg-muted/20 p-4 rounded-lg">🗒 Break long paragraphs into shorter ones.</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
