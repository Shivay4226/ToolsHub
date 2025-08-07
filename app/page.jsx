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
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-card px-6 py-3 rounded-full shadow-sm border">
              <span className="text-primary font-semibold">✓ 100% Free</span>
            </div>
            <div className="bg-card px-6 py-3 rounded-full shadow-sm border">
              <span className="text-primary font-semibold">⚡ Lightning Fast</span>
            </div>
            <div className="bg-card px-6 py-3 rounded-full shadow-sm border">
              <span className="text-primary font-semibold">🔒 No Registration</span>
            </div>
          </div>
        </section>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-12" />

        {/* Categories Grid */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/${category.id}`} className="group">
                <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all group-hover:border-primary/50 group-hover:-translate-y-1">
                  <div className="text-4xl mb-4 text-primary">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary mb-3">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  <span className="text-primary font-medium">
                    Explore Tools →
                  </span>
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
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
            >
              View All Tools
            </Link>
          </div>
        </section>

        {/* Ad Banner */}
        <AdBanner position="middle" className="my-12" />

        {/* Features Section */}
        <section className="py-12 bg-card rounded-xl border border-border">
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