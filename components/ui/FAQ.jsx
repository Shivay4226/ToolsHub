'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-lg font-semibold p-6 border-b border-border">
        Frequently Asked Questions
      </h3>
      <div className="divide-y divide-border">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 hover:bg-accent/30 transition-colors">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left group"
              aria-expanded={openIndex === index}
              aria-controls={`faq-${index}`}
            >
              <h4 className="text-md font-medium text-foreground pr-4 group-hover:text-primary transition-colors">
                {faq.question}
              </h4>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div 
                id={`faq-${index}`}
                className="mt-3 text-muted-foreground transition-all duration-200 ease-in-out"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}