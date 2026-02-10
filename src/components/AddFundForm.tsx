import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface AddFundFormProps {
  onAdd: (code: string) => Promise<void>;
  isLoading: boolean;
}

export function AddFundForm({ onAdd, isLoading }: AddFundFormProps) {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    
    await onAdd(code);
    setCode('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="输入6位基金代码添加"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        disabled={isLoading}
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-zinc-400" />
      {isLoading && (
        <div className="absolute right-3 top-2.5">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        </div>
      )}
      <button 
        type="submit" 
        className="hidden" 
        disabled={isLoading || code.length !== 6}
      >
        Add
      </button>
    </form>
  );
}
