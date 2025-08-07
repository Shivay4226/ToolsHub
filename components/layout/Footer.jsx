import Link from 'next/link';
import { categories, tools } from '@/lib/tools-data';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">ToolsHub</h3>
            <p className="text-muted-foreground text-sm">
              Free online tools for IT professionals, developers, students, and businesses.
              Fast, reliable, and completely free to use.
            </p>
          </div>
          
          {categories.slice(0, 3).map((category) => (
            <div key={category.id}>
              <h4 className="text-md font-semibold text-foreground mb-4">{category.name}</h4>
              <ul className="space-y-2">
                {tools[category.id]?.slice(0, 4).map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={tool.url}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 ToolsHub. All rights reserved. Free online tools for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}