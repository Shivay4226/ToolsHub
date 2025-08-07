export const categories = [
  {
    id: 'it',
    name: 'IT Tools',
    description: 'Essential tools for IT professionals and developers',
    icon: '💻'
  },
  {
    id: 'finance',
    name: 'Finance Tools',
    description: 'Financial calculators and planning tools',
    icon: '💰'
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Development utilities and code helpers',
    icon: '⚡'
  },
  {
    id: 'education',
    name: 'Education Tools',
    description: 'Learning and academic calculation tools',
    icon: '📚'
  },
  {
    id: 'marketing',
    name: 'Marketing Tools',
    description: 'Digital marketing and SEO utilities',
    icon: '📈'
  },
  {
    id: 'health',
    name: 'Health Tools',
    description: 'Health and fitness calculators',
    icon: '❤️'
  }
];

export const tools = {
  it: [
    {
      id: 'ip-finder',
      title: 'IP Address Finder',
      description: 'Find your public IP address and location information',
      url: '/it/ip-finder',
      featured: true
    },
    {
      id: 'json-formatter',
      title: 'JSON Formatter',
      description: 'Format, validate and beautify JSON data',
      url: '/it/json-formatter',
      featured: true
    },
    {
      id: 'base64-encoder',
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings',
      url: '/it/base64tool',
      featured: false
    },
    {
      id: 'regex-tester',
      title: 'Regex Tester',
      description: 'Test and validate regular expressions',
      url: '/it/regex-tester',
      featured: false
    }
  ],
  finance: [
    {
      id: 'emi-calculator',
      title: 'EMI Calculator',
      description: 'Calculate Equated Monthly Installments for loans',
      url: '/finance/emi-calculator',
      featured: true
    },
    {
      id: 'sip-calculator',
      title: 'SIP Calculator',
      description: 'Calculate returns on Systematic Investment Plans',
      url: '/finance/sip-calculator',
      featured: true
    },
    {
      id: 'loan-eligibility',
      title: 'Loan Eligibility Checker',
      description: 'Check your eligibility for different types of loans',
      url: '/finance/loan-eligibility',
      featured: false
    },
    {
      id: 'currency-converter',
      title: 'Currency Converter',
      description: 'Convert between different currencies',
      url: '/finance/currency-converter',
      featured: false
    }
  ],
  developer: [
    {
      id: 'color-picker',
      title: 'Color Picker',
      description: 'Pick colors and get hex, rgb, hsl values',
      url: '/developer/color-picker',
      featured: true
    },
    {
      id: 'qr-generator',
      title: 'QR Code Generator',
      description: 'Generate QR codes for text, URLs, and more',
      url: '/developer/qr-generator',
      featured: true
    }
  ],
  education: [
    {
      id: 'gpa-calculator',
      title: 'GPA Calculator',
      description: 'Calculate your Grade Point Average',
      url: '/education/gpa-calculator',
      featured: true
    },
    {
      id: 'percentage-calculator',
      title: 'Percentage Calculator',
      description: 'Calculate percentages and percentage changes',
      url: '/education/percentage-calculator',
      featured: true
    }
  ],
  marketing: [
    {
      id: 'keyword-density',
      title: 'Keyword Density Checker',
      description: 'Check keyword density in your content',
      url: '/marketing/keyword-density',
      featured: true
    }
  ],
  health: [
    {
      id: 'bmi-calculator',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index',
      url: '/health/bmi-calculator',
      featured: true
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
  return categories.find(cat => cat.id === categoryId);
}