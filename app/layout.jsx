import { Public_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Configure the Public Sans font with different weights and subsets
const publicSans = Public_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
});

export const metadata = {
  title: {
    default: 'ToolsHub - Free Online Tools for IT, Finance, Education & More',
    template: '%s | ToolsHub'
  },
  description: 'Discover 100+ free online tools for IT professionals, developers, students, and businesses. Fast, reliable tools for calculations, conversions, and productivity.',
  keywords: 'online tools, free tools, calculators, converters, IT tools, finance tools, developer tools',
  authors: [{ name: 'ToolsHub' }],
  creator: 'ToolsHub',
  publisher: 'ToolsHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://toolshub.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${publicSans.variable} font-sans`}>
      <head>
        <link rel="canonical" href="https://toolshub.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark')
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-200">
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}