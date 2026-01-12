/**
 * Simple in-memory cache with TTL
 */
const cache = new Map();
const TTL = 60 * 1000; // 60 seconds

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

function setCache(key, value) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + TTL
  });
}

module.exports = {
  getCache,
  setCache
};
