import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FundHistoryItem } from '@/types';
import { format, parseISO, startOfWeek, startOfMonth } from 'date-fns';

interface FundChartProps {
  data: FundHistoryItem[];
  granularity: 'daily' | 'weekly' | 'monthly';
}

export default function FundChart({ data, granularity }: FundChartProps) {
  const chartData = useMemo(() => {
    if (granularity === 'daily') {
      return data;
    }

    // Resample data
    const groupedData: Record<string, FundHistoryItem[]> = {};
    
    data.forEach(item => {
      const date = parseISO(item.date);
      let key = '';
      
      if (granularity === 'weekly') {
        key = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
      } else {
        key = format(startOfMonth(date), 'yyyy-MM-dd');
      }
      
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    return Object.keys(groupedData).map(key => {
      const group = groupedData[key];
      // For funds, "Weekly/Monthly" usually means the value at the END of the period
      // Sort group by date just in case
      group.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const lastItem = group[group.length - 1];
      return {
        ...lastItem,
        date: key // Use the start date of the period for the x-axis label
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  }, [data, granularity]);

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500">暂无数据</div>;
  }

  const minVal = Math.min(...chartData.map(d => d.value));
  const maxVal = Math.max(...chartData.map(d => d.value));
  const domainMin = minVal * 0.99; // Tighter bounds
  const domainMax = maxVal * 1.01;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(parseISO(date), 'MM-dd')}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            minTickGap={30}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[domainMin, domainMax]} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(val) => val.toFixed(3)}
            width={50}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelFormatter={(label) => format(parseISO(label), 'yyyy年MM月dd日')}
            formatter={(value: number) => [value.toFixed(4), '净值']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }} 
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}