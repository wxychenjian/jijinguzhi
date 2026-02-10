import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings, AppSettings, getSavedFunds, saveFunds } from '@/utils/storage';
import { Trash2 } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState<AppSettings>({ refreshInterval: 60000 });
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    setSettings(getSettings());
    setCacheSize(getSavedFunds().length);
  }, []);

  const handleIntervalChange = (interval: number) => {
    const newSettings = { ...settings, refreshInterval: interval };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleClearCache = () => {
    if (confirm('确定要清空所有关注的基金吗？')) {
      saveFunds([]);
      setCacheSize(0);
      alert('缓存已清空');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">刷新频率</h2>
        <div className="space-y-3">
          {[
            { label: '30秒', value: 30000 },
            { label: '1分钟', value: 60000 },
            { label: '5分钟', value: 300000 },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <input
                type="radio"
                name="refreshInterval"
                value={option.value}
                checked={settings.refreshInterval === option.value}
                onChange={() => handleIntervalChange(option.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">数据管理</h2>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">清空缓存</h3>
              <p className="text-sm text-zinc-500 mt-1">当前已关注 {cacheSize} 个基金</p>
            </div>
            <button
              onClick={handleClearCache}
              className="flex items-center space-x-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
