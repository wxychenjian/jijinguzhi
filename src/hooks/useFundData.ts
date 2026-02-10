import { useState, useEffect, useCallback } from 'react';
import { Fund } from '@/types';
import { getFundValue } from '@/utils/api';
import { getSavedFunds, saveFunds, getSettings } from '@/utils/storage';

export function useFundData() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [fundCodes, setFundCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  
  // Load initial settings and funds
  useEffect(() => {
    const savedCodes = getSavedFunds();
    setFundCodes(savedCodes);
  }, []);

  const fetchAllFunds = useCallback(async (codes: string[]) => {
    if (codes.length === 0) {
      setFunds([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const promises = codes.map(code => getFundValue(code));
      const results = await Promise.all(promises);
      setFunds(results);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch some fund data. Please check your network.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and auto-refresh
  useEffect(() => {
    // Avoid initial double fetch if fundCodes is empty initially or on mount
    if (fundCodes.length > 0) {
        fetchAllFunds(fundCodes);
    }

    const settings = getSettings();
    const intervalId = setInterval(() => {
      if (fundCodes.length > 0) {
        fetchAllFunds(fundCodes);
      }
    }, settings.refreshInterval);

    return () => clearInterval(intervalId);
  }, [fundCodes, fetchAllFunds]);

  const addFund = async (code: string) => {
    if (fundCodes.includes(code)) {
      setError('Fund already exists');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Verify code by fetching data
      const newFund = await getFundValue(code);
      const newCodes = [...fundCodes, code];
      setFundCodes(newCodes);
      saveFunds(newCodes);
      // We can just add the new fund to the list instead of refetching all
      setFunds(prev => [...prev, newFund]);
    } catch (err) {
      setError('Invalid fund code or network error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFund = (code: string) => {
    const newCodes = fundCodes.filter(c => c !== code);
    setFundCodes(newCodes);
    saveFunds(newCodes);
    setFunds(prev => prev.filter(f => f.code !== code));
  };

  const refresh = () => {
    fetchAllFunds(fundCodes);
  };

  return {
    funds,
    isLoading,
    error,
    lastUpdate,
    addFund,
    removeFund,
    refresh
  };
}
