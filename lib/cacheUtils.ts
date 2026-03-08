/**
 * Cache Utility for storing Firebase data in browser localStorage
 * Reduces Firestore read operations by caching data with TTL (Time-To-Live)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'portfolio_cache_';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours
const SHORT_TTL = 30 * 60 * 1000; // 30 minutes for frequently updated data

/**
 * Set cache with data and TTL
 */
export const setCache = <T>(key: string, data: T, ttl: number = DEFAULT_TTL): void => {
  try {
    const cacheEntry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    const cacheKey = `${CACHE_PREFIX}${key}`;
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
    // Silently fail if localStorage is full or unavailable
  }
};

/**
 * Get cache if it exists and is not expired
 */
export const getCache = <T>(key: string): T | null => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (!cachedData) {
      return null;
    }

    const cacheEntry: CacheEntry<T> = JSON.parse(cachedData);
    const now = Date.now();
    const age = now - cacheEntry.timestamp;

    // Check if cache is expired
    if (age > cacheEntry.ttl) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cacheEntry.data;
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

/**
 * Check if cache exists and is valid
 */
export const isCacheValid = (key: string): boolean => {
  return getCache(key) !== null;
};

/**
 * Clear specific cache
 */
export const clearCache = (key: string): void => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.error(`Error clearing cache for key ${key}:`, error);
  }
};

/**
 * Clear all portfolio caches
 */
export const clearAllCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing all cache:', error);
  }
};

/**
 * Get cache info (remaining TTL)
 */
export const getCacheInfo = (key: string) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (!cachedData) {
      return null;
    }

    const cacheEntry: CacheEntry<any> = JSON.parse(cachedData);
    const now = Date.now();
    const age = now - cacheEntry.timestamp;
    const remainingTTL = cacheEntry.ttl - age;

    return {
      exists: true,
      age,
      ttl: cacheEntry.ttl,
      remainingTTL: Math.max(0, remainingTTL),
      isExpired: remainingTTL <= 0,
    };
  } catch (error) {
    return null;
  }
};

export { DEFAULT_TTL, SHORT_TTL };
