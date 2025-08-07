import Link from 'next/link';

export default function ToolCard({ tool, category }) {
  return (
    <Link href={tool.url} className="group block h-full">
      <div className="h-full flex flex-col bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300 group-hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary mb-2 transition-colors duration-300">
            {tool.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <span className="text-primary text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
            Try now <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </span>
          {tool.featured && (
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}