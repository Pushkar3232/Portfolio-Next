/**
 * Cache Management Hook
 * Provides utilities to manage, clear, and monitor caches
 */

'use client';

import { useState, useCallback } from 'react';
import { clearCache, clearAllCache, getCacheInfo } from './cacheUtils';

export const useCacheManagement = () => {
  const [cacheStatus, setCacheStatus] = useState<Record<string, any>>({});

  const refreshCacheStatus = useCallback(() => {
    const cacheKeys = ['experiences', 'education', 'certificates'];
    const status: Record<string, any> = {};

    cacheKeys.forEach((key) => {
      status[key] = getCacheInfo(key);
    });

    setCacheStatus(status);
  }, []);

  const clearSpecificCache = useCallback((key: string) => {
    clearCache(key);
    refreshCacheStatus();
  }, [refreshCacheStatus]);

  const clearAllCaches = useCallback(() => {
    clearAllCache();
    setCacheStatus({});
  }, []);

  const getCacheExpiry = useCallback((key: string) => {
    const info = getCacheInfo(key);
    if (!info) return null;
    return info.remainingTTL;
  }, []);

  return {
    cacheStatus,
    refreshCacheStatus,
    clearSpecificCache,
    clearAllCaches,
    getCacheExpiry,
  };
};

export default useCacheManagement;
