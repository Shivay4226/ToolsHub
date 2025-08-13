'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
    {
        question: 'What is Base64 and why use it?',
        answer: 'Base64 is an encoding technique used to convert binary data into a text format. It’s commonly used to embed image or file data in text documents like HTML or JSON.'
    },
    {
        question: 'Is Base64 secure?',
        answer: 'Base64 is not encryption. It only encodes data for transmission. Do not use it for secure data handling without proper encryption.'
    },
    {
        question: 'Can I decode images/files from Base64?',
        answer: 'Yes, if the Base64 string represents a file, you can decode and download it as the original file format.'
    },
    {
        question: 'Does this tool work offline?',
        answer: 'Yes, all encoding/decoding happens in your browser. Nothing is sent to any server.'
    }
];

export default function Base64ToolPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const clearMessagesAfterDelay = () => {
        setTimeout(() => {
            setStatus('');
            setError('');
        }, 2000);
    };

    const encodeBase64 = () => {
        try {
            const encoded = btoa(input);
            setOutput(encoded);
            setIsValid(true);
            setStatus('Encoded successfully');
            setError('');
        } catch (e) {
            setError('Encoding failed. Make sure input is valid text.');
            setStatus('');
        }
        clearMessagesAfterDelay();
    };

    const decodeBase64 = () => {
        try {
            const decoded = atob(input);
            setOutput(decoded);
            setStatus('Decoded successfully');
            setError('');
        } catch (e) {
            setError('Decoding failed. Invalid Base64 string.');
            setStatus('');
        }
        clearMessagesAfterDelay();
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
        setStatus('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const downloadOutput = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const toolSchema = generateToolSchema({
        title: 'Base64 Encoder & Decoder',
        description: 'Encode and decode Base64 online. Convert text or files to Base64 and back quickly and securely.',
        url: '/developer/base64-encoder-decoder'
    });

    const faqSchema = generateFAQSchema(faqs);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Base64 Encoder & Decoder</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Encode text or files to Base64 and decode Base64 to original text. Fast, secure, and browser-based.
                    </p>
                </div>

                <AdBanner position="top" className="mb-8" />

                <div className="bg-card rounded-lg border p-6 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Input */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium">Input</label>
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
                                placeholder="Enter text or Base64 here..."
                                className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-background text-foreground"
                            />
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={encodeBase64}
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
                                >
                                    Encode Base64
                                </button>
                                <button
                                    onClick={decodeBase64}
                                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80"
                                >
                                    Decode Base64
                                </button>
                            </div>
                        </div>

                        {/* Output */}
                        <div className='mt-[-5px]'>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium">Output</label>
                                <div className={`flex gap-2 transition-opacity duration-300 ${output ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent"
                                        title="Copy"
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button
                                        onClick={downloadOutput}
                                        className="text-muted-foreground hover:text-primary p-1.5 rounded hover:bg-accent"
                                        title="Download"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>

                            </div>
                            <textarea
                                value={output}
                                readOnly
                                placeholder="Result will appear here..."
                                className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-muted/20 text-foreground"
                            />
                            <div className="mt-3 min-h-[40px] transition-all">
                                {error && (
                                    <div className="text-destructive text-sm bg-destructive/10 p-2 rounded border border-destructive/20">
                                        {error}
                                    </div>
                                )}
                                {status && !error && (
                                    <div className="text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                                        ✓ {status}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                <AdBanner position="middle" className="mb-8" />

                <div className="bg-card rounded-lg border p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                                📤
                            </div>
                            <h3 className="font-semibold mb-2">Base64 Encode</h3>
                            <p className="text-sm text-muted-foreground">Convert any text or file into Base64 format easily.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-500">
                                📥
                            </div>
                            <h3 className="font-semibold mb-2">Base64 Decode</h3>
                            <p className="text-sm text-muted-foreground">Decode Base64 back into readable content.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-violet-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-violet-500">
                                🗂️
                            </div>
                            <h3 className="font-semibold mb-2">Text & Files</h3>
                            <p className="text-sm text-muted-foreground">Supports text and file input for maximum flexibility.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-amber-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-500">
                                🔐
                            </div>
                            <h3 className="font-semibold mb-2">Secure & Local</h3>
                            <p className="text-sm text-muted-foreground">No data leaves your device. Everything is processed locally.</p>
                        </div>
                    </div>
                </div>

                <FAQ faqs={faqs} />
            </div>
        </>
    );
}