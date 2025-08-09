import Link from 'next/link';
import { categories, getFeaturedTools } from '@/lib/tools-data';
import ToolCard from '@/components/ui/ToolCard';
import AdBanner from '@/components/ads/AdBanner';
import { generateSchema } from '@/lib/utils';

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  const websiteSchema = generateSchema('WebSite', {
    name: 'ToolsHub',
    alternateName: 'Free Online Tools',
    url: 'https://toolshub.com',
    description: 'Free online tools for IT, Finance, Education, Marketing, Health and Development',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolshub.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteSchema }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Free Online Tools
            <span className="block text-primary">for Everyone</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover powerful, fast, and completely free online tools for IT professionals, 
            developers, students, and businesses. No registration required.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/all-tools" className="bg-primary-gradient text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-primary-glow hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              <span>Explore All Tools</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="#categories" className="bg-white dark:bg-card text-primary border-2 border-primary/20 dark:border-primary/30 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/40 dark:hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
              Browse Categories
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="bg-white dark:bg-card px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/40 transition-all duration-300">
              <span className="text-foreground dark:text-card-foreground font-medium flex items-center gap-2">
                <span className="w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                100% Free
              </span>
            </div>
            <div className="bg-white dark:bg-card px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/40 transition-all duration-300">
              <span className="text-foreground dark:text-card-foreground font-medium flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-xs">⚡</span>
                Lightning Fast
              </span>
            </div>
            <div className="bg-white dark:bg-card px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/40 transition-all duration-300">
              <span className="text-foreground dark:text-card-foreground font-medium flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">🔒</span>
                No Registration
              </span>
            </div>
          </div>
        </section>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-12" />

        {/* Categories Grid */}
        <section id="categories" className="py-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/${category.id}`} className="group">
                <div className="bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center hover:shadow-lg dark:hover:shadow-gray-900/40 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-600 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground dark:text-card-foreground mb-4">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="mr-2">Explore Tools</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Most Popular Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most used tools, trusted by thousands of users daily
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} category={tool.category} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/all-tools" 
              className="bg-primary-gradient text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-primary-glow hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>View All Tools</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Ad Banner */}
        <AdBanner position="middle" className="my-12" />

        {/* Features Section */}
        <section className="py-12 mb-5 bg-card rounded-xl border border-border">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Why Choose ToolsHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  All tools run in your browser for instant results. No server delays, no waiting.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your data stays on your device. We don't store or track your information.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Mobile Friendly</h3>
                <p className="text-muted-foreground">
                  Perfect responsive design that works on all devices, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}