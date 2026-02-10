const STORAGE_KEY_FUNDS = 'jijinguzhi_funds';
const STORAGE_KEY_SETTINGS = 'jijinguzhi_settings';

export interface AppSettings {
  refreshInterval: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  refreshInterval: 60000, // 1 minute
};

export function getSavedFunds(): string[] {
  const data = localStorage.getItem(STORAGE_KEY_FUNDS);
  return data ? JSON.parse(data) : [];
}

export function saveFunds(fundCodes: string[]) {
  localStorage.setItem(STORAGE_KEY_FUNDS, JSON.stringify(fundCodes));
}

export function getSettings(): AppSettings {
  const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
  return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
}
