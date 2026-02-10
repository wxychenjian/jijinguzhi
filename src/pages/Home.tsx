import React from 'react';
import { useFundData } from '@/hooks/useFundData';
import { FundCard } from '@/components/FundCard';
import { AddFundForm } from '@/components/AddFundForm';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function Home() {
  const { funds, isLoading, error, lastUpdate, addFund, removeFund, refresh } = useFundData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <AddFundForm onAdd={addFund} isLoading={isLoading} />
        
        <div className="flex items-center space-x-4 text-sm text-zinc-500">
          <span>上次更新: {lastUpdate}</span>
          <button 
            onClick={refresh}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            title="刷新"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {funds.length === 0 && !isLoading ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 dark:text-zinc-400">还没有关注的基金，请在上方添加。</p>
          <p className="text-zinc-400 text-sm mt-2">试试输入代码: 001186</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funds.map(fund => (
            <FundCard key={fund.code} fund={fund} onRemove={removeFund} />
          ))}
        </div>
      )}
    </div>
  );
}
