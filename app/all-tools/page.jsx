import { categories, tools } from '@/lib/tools-data';
import ToolCard from '@/components/ui/ToolCard';
import AdBanner from '@/components/ads/AdBanner';

export const metadata = {
  title: 'All Tools - Complete List of Free Online Tools',
  description: 'Browse our complete collection of 100+ free online tools across IT, Finance, Education, Marketing, Health, and Development categories.',
  keywords: 'online tools, free tools, all tools, complete list, calculators, converters',
};

export default function AllToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-3xl mb-6">
          <span className="text-3xl">🛠️</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground dark:text-card-foreground mb-6">
          All Tools
        </h1>
        <p className="text-xl text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Explore our complete collection of free online tools. Find the perfect tool for your needs across multiple categories.
        </p>
      </div>

      {/* Ad Banner */}
      <AdBanner position="top" className="mb-12" />

      {/* Tools by Category */}
      {categories.map((category) => {
        const categoryTools = tools[category.id] || [];
        
        if (categoryTools.length === 0) return null;

        return (
          <section key={category.id} className="mb-12">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground dark:text-card-foreground mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground dark:text-gray-400 text-lg leading-relaxed">{category.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} category={category.id} />
              ))}
            </div>

            {/* Ad Banner after every other category */}
            {categories.indexOf(category) % 2 === 1 && (
              <AdBanner position="middle" className="mb-8" />
            )}
          </section>
        );
      })}

      {/* Bottom CTA */}
      <div className="text-center bg-accent/30 rounded-xl p-8 mt-16 border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Need a Tool That's Not Listed?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're constantly adding new tools based on user feedback. Let us know what tools you'd like to see next!
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Request a Tool
        </button>
      </div>
    </div>
  );
}