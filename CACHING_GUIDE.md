# Firebase Data Caching Implementation

## Overview
This caching system is designed to reduce Firebase Firestore read operations by storing data in the browser's localStorage. It provides a seamless caching layer that works alongside real-time Firebase listeners.

## Key Features

- **Automatic Caching**: Data is automatically cached after first fetch
- **TTL (Time-To-Live)**: Cache expires after configurable duration (default: 24 hours)
- **Fallback Support**: Uses cached data when Firebase is unavailable
- **Real-time Updates**: Continues to listen for Firebase updates in the background
- **Zero Configuration**: Works out of the box with minimal code changes

## Files Created

### 1. `lib/cacheUtils.ts`
Core caching utility functions:
- `setCache<T>(key, data, ttl)` - Store data with TTL
- `getCache<T>(key)` - Retrieve cached data if valid
- `isCacheValid(key)` - Check if cache exists and is valid
- `clearCache(key)` - Clear specific cache
- `clearAllCache()` - Clear all portfolio caches
- `getCacheInfo(key)` - Get cache metadata (age, TTL, expiry)

**Default TTLs:**
- `DEFAULT_TTL`: 24 hours
- `SHORT_TTL`: 30 minutes

### 2. `lib/useFirebaseCache.ts`
Custom React hooks for Firebase data fetching with caching:
- `useFirebaseDataWithCache<T>(query, options)` - For list queries
- `useFirebaseDocWithCache<T>(query, options)` - For single documents

**Hook Options:**
```typescript
interface UseFirebaseDataOptions {
  cacheName: string;      // Unique cache key
  ttl?: number;          // Cache TTL in milliseconds
  skipCache?: boolean;   // Bypass cache if needed
  debug?: boolean;       // Enable debug logging
}
```

### 3. `lib/useCacheManagement.ts`
Hook for managing caches programmatically:
- `refreshCacheStatus()` - Update cache status
- `clearSpecificCache(key)` - Clear specific cache
- `clearAllCaches()` - Clear all caches
- `getCacheExpiry(key)` - Get remaining TTL

## Implementation in Components

### Experience Component
```typescript
// In useEffect:
const cachedExperiences = getCache<ExperienceData[]>('experiences');
if (cachedExperiences) {
  setExperiences(cachedExperiences);
  setIsCached(true);
  setLoading(false);
}

// After Firebase fetch:
setCache('experiences', experiencesData, DEFAULT_TTL);
```

### Education Component
```typescript
// Cache both education and certificates
const cachedEducation = getCache<EducationData[]>('education');
const cachedCerts = getCache<Certificate[]>('certificates');

if (cachedEducation) setEducationData(cachedEducation);
if (cachedCerts) setCertificates(cachedCerts);

// After fetch:
setCache('education', data, DEFAULT_TTL);
setCache('certificates', sortedData, DEFAULT_TTL);
```

## How It Works

### Flow Diagram
```
User loads page
    ↓
Check localStorage for cached data
    ↓
    ├─ Cache found → Load immediately (isCached = true)
    │   └─ User sees data instantly
    │
    └─ No cache → Show loading state
        ↓
    Firebase listener setup
        ↓
    Data received from Firebase
        ↓
    Store in cache
    ├─ Update UI with fresh data
    └─ Mark as from fresh source (isCached = false)
```

### Read Reduction
- **First Load**: 1 Firebase read (data cached)
- **Subsequent Loads**: 0 Firebase reads (uses cache)
- **Cache Expiry**: 24 hours later
- **Real-time Updates**: Continues to update in background

## Benefits

1. **Reduced Costs**: Fewer Firestore read operations
2. **Faster Loading**: Data from localStorage loads instantly
3. **Offline Support**: Cached data works without internet
4. **Better UX**: Instant page loads on repeat visits
5. **Real-time Updates**: Still get fresh data from Firebase
6. **Graceful Degradation**: Falls back to cache if Firebase fails

## Cache Storage Breakdown

Cache keys are stored with prefix `portfolio_cache_`:
- `portfolio_cache_experiences` - Experience data
- `portfolio_cache_education` - Education data
- `portfolio_cache_certificates` - Certificate data

Estimated storage per collection:
- Experience (5 items): ~50KB
- Education (3 items): ~5KB
- Certificates (10 items): ~150KB
- **Total**: ~200KB (well under localStorage limit of 5-10MB)

## Configuration

### Adjust TTL for Different Needs

```typescript
// For frequently changing data (e.g., admin dashboard)
setCache('experiences', data, SHORT_TTL); // 30 minutes

// For static data
setCache('education', data, 7 * 24 * 60 * 60 * 1000); // 7 days
```

### Debug Mode

Enable console logging:
```typescript
const { data } = useFirebaseDataWithCache(query, {
  cacheName: 'experiences',
  debug: true
});
```

## Clearing Cache

### Programmatically
```typescript
import { clearCache, clearAllCache } from '@/lib/cacheUtils';

// Clear specific cache
clearCache('experiences');

// Clear all caches
clearAllCache();
```

### Manual Management Hook
```typescript
const { clearSpecificCache, clearAllCaches } = useCacheManagement();

// In click handler
onClick={() => clearSpecificCache('experiences')}
```

## Best Practices

1. **Use Consistent Cache Keys**: Always use the same key for the same data
2. **Appropriate TTLs**: 
   - Admin pages: SHORT_TTL (30 min)
   - Public pages: DEFAULT_TTL (24 hours)
   - Static data: Longer TTL
3. **Error Handling**: Always have fallback for cache misses
4. **Monitor Storage**: Check localStorage usage in DevTools
5. **Clear on Change**: Clear cache after admin updates

## Browser Storage Limits

| Browser | Storage Limit |
|---------|---------------|
| Chrome | 10MB |
| Firefox | 10MB |
| Safari | 5MB |
| Edge | 10MB |

Current usage: ~200KB (well within limits)

## Troubleshooting

### Cache Not Updating
- Check if TTL has expired: Use `getCacheInfo(key)`
- Manually clear: `clearCache('specific-key')`
- Verify Firebase listener is active

### Stale Data
- Reduce TTL for more frequent updates
- Clear cache after admin changes
- Use `debug: true` to monitor updates

### Storage Issues
- Check localStorage in DevTools
- Clear old caches: `clearAllCache()`
- Monitor collection sizes

## Future Enhancements

- [ ] IndexedDB for larger datasets
- [ ] Service Worker caching
- [ ] Selective cache invalidation
- [ ] Cache statistics dashboard
- [ ] Automatic cache syncing on app focus
- [ ] Compression for large datasets

## Migration Guide

### Existing Components Without Cache

Before:
```typescript
useEffect(() => {
  const unsubscribe = onSnapshot(query, (snapshot) => {
    setData(snapshot.docs.map(...));
  });
  return () => unsubscribe();
}, []);
```

After:
```typescript
useEffect(() => {
  const cached = getCache('mydata');
  if (cached) setData(cached);

  const unsubscribe = onSnapshot(query, (snapshot) => {
    const newData = snapshot.docs.map(...);
    setData(newData);
    setCache('mydata', newData);
  });
  return () => unsubscribe();
}, []);
```

## Questions & Support

For issues or questions:
1. Check browser DevTools → Application → Local Storage
2. Enable debug mode for detailed console logs
3. Review cache expiry times
4. Check Firebase listener status
