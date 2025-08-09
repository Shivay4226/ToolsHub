'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const faqs = [
  {
    question: 'What is JSON?',
    answer:
      'JSON (JavaScript Object Notation) is a lightweight data-interchange format, easy for humans to read and write, and easy for machines to parse and generate.',
  },
  {
    question: 'How do I validate JSON?',
    answer:
      'Paste your JSON text into the input box and click "Validate JSON". The tool will check if the JSON syntax is correct.',
  },
  {
    question: 'Can I format my JSON here?',
    answer:
      'Yes! If your JSON is valid, the output box will show pretty-formatted JSON for easier reading.',
  },
  {
    question: 'Is my JSON data sent anywhere?',
    answer:
      'No, all validation and formatting happen locally in your browser; your data is never sent to a server.',
  },
];

export default function JsonValidator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const splitterRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateJson = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError('');
    } catch (err) {
      setOutput('');
      setError(err.message);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Drag handlers for splitter
  useEffect(() => {
    function onMouseMove(e) {
      if (!isDragging) return;
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      let newLeftWidth = e.clientX - containerRect.left;

      // minimum widths
      const minWidth = 150;
      const maxWidth = containerRect.width - minWidth;

      if (newLeftWidth < minWidth) newLeftWidth = minWidth;
      if (newLeftWidth > maxWidth) newLeftWidth = maxWidth;

      leftRef.current.style.width = `${newLeftWidth}px`;
      rightRef.current.style.width = `${containerRect.width - newLeftWidth}px`;
    }

    function onMouseUp() {
      setIsDragging(false);
    }

    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center text-foreground">JSON Validator</h1>

      {/* Ad Banner Top */}
      <AdBanner position="top" className="mb-8" />

      {/* Container with left/right panels */}
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row border border-input rounded-lg overflow-hidden"
        style={{ height: '800px', userSelect: isDragging ? 'none' : 'auto' }}
      >
        {/* Left panel */}
        <div
          ref={leftRef}
          className="flex flex-col p-4"
          style={{ width: '50%', minWidth: 150, overflow: 'hidden' }}
        >
          <label
            htmlFor="json-input"
            className="block mb-2 font-medium text-sm text-foreground"
          >
            Enter JSON
          </label>
          <textarea
            id="json-input"
            rows={100}
            className="flex-grow p-3 border border-input rounded-lg font-mono text-sm text-foreground resize-none"
            placeholder="Paste or type JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={validateJson} className="mt-4 w-full md:w-auto px-6">
            Validate JSON
          </Button>
          {error && (
            <p className="mt-4 text-destructive font-semibold bg-destructive/10 p-3 rounded border border-destructive/20">
              JSON Invalid: {error}
            </p>
          )}
        </div>

        {/* Splitter */}
        <div
          ref={splitterRef}
          onMouseDown={() => setIsDragging(true)}
          className="md:cursor-col-resize cursor-row-resize bg-border"
          style={{ width: '5px', userSelect: 'none' }}
          aria-label="Resize panels"
          role="separator"
          tabIndex={0}
          onKeyDown={(e) => {
            // optional: allow keyboard resizing here if desired
          }}
        />

        {/* Right panel */}
        <div
          ref={rightRef}
          className="flex flex-col p-4"
          style={{ width: '50%', minWidth: 150, overflow: 'hidden' }}
        >
          <div className='flex items-center justify-between mb-3'>
            <label className="block mb-2 font-medium text-sm text-foreground">
              Valid JSON (pretty formatted)
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => copyText(output)}
                    className="mt-2 self-start p-2 rounded hover:bg-accent transition"
                    aria-label="Copy JSON"
                    title="Copy JSON"
                    disabled={!output}
                  >
                    <Copy size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Copy JSON</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <textarea
            readOnly
            rows={100}
            className="flex-grow p-3 border border-input rounded-lg font-mono text-sm text-foreground resize-none"
            value={output}
          />
        </div>
      </div>

      {/* Ad Banner Middle */}
      <AdBanner position="middle" className="my-12" />

      {/* FAQ */}
      <FAQ faqs={faqs} />
    </div>
  );
}
