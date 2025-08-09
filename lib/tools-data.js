export const categories = [
  {
    id: 'it',
    name: 'IT',
    description: 'Essential tools for IT professionals and developers',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial calculators and planning tools',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Development utilities and code helpers',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning and academic calculation tools',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital marketing and SEO utilities',
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Health and fitness calculators',
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Image editing, compression, and conversion utilities',
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'PDF editing, conversion, and management utilities',
  }
];

export const tools = {
  it: [
    {
      id: 'ip-finder',
      title: 'IP Address Finder',
      description: 'Find your public IP address and location information',
      url: '/it/ip-finder',
      featured: true,
      tags: ['ip', 'network', 'location', 'geolocation', 'address']
    },
    {
      id: 'json-formatter',
      title: 'JSON Formatter',
      description: 'Format, validate and beautify JSON data',
      url: '/it/json-formatter',
      featured: true,
      tags: ['json', 'formatter', 'beautifier', 'validator']
    },
    {
      id: 'base64-encoder',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      url: '/it/base64tool',
      featured: false,
      tags: ['base64', 'encoder', 'decoder', 'convert']
    },
    {
      id: 'regex-tester',
      title: 'Regex Tester',
      description: 'Test and validate regular expressions',
      url: '/it/regex-tester',
      featured: false,
      tags: ['regex', 'pattern', 'validator', 'tester']
    },
    {
      id: 'dns-checker',
      title: 'DNS Checker',
      description: 'Check DNS records for a domain',
      url: '/it/dns-checker',
      featured: false,
      tags: ['dns', 'domain', 'records', 'lookup']
    },
    {
      id: 'domain-availability',
      title: 'Domain Availability Checker',
      description: 'Check if a domain name is available',
      url: '/it/domain-availability',
      featured: false,
      tags: ['domain', 'availability', 'check', 'register']
    }
  ],
  finance: [
    {
      "id": "emi-calculator",
      "title": "EMI Calculator",
      "description": "Calculate Equated Monthly Installments for loans",
      "url": "/finance/emi-calculator",
      "featured": true,
      "tags": ["emi", "loan", "calculator", "finance"]
    },
    {
      "id": "sip-calculator",
      "title": "SIP Calculator",
      "description": "Calculate returns on Systematic Investment Plans",
      "url": "/finance/sip-calculator",
      "featured": true,
      "tags": ["sip", "investment", "returns", "calculator"]
    },
    {
      "id": "loan-eligibility",
      "title": "Loan Eligibility Checker",
      "description": "Check your eligibility for different types of loans",
      "url": "/finance/loan-eligibility",
      "featured": false,
      "tags": ["loan", "eligibility", "check", "finance"]
    },
    {
      "id": "currency-converter",
      "title": "Currency Converter",
      "description": "Convert between different currencies",
      "url": "/finance/currency-converter",
      "featured": false,
      "tags": ["currency", "convert", "money", "exchange"]
    },
    {
      "id": "retirement-calculator",
      "title": "Retirement Calculator",
      "description": "Estimate how much you need to save to retire comfortably.",
      "url": "/finance/retirement-calculator",
      "featured": false,
      "tags": ["retirement", "savings", "calculator", "finance"]
    },
    {
      "id": "budget-planner",
      "title": "Budget Planner",
      "description": "Create and manage your monthly budget easily.",
      "url": "/finance/budget-planner",
      "featured": false,
      "tags": ["budget", "planner", "expenses", "finance"]
    },
    {
      "id": "emi-foreclosure-calculator",
      "title": "EMI Foreclosure Calculator",
      "description": "Calculate savings by foreclosing your loan early.",
      "url": "/finance/emi-foreclosure-calculator",
      "featured": false,
      "tags": ["emi", "foreclosure", "loan", "calculator"]
    },
    {
      "id": "tax-calculator",
      "title": "Tax Calculator (Income Tax)",
      "description": "Calculate your income tax liability for the current financial year.",
      "url": "/finance/tax-calculator",
      "featured": false,
      "tags": ["tax", "income", "calculator", "finance"]
    },
    {
      "id": "debt-to-income-calculator",
      "title": "Debt-to-Income Ratio Calculator",
      "description": "Measure your debt burden compared to income to evaluate creditworthiness.",
      "url": "/finance/debt-to-income-calculator",
      "featured": false,
      "tags": ["debt", "income", "ratio", "finance"]
    },
    {
      "id": "investment-portfolio-tracker",
      "title": "Investment Portfolio Tracker",
      "description": "Track your investments across mutual funds, stocks, and bonds.",
      "url": "/finance/investment-portfolio-tracker",
      "featured": false,
      "tags": ["investment", "portfolio", "tracker", "finance"]
    },
    {
      "id": "compound-interest-calculator",
      "title": "Compound Interest Calculator",
      "description": "Calculate compound interest for savings and investments.",
      "url": "/finance/compound-interest-calculator",
      "featured": false,
      "tags": ["interest", "compound", "calculator", "finance"]
    },
    {
      "id": "credit-score-checker",
      "title": "Credit Score Checker",
      "description": "Check your credit score and understand factors affecting it.",
      "url": "/finance/credit-score-checker",
      "featured": false,
      "tags": ["credit", "score", "finance", "check"]
    },
    {
      "id": "financial-goal-planner",
      "title": "Financial Goal Planner",
      "description": "Plan and track progress towards financial goals like buying a house or car.",
      "url": "/finance/financial-goal-planner",
      "featured": false,
      "tags": ["goal", "planner", "finance", "savings"]
    },
    {
      "id": "savings-goal-calculator",
      "title": "Savings Goal Calculator",
      "description": "Calculate how much to save monthly to reach your savings goal by a target date.",
      "url": "/finance/savings-goal-calculator",
      "featured": false,
      "tags": ["savings", "goal", "calculator", "finance"]
    }
  ],
  developer: [
    {
      id: 'color-picker',
      title: 'Color Picker',
      description: 'Pick colors and get hex, rgb, hsl values',
      url: '/developer/color-picker',
      featured: true,
      tags: ['color', 'picker', 'hex', 'rgb', 'hsl']
    },
    {
      id: 'rgb-to-hex',
      title: 'RGB to HEX Converter',
      description: 'Convert RGB color values to HEX format instantly',
      url: '/developer/rgb-to-hex',
      featured: true,
      tags: ['rgb', 'hex', 'color', 'converter']
    },
    {
      id: 'hex-to-rgb',
      title: 'HEX to RGB Converter',
      description: 'Convert HEX color values to RGB format instantly',
      url: '/developer/hex-to-rgb',
      featured: true,
      tags: ['hex', 'rgb', 'color', 'converter']
    },
    {
      id: 'rgb-to-hsl',
      title: 'RGB to HSL Converter',
      description: 'Convert RGB color values to HSL format',
      url: '/developer/rgb-to-hsl',
      featured: true,
      tags: ['rgb', 'hsl', 'color', 'converter']
    },
    {
      id: 'hsl-to-rgb',
      title: 'HSL to RGB Converter',
      description: 'Convert HSL color values to RGB format',
      url: '/developer/hsl-to-rgb',
      featured: true,
      tags: ['hsl', 'rgb', 'color', 'converter']
    },
    {
      id: 'hex-to-hsl',
      title: 'HEX to HSL Converter',
      description: 'Convert HEX color values to HSL format',
      url: '/developer/hex-to-hsl',
      featured: false,
      tags: ['hex', 'hsl', 'color', 'converter']
    },
    {
      id: 'hsl-to-hex',
      title: 'HSL to HEX Converter',
      description: 'Convert HSL color values to HEX format',
      url: '/developer/hsl-to-hex',
      featured: false,
      tags: ['hsl', 'hex', 'color', 'converter']
    },
    {
      id: 'rgb-to-cmyk',
      title: 'RGB to CMYK Converter',
      description: 'Convert RGB color values to CMYK format',
      url: '/developer/rgb-to-cmyk',
      featured: false,
      tags: ['rgb', 'cmyk', 'color', 'converter']
    },
    {
      id: 'cmyk-to-rgb',
      title: 'CMYK to RGB Converter',
      description: 'Convert CMYK color values to RGB format',
      url: '/developer/cmyk-to-rgb',
      featured: false,
      tags: ['cmyk', 'rgb', 'color', 'converter']
    },
    {
      id: 'qr-generator',
      title: 'QR Code Generator',
      description: 'Generate QR codes for text, URLs, and more',
      url: '/developer/qr-generator',
      featured: true,
      tags: ['qr', 'code', 'generator', 'barcode']
    },
    {
      id: 'qr-scanner',
      title: 'QR Code Scanner',
      description: 'Scan QR codes from camera or image',
      url: '/developer/qr-scanner',
      featured: false,
      tags: ['qr', 'scanner', 'code', 'reader']
    },
    {
      id: 'json-validator',
      title: 'JSON Validator',
      description: 'Validate JSON data structure and syntax',
      url: '/developer/json-validator',
      featured: false,
      tags: ['json', 'validate', 'syntax', 'check']
    },
    {
      id: 'html-css-js-minifier',
      title: 'HTML/CSS/JS Minifier & Beautifier',
      description: 'Minify or beautify HTML, CSS, and JavaScript code',
      url: '/developer/html-css-js-minifier',
      featured: false,
      tags: ['html', 'css', 'javascript', 'minifier', 'beautifier']
    }
  ],
  education: [
    {
      id: 'gpa-calculator',
      title: 'GPA Calculator',
      description: 'Calculate your Grade Point Average',
      url: '/education/gpa-calculator',
      featured: true,
      tags: ['gpa', 'grade', 'average', 'calculator']
    },
    {
      id: 'percentage-calculator',
      title: 'Percentage Calculator',
      description: 'Calculate percentages and percentage changes',
      url: '/education/percentage-calculator',
      featured: true,
      tags: ['percentage', 'calculator', 'math', 'education']
    },
    {
      id: 'word-counter',
      title: 'Word & Character Counter',
      description: 'Count words and characters in text',
      url: '/education/word-counter',
      featured: false,
      tags: ['word', 'character', 'counter', 'text']
    },
    {
      id: 'study-timer',
      title: 'Study Timer',
      description: 'Pomodoro-style timer to improve study focus',
      url: '/education/study-timer',
      featured: false,
      tags: ['timer', 'pomodoro', 'study', 'focus']
    },
    {
      id: 'citation-generator',
      title: 'Citation Generator',
      description: 'Generate citations in MLA, APA, and Chicago formats',
      url: '/education/citation-generator',
      featured: false,
      tags: ['citation', 'generator', 'mla', 'apa', 'chicago']
    },
    {
      id: 'periodic-table',
      title: 'Periodic Table',
      description: 'Interactive periodic table of elements',
      url: '/education/periodic-table',
      featured: false,
      tags: ['periodic', 'table', 'elements', 'chemistry']
    },
    {
      id: 'math-formula-sheet',
      title: 'Math Formula Sheet',
      description: 'Quick reference to common math formulas',
      url: '/education/math-formula-sheet',
      featured: false,
      tags: ['math', 'formulas', 'reference', 'education']
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Create and practice flashcards for study',
      url: '/education/flashcards',
      featured: false,
      tags: ['flashcards', 'study', 'memorization', 'education']
    },
    {
      id: 'language-translator',
      title: 'Language Translator',
      description: 'Translate words and sentences between languages',
      url: '/education/language-translator',
      featured: false,
      tags: ['language', 'translator', 'translation', 'education']
    },
    {
      id: 'plagiarism-checker',
      title: 'Plagiarism Checker',
      description: 'Check text for plagiarism and originality',
      url: '/education/plagiarism-checker',
      featured: false,
      tags: ['plagiarism', 'checker', 'education', 'writing']
    }
  ],
  marketing: [
    {
      id: 'keyword-density',
      title: 'Keyword Density Checker',
      description: 'Check keyword density in your content',
      url: '/marketing/keyword-density',
      featured: true,
      tags: ['keyword', 'density', 'seo', 'content']
    },
    {
      id: 'meta-tag-analyzer',
      title: 'Meta Tag Analyzer',
      description: 'Analyze meta tags for SEO optimization',
      url: '/marketing/meta-tag-analyzer',
      featured: false,
      tags: ['meta', 'tag', 'seo', 'analyzer']
    },
    {
      id: 'broken-link-checker',
      title: 'Broken Link Checker',
      description: 'Check your website for broken links',
      url: '/marketing/broken-link-checker',
      featured: false,
      tags: ['broken', 'link', 'seo', 'website']
    },
    {
      id: 'backlink-checker',
      title: 'Backlink Checker',
      description: 'Analyze backlinks to your website and check their quality',
      url: '/marketing/backlink-checker',
      featured: false,
      tags: ['backlink', 'seo', 'website', 'analysis']
    },
    {
      id: 'page-speed-test',
      title: 'Page Speed Test',
      description: 'Test your website’s loading speed and performance',
      url: '/marketing/page-speed-test',
      featured: false,
      tags: ['page speed', 'performance', 'seo', 'website']
    },
    {
      id: 'content-planner',
      title: 'Content Planner',
      description: 'Plan and schedule your marketing content calendar',
      url: '/marketing/content-planner',
      featured: false,
      tags: ['content', 'planner', 'marketing', 'schedule']
    },
    {
      id: 'social-media-analyzer',
      title: 'Social Media Analyzer',
      description: 'Analyze your social media engagement and growth metrics',
      url: '/marketing/social-media-analyzer',
      featured: false,
      tags: ['social media', 'analytics', 'engagement', 'marketing']
    },
    {
      id: 'email-subject-tester',
      title: 'Email Subject Tester',
      description: 'Test and improve your email subject lines for better open rates',
      url: '/marketing/email-subject-tester',
      featured: false,
      tags: ['email', 'subject', 'tester', 'marketing']
    },
    {
      id: 'ad-copy-generator',
      title: 'Ad Copy Generator',
      description: 'Generate catchy ad copy for your marketing campaigns',
      url: '/marketing/ad-copy-generator',
      featured: false,
      tags: ['ad copy', 'generator', 'marketing', 'content']
    },
    {
      id: 'hashtag-generator',
      title: 'Hashtag Generator',
      description: 'Generate relevant hashtags for your social media posts',
      url: '/marketing/hashtag-generator',
      featured: false,
      tags: ['hashtag', 'generator', 'social media', 'marketing']
    }
  ],
  health: [
    {
      id: 'bmi-calculator',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index',
      url: '/health/bmi-calculator',
      featured: true,
      tags: ['bmi', 'body mass index', 'health', 'fitness']
    },
    {
      id: 'bmr-calculator',
      title: 'BMR Calculator',
      description: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs',
      url: '/health/bmr-calculator',
      featured: false,
      tags: ['bmr', 'calories', 'health', 'metabolism']
    },
    {
      id: 'calorie-tracker',
      title: 'Calorie Tracker',
      description: 'Track your daily calorie intake and expenditure',
      url: '/health/calorie-tracker',
      featured: false,
      tags: ['calorie', 'tracker', 'health', 'nutrition']
    },
    {
      id: 'water-intake-calculator',
      title: 'Water Intake Calculator',
      description: 'Calculate recommended daily water intake based on your weight and activity',
      url: '/health/water-intake-calculator',
      featured: false,
      tags: ['water', 'hydration', 'health', 'calculator']
    },
    {
      id: 'heart-rate-zone-calculator',
      title: 'Heart Rate Zone Calculator',
      description: 'Calculate your optimal heart rate zones for exercise',
      url: '/health/heart-rate-zone-calculator',
      featured: false,
      tags: ['heart rate', 'fitness', 'exercise', 'health']
    },
    {
      id: 'body-fat-calculator',
      title: 'Body Fat Percentage Calculator',
      description: 'Estimate your body fat percentage using simple measurements',
      url: '/health/body-fat-calculator',
      featured: false,
      tags: ['body fat', 'health', 'fitness', 'calculator']
    },
    {
      id: 'pregnancy-due-date-calculator',
      title: 'Pregnancy Due Date Calculator',
      description: 'Estimate your baby’s due date based on your last menstrual period',
      url: '/health/pregnancy-due-date-calculator',
      featured: false,
      tags: ['pregnancy', 'due date', 'health', 'calculator']
    },
    {
      id: 'sleep-tracker',
      title: 'Sleep Tracker',
      description: 'Track and analyze your sleep patterns for better rest',
      url: '/health/sleep-tracker',
      featured: false,
      tags: ['sleep', 'tracker', 'health', 'wellness']
    }
  ],
  image: [
    {
      id: 'image-editor',
      title: 'Image Editor',
      description: 'Compress, resize, crop, and adjust images',
      url: '/image/image-editor',
      featured: true,
      tags: ['image', 'editor', 'compress', 'resize', 'crop', 'adjust']
    },
    {
      id: 'background-remover',
      title: 'Image Background Remover',
      description: 'Remove background from images automatically',
      url: '/image/background-remover',
      featured: false,
      tags: ['image', 'background', 'remove', 'transparent']
    },
    {
      id: 'image-to-text',
      title: 'Image to Text (OCR)',
      description: 'Extract text from images using OCR',
      url: '/image/image-to-text',
      featured: false,
      tags: ['image', 'text', 'ocr', 'extract']
    },
    {
      id: 'image-resizer',
      title: 'Image Resizer & Cropper',
      description: 'Resize and crop images online',
      url: '/image/image-resizer',
      featured: false,
      tags: ['image', 'resize', 'crop', 'dimensions']
    }
  ],
  pdf: [
    {
      id: 'pdf-to-word',
      title: 'PDF to Word Converter',
      description: 'Convert PDF documents to Word format',
      url: '/pdf/pdf-to-word',
      featured: true,
      tags: ['pdf', 'word', 'converter', 'document']
    },
    {
      id: 'pdf-merger',
      title: 'PDF Merger',
      description: 'Merge multiple PDFs into one',
      url: '/pdf/pdf-merger',
      featured: false,
      tags: ['pdf', 'merge', 'combine', 'document']
    },
    {
      id: 'pdf-splitter',
      title: 'PDF Splitter',
      description: 'Split a PDF into multiple files',
      url: '/pdf/pdf-splitter',
      featured: false,
      tags: ['pdf', 'split', 'pages', 'document']
    },
    {
      id: 'pdf-compressor',
      title: 'PDF Compressor',
      description: 'Reduce the file size of PDF documents',
      url: '/pdf/pdf-compressor',
      featured: false,
      tags: ['pdf', 'compress', 'reduce', 'size']
    },
    {
      id: 'pdf-watermark-remover',
      title: 'Remove Watermark from PDF',
      description: 'Remove watermarks from PDF files',
      url: '/pdf/pdf-watermark-remover',
      featured: false,
      tags: ['pdf', 'watermark', 'remove', 'clean']
    }
  ]
};

export function getFeaturedTools() {
  const featured = [];
  Object.keys(tools).forEach(category => {
    tools[category].forEach(tool => {
      if (tool.featured) {
        featured.push({ ...tool, category });
      }
    });
  });
  return featured;
}

export function getToolsByCategory(categoryId) {
  return tools[categoryId] || [];
}

export function getCategoryById(categoryId) {
  return categories.find(category => category.id === categoryId);
}

// Get all tools as a flat array with category information
export function getAllTools() {
  const allTools = [];
  Object.keys(tools).forEach(categoryId => {
    const category = getCategoryById(categoryId);
    tools[categoryId].forEach(tool => {
      allTools.push({
        ...tool,
        category: categoryId,
        categoryName: category?.name || categoryId
      });
    });
  });
  return allTools;
}

// Search tools by query (title, description, tags)
export function searchTools(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchQuery = query.toLowerCase().trim();
  const allTools = getAllTools();

  return allTools.filter(tool => {
    // Search in title
    if (tool.title.toLowerCase().includes(searchQuery)) {
      return true;
    }

    // Search in description
    if (tool.description.toLowerCase().includes(searchQuery)) {
      return true;
    }

    // Search in tags
    if (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchQuery))) {
      return true;
    }

    // Search in category name
    if (tool.categoryName.toLowerCase().includes(searchQuery)) {
      return true;
    }

    return false;
  }).slice(0, 10); // Limit to 10 results for performance
}
