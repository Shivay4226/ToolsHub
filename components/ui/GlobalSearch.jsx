'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { searchTools } from '@/lib/tools-data';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const searchResults = searchTools(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setIsLoading(false);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/40 z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="animate-spin inline-block w-4 h-4 border-2 border-primary border-r-transparent rounded-full"></div>
              <span className="ml-2">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-muted-foreground">
                  Found {results.length} tool{results.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="py-2">
                {results.map((tool, index) => (
                  <Link
                    key={`${tool.category}-${tool.id}`}
                    href={tool.url}
                    onClick={handleResultClick}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <span className="text-primary text-sm font-semibold">
                          {tool.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground dark:text-card-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1 line-clamp-2">
                          {tool.description}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {tool.categoryName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">No tools found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for a different term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
