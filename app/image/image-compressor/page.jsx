'use client';

import { useState } from 'react';
import { Trash2, Download, RefreshCw, AlertCircle } from 'lucide-react';
import ImageCompressor from 'browser-image-compression';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: 'How does image compression work?',
    answer: 'It reduces file size while maintaining quality using lossy or lossless techniques.'
  },
  {
    question: 'Can I compress multiple images at once?',
    answer: 'Yes, upload multiple images and download as a ZIP file.'
  },
  {
    question: 'Will the image quality decrease?',
    answer: 'Minimal quality loss occurs, depending on compression level.'
  }
];

export default function ImageCompressorTool() {
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (event) => {
    setError('');
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;
    setFiles(selectedFiles);

    setLoading(true);
    try {
      const compressed = await Promise.all(
        selectedFiles.map(async (file) => {
          const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          const compressedFile = await ImageCompressor(file, options);
          return { original: file, compressed: compressedFile };
        })
      );
      setCompressedFiles(compressed);
    } catch (err) {
      console.error(err);
      setError('Error compressing images. Try again.');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (compressedFiles.length === 1) {
      saveAs(compressedFiles[0].compressed, compressedFiles[0].compressed.name);
    } else if (compressedFiles.length > 1) {
      const zip = new JSZip();
      compressedFiles.forEach(({ compressed }) => {
        zip.file(compressed.name, compressed);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'compressed-images.zip');
    }
  };

  const handleRemove = (index) => {
    const updatedFiles = [...files];
    const updatedCompressed = [...compressedFiles];
    updatedFiles.splice(index, 1);
    updatedCompressed.splice(index, 1);
    setFiles(updatedFiles);
    setCompressedFiles(updatedCompressed);
  };

  const toolSchema = generateToolSchema({
    title: 'Image Compressor',
    description: 'Compress single or multiple images with preview and download.',
    url: '/tools/image-compressor'
  });
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Image Compressor</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Drag and drop images or click to select. Preview compression before downloading.
          </p>
        </div>

        <AdBanner position="top" className="mb-10" />

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col gap-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
            className="border border-input rounded-md p-4 cursor-pointer"
          />

          {error && (
            <div className="flex items-center gap-2 text-destructive bg-destructive/20 border border-destructive/50 rounded-md p-3 text-sm font-semibold">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <RefreshCw className="animate-spin" /> Compressing images...
            </div>
          )}

          {compressedFiles.length > 0 && (
            <>
              <div className="space-y-6">
                {compressedFiles.map(({ original, compressed }, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-border rounded-md">
                    <div className="flex-1">
                      <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={URL.createObjectURL(original)} alt="Original" />}
                        itemTwo={<ReactCompareSliderImage src={URL.createObjectURL(compressed)} alt="Compressed" />}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2 md:w-64">
                      <p className="text-sm font-mono">
                        Original: {(original.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-sm font-mono">
                        Compressed: {(compressed.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={() => handleRemove(index)}
                        className="flex items-center gap-2 text-destructive px-3 py-1 rounded-md border border-destructive/50 hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDownload}
                className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download size={18} className="inline mr-2" />
                Download {compressedFiles.length > 1 ? 'All as ZIP' : 'Image'}
              </button>
            </>
          )}
        </div>

        <AdBanner position="middle" className="my-10" />
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
