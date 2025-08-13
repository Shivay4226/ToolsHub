export const categories = [
  {
    id: 'convert',
    name: 'Convert',
    description: 'Unit and measurement conversion tools',
    icon: 'KeyboardMusic' 
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'PDF editing, conversion, and management utilities',
    icon: 'FileText'
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Image editing, compression, and conversion utilities',
    icon: 'Image'
  },
  {
    id: 'video',
    name: 'Video',
    description: 'Video editing, conversion, and compression tools',
    icon: 'Video'
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Audio editing, conversion, and transcription tools',
    icon: 'Mic'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial calculators and planning tools',
    icon: 'DollarSign'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Development utilities and code helpers',
    icon: 'Code'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning and academic calculation tools',
    icon: 'Book'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital marketing and SEO utilities',
    icon: 'Megaphone'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Health and fitness calculators',
    icon: 'HeartPulse'
  },
];

export const tools = {
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
    },
    {
      id: 'ip-finder',
      title: 'IP Address Finder',
      description: 'Find your public IP address and location information',
      url: '/developer/ip-finder',
      featured: true,
      tags: ['ip', 'network', 'location', 'geolocation', 'address']
    },
    {
      id: 'json-formatter',
      title: 'JSON Formatter',
      description: 'Format, validate and beautify JSON data',
      url: '/developer/json-formatter',
      featured: true,
      tags: ['json', 'formatter', 'beautifier', 'validator']
    },
    {
      id: 'base64-encoder',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      url: '/developer/base64tool',
      featured: true,
      tags: ['base64', 'encoder', 'decoder', 'convert']
    },
    {
      id: 'regex-tester',
      title: 'Regex Tester',
      description: 'Test and validate regular expressions',
      url: '/developer/regex-tester',
      featured: true,
      tags: ['regex', 'pattern', 'validator', 'tester']
    },
    {
      id: 'dns-checker',
      title: 'DNS Checker',
      description: 'Check DNS records for a domain',
      url: '/developer/dns-checker',
      featured: false,
      tags: ['dns', 'domain', 'records', 'lookup']
    },
    {
      id: 'domain-availability',
      title: 'Domain Availability Checker',
      description: 'Check if a domain name is available',
      url: '/developer/domain-availability',
      featured: false,
      tags: ['domain', 'availability', 'check', 'register']
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
      id: 'word-character-counter',
      title: 'Word & Character Counter',
      description: 'Count words, characters, and spaces in real-time as you type or paste text.',
      url: '/education/word-character-counter',
      featured: true,
      tags: ['word counter', 'character counter', 'text analysis', 'writing', 'editor', 'typing tool'],
      category: 'IT Tools'
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
      id: 'sleep-tracker',
      title: 'Sleep Tracker',
      description: 'Track and analyze your sleep patterns for better rest',
      url: '/health/sleep-tracker',
      featured: false,
      tags: ['sleep', 'tracker', 'health', 'wellness']
    }
  ],
  convert: [
    {
      id: 'unit-converter',
      title: 'Unit Converter',
      description: 'Convert between various units of measurement',
      url: '/convert/unit-converter',
      featured: true,
      tags: ['unit', 'converter', 'measurement', 'convert']
    },
    {
      id: 'currency-converter',
      title: 'Currency Converter',
      description: 'Convert between different currencies',
      url: '/convert/currency-converter',
      featured: true,
      tags: ['currency', 'convert', 'money', 'exchange']
    },
    {
      id: 'temperature-converter',
      title: 'Temperature Converter',
      description: 'Convert between Celsius, Fahrenheit, and Kelvin',
      url: '/convert/temperature-converter',
      featured: false,
      tags: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin']
    },
    {
      id: 'length-converter',
      title: 'Length Converter',
      description: 'Convert between meters, kilometers, miles, and more',
      url: '/convert/length-converter',
      featured: false,
      tags: ['length', 'converter', 'meters', 'miles', 'kilometers']
    },
    {
      id: 'weight-converter',
      title: 'Weight Converter',
      description: 'Convert between grams, kilograms, pounds, and more',
      url: '/convert/weight-converter',
      featured: false,
      tags: ['weight', 'converter', 'grams', 'pounds', 'kilograms']
    },
    {
      id: 'volume-converter',
      title: 'Volume Converter',
      description: 'Convert between liters, milliliters, gallons, and more',
      url: '/convert/volume-converter',
      featured: false,
      tags: ['volume', 'converter', 'liters', 'gallons', 'milliliters']
    },
    {
      id: 'time-converter',
      title: 'Time Converter',
      description: 'Convert between seconds, minutes, hours, and more',
      url: '/convert/time-converter',
      featured: false,
      tags: ['time', 'converter', 'seconds', 'minutes', 'hours']
    },
    {
      id: 'data-storage-converter',
      title: 'Data Storage Converter',
      description: 'Convert between bytes, kilobytes, megabytes, gigabytes, and more',
      url: '/convert/data-storage-converter',
      featured: false,
      tags: ['data', 'storage', 'converter', 'bytes', 'megabytes']
    }
  ],
  pdf: [
    {
      id: 'pdf-to-word',
      title: 'PDF to Word Converter',
      description: 'Convert PDF documents to editable Word format',
      url: '/pdf/pdf-to-word',
      featured: true,
      tags: ['pdf', 'word', 'converter', 'document']
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF Converter',
      description: 'Convert Word documents to PDF format',
      url: '/pdf/word-to-pdf',
      featured: true,
      tags: ['word', 'pdf', 'converter', 'document']
    },
    {
      id: 'pdf-compressor',
      title: 'PDF Compressor',
      description: 'Compress PDF files to reduce file size',
      url: '/pdf/pdf-compressor',
      featured: false,
      tags: ['pdf', 'compressor', 'reduce', 'size']
    },
    {
      id: 'pdf-merger',
      title: 'PDF Merger',
      description: 'Merge multiple PDF files into one',
      url: '/pdf/pdf-merger',
      featured: false,
      tags: ['pdf', 'merge', 'combine', 'files']
    },
    {
      id: 'pdf-splitter',
      title: 'PDF Splitter',
      description: 'Split a PDF file into multiple files',
      url: '/pdf/pdf-splitter',
      featured: false,
      tags: ['pdf', 'split', 'divide', 'files']
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG Converter',
      description: 'Convert PDF pages to JPG images',
      url: '/pdf/pdf-to-jpg',
      featured: false,
      tags: ['pdf', 'jpg', 'converter', 'images']
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF Converter',
      description: 'Convert JPG images to PDF format',
      url: '/pdf/jpg-to-pdf',
      featured: false,
      tags: ['jpg', 'pdf', 'converter', 'images']
    },
    {
      id: 'pdf-password-protector',
      title: 'PDF Password Protector',
      description: 'Add password protection to your PDF files',
      url: '/pdf/pdf-password-protector',
      featured: false,
      tags: ['pdf', 'password', 'protector', 'security']
    },
    {
      id: 'pdf-password-remover',
      title: 'PDF Password Remover',
      description: 'Remove password protection from PDF files',
      url: '/pdf/pdf-password-remover',
      featured: false,
      tags: ['pdf', 'password', 'remover', 'security']
    }
  ],
  image: [
    {
      id: 'image-compressor',
      title: 'Image Compressor',
      description: 'Compress images to reduce file size without losing quality',
      url: '/image/image-compressor',
      featured: true,
      tags: ['image', 'compressor', 'reduce', 'size']
    },
    {
      id: 'image-resizer',
      title: 'Image Resizer',
      description: 'Resize images to custom dimensions',
      url: '/image/image-resizer',
      featured: true,
      tags: ['image', 'resizer', 'dimensions', 'edit']
    },
    {
      id: 'image-to-jpg',
      title: 'Image to JPG Converter',
      description: 'Convert images to JPG format',
      url: '/image/image-to-jpg',
      featured: false,
      tags: ['image', 'jpg', 'converter', 'format']
    },
    {
      id: 'image-to-png',
      title: 'Image to PNG Converter',
      description: 'Convert images to PNG format',
      url: '/image/image-to-png',
      featured: false,
      tags: ['image', 'png', 'converter', 'format']
    },
    {
      id: 'image-to-webp',
      title: 'Image to WebP Converter',
      description: 'Convert images to WebP format for better compression',
      url: '/image/image-to-webp',
      featured: false,
      tags: ['image', 'webp', 'converter', 'compression']
    },
    {
      id: 'webp-to-image',
      title: 'WebP to Image Converter',
      description: 'Convert WebP images to JPG or PNG format',
      url: '/image/webp-to-image',
      featured: false,
      tags: ['webp', 'image', 'converter', 'format']
    },
    {
      id: 'background-remover',
      title: 'Background Remover',
      description: 'Remove backgrounds from images automatically',
      url: '/image/background-remover',
      featured: false,
      tags: ['background', 'remover', 'image', 'edit']
    },
    {
      id: 'meme-generator',
      title: 'Meme Generator',
      description: 'Create funny memes with custom text and images',
      url: '/image/meme-generator',
      featured: false,
      tags: ['meme', 'generator', 'funny', 'images']
    }
  ],
  video: [
    {
      id: 'video-to-gif',
      title: 'Video to GIF Converter',
      description: 'Convert video clips to animated GIFs',
      url: '/video/video-to-gif',
      featured: true,
      tags: ['video', 'gif', 'converter', 'animation']
    },
    {
      id: 'video-compressor',
      title: 'Video Compressor',
      description: 'Compress video files to reduce file size',
      url: '/video/video-compressor',
      featured: false,
      tags: ['video', 'compressor', 'reduce', 'size']
    },
    {
      id: 'video-trimmer',
      title: 'Video Trimmer',
      description: 'Trim and cut video clips to desired length',
      url: '/video/video-trimmer',
      featured: false,
      tags: ['video', 'trimmer', 'cut', 'edit']
    },
    {
      id: 'video-to-mp3',
      title: 'Video to MP3 Converter',
      description: 'Extract audio from video files and convert to MP3 format',
      url: '/video/video-to-mp3',
      featured: false,
      tags: ['video', 'mp3', 'converter', 'audio']
    },
    {
      id: 'youtube-downloader',
      title: 'YouTube Video Downloader',
      description: 'Download videos from YouTube in various formats and resolutions',
      url: '/video/youtube-downloader',
      featured: false,
      tags: ['youtube', 'downloader', 'video', 'download']
    }
  ],
  audio: [
    {
      id: 'audio-to-text',
      title: 'Audio to Text Converter',
      description: 'Transcribe audio files to text format',
      url: '/audio/audio-to-text',
      featured: true,
      tags: ['audio', 'text', 'converter', 'transcribe']
    },
    {
      id: 'audio-trimmer',
      title: 'Audio Trimmer',
      description: 'Trim and cut audio files to desired length',
      url: '/audio/audio-trimmer',
      featured: false,
      tags: ['audio', 'trimmer', 'cut', 'edit']
    },
    {
      id: 'audio-compressor',
      title: 'Audio Compressor',
      description: 'Compress audio files to reduce file size',
      url: '/audio/audio-compressor',
      featured: false,
      tags: ['audio', 'compressor', 'reduce', 'size']
    },
    {
      id: 'mp3-to-wav',
      title: 'MP3 to WAV Converter',
      description: 'Convert MP3 audio files to WAV format',
      url: '/audio/mp3-to-wav',
      featured: false,
      tags: ['mp3', 'wav', 'converter', 'audio']
    },
    {
      id: 'wav-to-mp3',
      title: 'WAV to MP3 Converter',
      description: 'Convert WAV audio files to MP3 format',
      url: '/audio/wav-to-mp3',
      featured: false,
      tags: ['wav', 'mp3', 'converter', 'audio']
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
