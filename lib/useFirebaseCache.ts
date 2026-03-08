/**
 * Custom hook for fetching Firebase data with localStorage caching
 * Reduces Firestore read operations while maintaining real-time updates
 */

import { useState, useEffect, useCallback } from 'react';
import { Query, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { getCache, setCache, DEFAULT_TTL, SHORT_TTL } from './cacheUtils';

interface UseFirebaseDataOptions {
  cacheName: string;
  ttl?: number;
  skipCache?: boolean;
  debug?: boolean;
}

/**
 * Hook to fetch data from Firebase with caching
 * 
 * @param query - Firebase query
 * @param options - Cache options including cache name and TTL
 * @returns Object with data, loading, error, and refetch function
 */
export const useFirebaseDataWithCache = <T>(
  query: Query,
  options: UseFirebaseDataOptions
) => {
  const {
    cacheName,
    ttl = DEFAULT_TTL,
    skipCache = false,
    debug = false,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCached, setIsCached] = useState(false);

  const fetchAndCache = useCallback(
    (snapshot: any) => {
      try {
        const fetchedData: T = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        })) as T;

        setData(fetchedData);
        setCache(cacheName, fetchedData, ttl);
        setLoading(false);
        setError(null);

        if (debug) {
          console.log(`[Cache] Updated cache for: ${cacheName}`, fetchedData);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setLoading(false);
        if (debug) {
          console.error(`[Cache] Error processing data for: ${cacheName}`, err);
        }
      }
    },
    [cacheName, ttl, debug]
  );

  useEffect(() => {
    // Try to get cached data first
    if (!skipCache) {
      const cachedData = getCache<T>(cacheName);
      if (cachedData) {
        setData(cachedData);
        setIsCached(true);
        setLoading(false);

        if (debug) {
          console.log(`[Cache] Using cached data for: ${cacheName}`);
        }
      }
    }

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        fetchAndCache(snapshot);
        setIsCached(false);
      },
      (err) => {
        const error = err instanceof Error ? err : new Error(String(err));
        
        // If Firebase fetch fails but we have cached data, use it
        const cachedData = getCache<T>(cacheName);
        if (cachedData) {
          setData(cachedData);
          setIsCached(true);
          setLoading(false);
          setError(null);

          if (debug) {
            console.warn(`[Cache] Firebase error, using cached data for: ${cacheName}`, err);
          }
        } else {
          setError(error);
          setLoading(false);

          if (debug) {
            console.error(`[Cache] Firebase error and no cache available for: ${cacheName}`, err);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [query, cacheName, skipCache, fetchAndCache, debug]);

  const refetch = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      setLoading(true);
      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          fetchAndCache(snapshot);
          setIsCached(false);
          unsubscribe();
          resolve();
        },
        (err) => {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
          unsubscribe();
          resolve();
        }
      );
    });
  }, [query, fetchAndCache]);

  return {
    data,
    loading,
    error,
    isCached,
    refetch,
  };
};

/**
 * Hook to fetch a single document with caching
 */
export const useFirebaseDocWithCache = <T extends { id: string }>(
  query: Query,
  options: UseFirebaseDataOptions
) => {
  const {
    cacheName,
    ttl = DEFAULT_TTL,
    skipCache = false,
    debug = false,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // Try to get cached data first
    if (!skipCache) {
      const cachedData = getCache<T>(cacheName);
      if (cachedData) {
        setData(cachedData);
        setIsCached(true);
        setLoading(false);

        if (debug) {
          console.log(`[Cache] Using cached doc for: ${cacheName}`);
        }
      }
    }

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        try {
          if (snapshot.empty) {
            setData(null);
            setLoading(false);
            return;
          }

          const doc = snapshot.docs[0];
          const fetchedData: T = {
            id: doc.id,
            ...doc.data(),
          } as T;

          setData(fetchedData);
          setCache(cacheName, fetchedData, ttl);
          setLoading(false);
          setError(null);
          setIsCached(false);

          if (debug) {
            console.log(`[Cache] Updated cached doc for: ${cacheName}`, fetchedData);
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          setLoading(false);
        }
      },
      (err) => {
        const error = err instanceof Error ? err : new Error(String(err));

        // If Firebase fetch fails but we have cached data, use it
        const cachedData = getCache<T>(cacheName);
        if (cachedData) {
          setData(cachedData);
          setIsCached(true);
          setLoading(false);
          setError(null);

          if (debug) {
            console.warn(`[Cache] Firebase error for doc, using cache: ${cacheName}`, err);
          }
        } else {
          setError(error);
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [query, cacheName, skipCache, ttl, debug]);

  return {
    data,
    loading,
    error,
    isCached,
  };
};

export { DEFAULT_TTL, SHORT_TTL };
