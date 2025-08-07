import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { getFeaturedTools } from '@/lib/tools-data';

export default function NotFound() {
  const featuredTools = getFeaturedTools().slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-muted-foreground/20 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. But don't worry, we have plenty of useful tools to help you!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            href="/all-tools"
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/80 transition-colors inline-flex items-center gap-2"
          >
            <Search size={20} />
            Browse All Tools
          </Link>
        </div>

        {/* Popular Tools */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">Try These Popular Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link key={tool.id} href={tool.url} className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all group-hover:border-primary/50 hover:-translate-y-0.5">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary mb-2">
                    {tool.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}