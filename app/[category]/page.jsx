import { notFound } from 'next/navigation';
import { getCategoryById, getToolsByCategory, categories } from '@/lib/tools-data';
import ToolCard from '@/components/ui/ToolCard';
import AdBanner from '@/components/ads/AdBanner';

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }) {
  const category = getCategoryById(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Free Online Tools`,
    description: `${category.description}. Discover powerful ${category.name.toLowerCase()} for professionals and students.`,
    keywords: `${category.name.toLowerCase()}, online tools, free tools, calculators`,
  };
}

export default function CategoryPage({ params }) {
  const category = getCategoryById(params.category);
  const tools = getToolsByCategory(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 text-primary">{category.icon}</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {category.name}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Ad Banner */}
      <AdBanner position="top" className="mb-12" />

      {/* Tools Grid */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Available Tools ({tools.length})
        </h2>
        
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} category={params.category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground/80 text-lg">
              Tools for this category are coming soon!
            </p>
          </div>
        )}
      </section>

      {/* Ad Banner */}
      <AdBanner position="middle" className="mt-12" />
    </div>
  );
}