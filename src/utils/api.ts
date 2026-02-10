import { Fund } from '@/types';

export async function getFundValue(fundCode: string): Promise<Fund> {
  try {
    // Add timestamp to prevent caching
    const response = await fetch(`/api/fund/${fundCode}.js?rt=${Date.now()}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    
    // Parse JSONP format: jsonpgz({...});
    const match = text.match(/jsonpgz\((.*)\);/);
    if (!match || !match[1]) {
      throw new Error('Invalid response format');
    }

    const data = JSON.parse(match[1]);
    
    // API returns:
    // fundcode: "001186"
    // name: "富国文体健康股票A"
    // jzrq: "2023-05-12" (Last net value date)
    // dwjz: "2.1230" (Last net value)
    // gsz: "2.1180" (Estimated value)
    // gszzl: "-0.24" (Estimated change percent)
    // gztime: "2023-05-15 15:00" (Estimation time)

    const currentValue = parseFloat(data.gsz);
    const previousValue = parseFloat(data.dwjz);
    const changePercent = parseFloat(data.gszzl);
    const change = currentValue - previousValue;

    return {
      code: fundCode,
      name: data.name,
      currentValue: currentValue,
      previousValue: previousValue,
      change: parseFloat(change.toFixed(4)),
      changePercent: changePercent,
      updateTime: data.gztime
    };
  } catch (error) {
    console.error(`Failed to fetch fund ${fundCode}:`, error);
    throw error;
  }
}
