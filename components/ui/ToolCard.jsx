import Link from 'next/link';

export default function ToolCard({ tool, category }) {
  return (
    <Link href={tool.url} className="group block h-full">
      <div className="h-full flex flex-col bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-600 hover:-translate-y-1 relative">
        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300">
              <span className="text-primary text-xl font-semibold">
                {tool.title.charAt(0)}
              </span>
            </div>
            {tool.featured && (
              <span className="bg-primary-gradient text-white text-xs px-3 py-1 rounded-full font-medium">
                ✨ Popular
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground dark:text-card-foreground mb-3 leading-tight">
            {tool.title}
          </h3>
          
          <p className="text-muted-foreground dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {tool.description}
          </p>
        </div>
        
        {/* Action area */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-primary text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
            <span className="mr-2">Try now</span>
            <svg 
              className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}