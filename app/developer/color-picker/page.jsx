'use client';

import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateFAQSchema, generateToolSchema } from '@/lib/utils';
import { Copy, Pipette } from 'lucide-react';
import { useState, useEffect } from 'react';

const faqs = [
  {
    question: "What is a Color Picker Tool?",
    answer: "A color picker tool lets you choose colors visually or by entering values in HEX, RGB, or HSL formats. It's essential for developers and designers."
  },
  {
    question: "Is the color picker accurate?",
    answer: "Yes, the color values are generated precisely based on your input or selection."
  },
  {
    question: "Can I generate color palettes?",
    answer: "Yes, you can generate shades, tints, and gradients based on your chosen color."
  },
  {
    question: "Is my color data stored?",
    answer: "No, everything runs locally in your browser and no data is sent to a server."
  }
];

// Helper: Convert HEX to RGB
const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
};

// Helper: Convert RGB to HSL
const rgbToHsl = ({ r, g, b }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export default function ColorPickerPage() {
  const [color, setColor] = useState('#ff5733');
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [hsl, setHsl] = useState({ h: 11, s: 100, l: 60 });

  // Update RGB & HSL when HEX changes
  useEffect(() => {
    try {
      const rgbObj = hexToRgb(color);
      setRgb(rgbObj);
      setHsl(rgbToHsl(rgbObj));
    } catch {
      // ignore invalid colors
    }
  }, [color]);

  const copyText = (text) => navigator.clipboard.writeText(text);

  const downloadColors = () => {
    const data = `
HEX: ${color}
RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)
`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-info.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const useEyedropper = async () => {
    if (!window.EyeDropper) {
      alert('Eyedropper API is not supported in your browser.');
      return;
    }
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
    } catch (e) {
      console.error(e);
    }
  };

  const toolSchema = generateToolSchema({
    title: 'Color Picker & Generator',
    description: 'Pick, generate, and copy colors in HEX, RGB, and HSL formats. Developer-friendly online color picker tool.',
    url: '/developer/color-picker'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Color Picker & Generator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pick colors visually, generate palettes, and copy HEX, RGB, or HSL values instantly.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool Interface */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-12 border border-input rounded-lg cursor-pointer"
            />

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono w-16">HEX:</span>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 p-2 border border-input rounded-lg"
                />
                <button onClick={() => copyText(color)} className="p-2 hover:bg-accent rounded"><Copy size={16} /></button>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono w-16">RGB:</span>
                <span className="flex-1">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
                <button onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="p-2 hover:bg-accent rounded"><Copy size={16} /></button>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono w-16">HSL:</span>
                <span className="flex-1">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</span>
                <button onClick={() => copyText(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="p-2 hover:bg-accent rounded"><Copy size={16} /></button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={downloadColors} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">Download</button>
              <button onClick={useEyedropper} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2">
                <Pipette    size={16} /> Eyedropper
              </button>
            </div>
          </div>

          {/* Output Preview */}
          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div className="w-full h-64 rounded-lg border border-input" style={{ backgroundColor: color }} />
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
