export interface Fund {
  code: string;          // 基金代码
  name: string;          // 基金名称
  currentValue: number;  // 当前估值
  previousValue: number; // 上一个估值
  change: number;        // 涨跌金额
  changePercent: number; // 涨跌百分比
  updateTime: string;    // 更新时间
}

export interface FundCache {
  funds: Fund[];
  lastUpdate: string;
  cacheExpiry: number;
}

export interface AppState {
  funds: Fund[];
  isLoading: boolean;
  error: string | null;
  refreshInterval: number; // 毫秒
  lastRefreshTime: string;
}
