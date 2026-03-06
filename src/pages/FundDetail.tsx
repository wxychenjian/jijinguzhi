import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { getFundHistory } from '@/utils/api';
import { FundHistory } from '@/types';
import FundChart from '@/components/FundChart';
import { cn } from '@/utils/cn';

export default function FundDetail() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState<FundHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [granularity, setGranularity] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    if (!code) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFundHistory(code);
        setHistory(data);
      } catch (err) {
        setError('获取历史数据失败，请稍后重试');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  if (!code) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4">
      <header className="flex items-center justify-between mb-6 container mx-auto max-w-4xl">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          返回
        </button>
        <h1 className="text-xl font-bold">{history?.name || `基金 ${code}`}</h1>
        <div className="w-16"></div> {/* Spacer */}
      </header>

      <main className="container mx-auto max-w-4xl">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">历史净值走势</h2>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                {(['daily', 'weekly', 'monthly'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGranularity(g)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm transition-all",
                      granularity === g
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100 font-medium"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                    )}
                  >
                    {g === 'daily' ? '日K' : g === 'weekly' ? '周K' : '月K'}
                  </button>
                ))}
              </div>
            </div>
            
            {history && history.data.length > 0 ? (
              <FundChart 
                data={history.data} 
                granularity={granularity} 
              />
            ) : (
              <div className="text-center py-12 text-zinc-500">暂无历史数据</div>
            )}
            
            <div className="mt-4 text-xs text-zinc-400 text-center">
              数据来源：天天基金网 (仅供参考)
            </div>
          </div>
        )}
      </main>
    </div>
  );
}