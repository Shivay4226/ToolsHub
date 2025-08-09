'use client';

import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateFAQSchema, generateToolSchema } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';

const faqs = [
  {
    question: "What color formats can I convert?",
    answer: "You can convert colors between HEX, RGB, RGBA, ARGB, HSL, and CMYK formats easily."
  },
  {
    question: "How do I enter colors?",
    answer: "Input any valid color in HEX (#RRGGBB or #RGB), RGB (rgb(r, g, b)), RGBA (rgba(r, g, b, a)), ARGB (#AARRGGBB), HSL (hsl(h, s%, l%)), or CMYK (cmyk(c%, m%, y%, k%)) formats."
  },
  {
    question: "Can I copy the converted colors?",
    answer: "Yes, click the copy icon next to each color format to copy it to your clipboard."
  },
  {
    question: "Is my data safe?",
    answer: "All conversions happen locally in your browser; no data is sent or stored on servers."
  }
];

// Validation helpers
const isValidHex = (hex) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex.trim());
const isValidRgb = (rgb) => /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i.test(rgb.trim());
const isValidRgba = (rgba) => /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/i.test(rgba.trim());
const isValidArgb = (argb) => /^#([0-9a-f]{8})$/i.test(argb.trim());
const isValidHsl = (hsl) => /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i.test(hsl.trim());
const isValidCmyk = (cmyk) => /^cmyk\(\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i.test(cmyk.trim());

// --- Parsing and conversions ---

// HEX -> RGB
const hexToRgb = (hex) => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

// HEX -> RGBA (default alpha 1)
const hexToRgba = (hex, alpha = 1) => {
  const rgb = hexToRgb(hex);
  return { ...rgb, a: alpha };
};

// HEX -> ARGB string (#AARRGGBB)
const hexToArgb = (hex, alpha = 1) => {
  const rgb = hexToRgb(hex);
  const a = Math.round(alpha * 255);
  const aHex = a.toString(16).padStart(2, '0').toUpperCase();
  const rHex = rgb.r.toString(16).padStart(2, '0').toUpperCase();
  const gHex = rgb.g.toString(16).padStart(2, '0').toUpperCase();
  const bHex = rgb.b.toString(16).padStart(2, '0').toUpperCase();
  return `#${aHex}${rHex}${gHex}${bHex}`;
};

// RGB string "rgb(r, g, b)" -> {r,g,b}
const parseRgb = (str) => {
  const m = str.match(/\d+/g);
  if (!m) return null;
  return { r: +m[0], g: +m[1], b: +m[2] };
};

// RGBA string "rgba(r, g, b, a)" -> {r,g,b,a}
const parseRgba = (str) => {
  const m = str.match(/(\d+),\s*(\d+),\s*(\d+),\s*(0|1|0?\.\d+)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: parseFloat(m[4]) };
};

// ARGB string "#AARRGGBB" -> {r,g,b,a}
const parseArgb = (str) => {
  const clean = str.replace('#', '');
  if (clean.length !== 8) return null;
  const a = parseInt(clean.substring(0, 2), 16) / 255;
  const r = parseInt(clean.substring(2, 4), 16);
  const g = parseInt(clean.substring(4, 6), 16);
  const b = parseInt(clean.substring(6, 8), 16);
  return { r, g, b, a };
};

// RGB -> HEX
const rgbToHex = ({ r, g, b }) => {
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

// RGBA -> HEX (drop alpha)
const rgbaToHex = ({ r, g, b }) => rgbToHex({ r, g, b });

// RGB -> RGBA (alpha default 1)
const rgbToRgba = (rgb, alpha = 1) => ({ ...rgb, a: alpha });

// RGB -> ARGB string
const rgbToArgb = (rgb, alpha = 1) => {
  const a = Math.round(alpha * 255);
  const aHex = a.toString(16).padStart(2, '0').toUpperCase();
  const rHex = rgb.r.toString(16).padStart(2, '0').toUpperCase();
  const gHex = rgb.g.toString(16).padStart(2, '0').toUpperCase();
  const bHex = rgb.b.toString(16).padStart(2, '0').toUpperCase();
  return `#${aHex}${rHex}${gHex}${bHex}`;
};

// RGB -> HSL
const rgbToHsl = ({ r, g, b }) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// HSL string "hsl(h, s%, l%)" -> {h,s,l}
const parseHsl = (str) => {
  const m = str.match(/\d+/g);
  if (!m) return null;
  return { h: +m[0], s: +m[1], l: +m[2] };
};

// HSL -> RGB
const hslToRgb = ({ h, s, l }) => {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else[r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
};

// RGB -> CMYK
const rgbToCmyk = ({ r, g, b }) => {
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((c - k) / (1 - k)) * 100),
    m: Math.round(((m - k) / (1 - k)) * 100),
    y: Math.round(((y - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
};

// CMYK string "cmyk(c%, m%, y%, k%)" -> {c,m,y,k}
const parseCmyk = (str) => {
  const m = str.match(/\d+/g);
  if (!m) return null;
  return { c: +m[0], m: +m[1], y: +m[2], k: +m[3] };
};

// CMYK -> RGB
const cmykToRgb = ({ c, m, y, k }) => {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k))
  };
};

// Normalize hex to uppercase #RRGGBB or null if invalid
const normalizeHex = (hex) => {
  if (!isValidHex(hex)) return null;
  let clean = hex.trim().replace('#', '');
  if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
  return '#' + clean.toUpperCase();
};

export default function ColorConverterPage() {
  const [input, setInput] = useState('#3498DB');
  const [error, setError] = useState('');
  const [formats, setFormats] = useState({
    hex: '',
    rgb: '',
    rgba: '',
    argb: '',
    hsl: '',
    cmyk: '',
  });

  useEffect(() => {
    const val = input.trim();
    setError('');
    if (!val) {
      setFormats({ hex: '', rgb: '', rgba: '', argb: '', hsl: '', cmyk: '' });
      return;
    }
    try {
      if (isValidHex(val)) {
        const rgbObj = hexToRgb(val);
        const rgbaObj = hexToRgba(val, 1);
        const hslObj = rgbToHsl(rgbObj);
        const cmykObj = rgbToCmyk(rgbObj);
        setFormats({
          hex: rgbToHex(rgbObj),
          rgb: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          rgba: `rgba(${rgbaObj.r}, ${rgbaObj.g}, ${rgbaObj.b}, ${rgbaObj.a})`,
          argb: hexToArgb(val, 1),
          hsl: `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`,
          cmyk: `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`
        });
      } else if (isValidRgba(val)) {
        const rgbaObj = parseRgba(val);
        if (!rgbaObj) throw new Error('Invalid RGBA format');
        const rgbObj = { r: rgbaObj.r, g: rgbaObj.g, b: rgbaObj.b };
        const hexVal = rgbaToHex(rgbaObj);
        const argbVal = rgbToArgb(rgbObj, rgbaObj.a);
        const hslObj = rgbToHsl(rgbObj);
        const cmykObj = rgbToCmyk(rgbObj);
        setFormats({
          hex: hexVal,
          rgb: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          rgba: val,
          argb: argbVal,
          hsl: `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`,
          cmyk: `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`
        });
      } else if (isValidRgb(val)) {
        const rgbObj = parseRgb(val);
        if (!rgbObj) throw new Error('Invalid RGB format');
        const hexVal = rgbToHex(rgbObj);
        const rgbaVal = rgbToRgba(rgbObj, 1);
        const argbVal = rgbToArgb(rgbObj, 1);
        const hslObj = rgbToHsl(rgbObj);
        const cmykObj = rgbToCmyk(rgbObj);
        setFormats({
          hex: hexVal,
          rgb: val,
          rgba: `rgba(${rgbaVal.r}, ${rgbaVal.g}, ${rgbaVal.b}, ${rgbaVal.a})`,
          argb: argbVal,
          hsl: `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`,
          cmyk: `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`
        });
      } else if (isValidArgb(val)) {
        const rgbaObj = parseArgb(val);
        if (!rgbaObj) throw new Error('Invalid ARGB format');
        const rgbObj = { r: rgbaObj.r, g: rgbaObj.g, b: rgbaObj.b };
        const hexVal = rgbaToHex(rgbaObj);
        const rgbStr = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
        const rgbaStr = `rgba(${rgbaObj.r}, ${rgbaObj.g}, ${rgbaObj.b}, ${rgbaObj.a})`;
        const hslObj = rgbToHsl(rgbObj);
        const cmykObj = rgbToCmyk(rgbObj);
        setFormats({
          hex: hexVal,
          rgb: rgbStr,
          rgba: rgbaStr,
          argb: val.toUpperCase(),
          hsl: `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`,
          cmyk: `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`
        });
      } else if (isValidHsl(val)) {
        const hslObj = parseHsl(val);
        if (!hslObj) throw new Error('Invalid HSL format');
        const rgbObj = hslToRgb(hslObj);
        const hexVal = rgbToHex(rgbObj);
        const rgbaVal = rgbToRgba(rgbObj, 1);
        const argbVal = rgbToArgb(rgbObj, 1);
        const cmykObj = rgbToCmyk(rgbObj);
        setFormats({
          hex: hexVal,
          rgb: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          rgba: `rgba(${rgbaVal.r}, ${rgbaVal.g}, ${rgbaVal.b}, ${rgbaVal.a})`,
          argb: argbVal,
          hsl: val,
          cmyk: `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`
        });
      } else if (isValidCmyk(val)) {
        const cmykObj = parseCmyk(val);
        if (!cmykObj) throw new Error('Invalid CMYK format');
        const rgbObj = cmykToRgb(cmykObj);
        const hexVal = rgbToHex(rgbObj);
        const rgbaVal = rgbToRgba(rgbObj, 1);
        const argbVal = rgbToArgb(rgbObj, 1);
        const hslObj = rgbToHsl(rgbObj);
        setFormats({
          hex: hexVal,
          rgb: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          rgba: `rgba(${rgbaVal.r}, ${rgbaVal.g}, ${rgbaVal.b}, ${rgbaVal.a})`,
          argb: argbVal,
          hsl: `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`,
          cmyk: val
        });
      } else {
        setError('Invalid input. Enter a valid HEX, RGB, RGBA, ARGB, HSL, or CMYK color.');
        setFormats({ hex: '', rgb: '', rgba: '', argb: '', hsl: '', cmyk: '' });
      }
    } catch (e) {
      setError(e.message);
      setFormats({ hex: '', rgb: '', rgba: '', argb: '', hsl: '', cmyk: '' });
    }
  }, [input]);

  function parseRgbaStringToObject(str) {
    const m = str.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*\.?\d+)\s*)?\)/i);
    if (!m) return null;
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] !== undefined ? Number(m[4]) : 1,
    };
  }

  const copyText = (text) => navigator.clipboard.writeText(text);

  const toolSchema = generateToolSchema({
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, RGBA, ARGB, HSL, and CMYK formats easily online.',
    url: '/it/color-converter'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Color Converter</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert colors between HEX, RGB, RGBA, ARGB, HSL, and CMYK formats easily online.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Tool Interface */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side: Input + outputs */}
          <div>
            <label htmlFor="color-input" className="block text-sm font-medium mb-2">
              Enter color (HEX, RGB, RGBA, ARGB, HSL, CMYK)
            </label>
            <input
              id="color-input"
              type="text"
              placeholder="e.g. #3498DB, rgba(52,152,219,0.5), #803498DB, rgb(52, 152, 219), hsl(204, 70%, 53%), cmyk(76%, 31%, 0%, 14%)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 border border-input rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {error && (
              <p className="mt-2 text-destructive text-sm bg-destructive/10 p-2 rounded border border-destructive/20">
                {error}
              </p>
            )}

            <div className="mt-6 space-y-4">
              {['hex', 'rgb', 'rgba', 'argb', 'hsl', 'cmyk'].map((format) => (
                <div key={format} className="flex items-center gap-2">
                  <span className="font-mono w-16 uppercase">{format}:</span>
                  <span className="flex-1 font-mono text-foreground">{formats[format]}</span>
                  {formats[format] && (
                    <button
                      onClick={() => copyText(formats[format])}
                      className="p-2 hover:bg-accent rounded"
                      title={`Copy ${format}`}
                      type="button"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Preview + color picker */}
          <div>
            <label className="block text-sm font-medium mb-2">Preview & Picker</label>
            <div
              className="w-full h-40 rounded-lg border border-input mb-4"
              style={{ backgroundColor: formats.hex || '#fff' }}
            />

            <RgbaColorPicker
              color={parseRgbaStringToObject(input) || { r: 52, g: 152, b: 219, a: 1 }}
              onChange={(color) => {
                const rgbaStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${parseFloat(color.a.toFixed(2))})`;
                setInput(rgbaStr);
              }}
              className="rounded-lg"
            />
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
