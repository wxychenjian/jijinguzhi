import React from 'react';
import { Fund } from '@/types';
import { cn } from '@/utils/cn';
import { Trash2 } from 'lucide-react';

interface FundCardProps {
  fund: Fund;
  onRemove: (code: string) => void;
}

export function FundCard({ fund, onRemove }: FundCardProps) {
  // Requirement: Green (#10B981) for Up, Red (#EF4444) for Down
  const isPositive = fund.change >= 0;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{fund.name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{fund.code}</p>
        </div>
        <button
          onClick={() => onRemove(fund.code)}
          className="text-zinc-400 hover:text-red-500 transition-colors p-1"
          title="删除基金"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">估值</p>
          <p className={cn("text-xl font-bold", colorClass)}>
            {fund.currentValue.toFixed(4)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">涨跌幅</p>
          <p className={cn("text-xl font-bold", colorClass)}>
            {isPositive ? '+' : ''}{fund.changePercent}%
          </p>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
        <span>更新时间: {fund.updateTime}</span>
        <span>涨跌: {isPositive ? '+' : ''}{fund.change.toFixed(4)}</span>
      </div>
    </div>
  );
}
