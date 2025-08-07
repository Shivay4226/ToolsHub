import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateSchema(type, data) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return JSON.stringify(baseSchema);
}

export function generateToolSchema(tool) {
  return generateSchema("SoftwareApplication", {
    "name": tool.title,
    "description": tool.description,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "url": `${typeof window !== 'undefined' ? window.location.origin : ''}${tool.url}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  });
}

export function generateFAQSchema(faqs) {
  return generateSchema("FAQPage", {
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}