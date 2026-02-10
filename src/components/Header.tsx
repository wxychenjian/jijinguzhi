import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span>基金实时估值</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-600",
              location.pathname === '/' ? "text-blue-600" : "text-zinc-600 dark:text-zinc-400"
            )}
          >
            首页
          </Link>
          <Link 
            to="/settings" 
            className={cn(
              "p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              location.pathname === '/settings' ? "text-blue-600 bg-zinc-100 dark:bg-zinc-800" : "text-zinc-600 dark:text-zinc-400"
            )}
            title="设置"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
