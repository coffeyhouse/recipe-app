// src/utils/cache.js

class Cache {
    constructor() {
      this.cache = {};
    }
  
    set(key, data) {
      this.cache[key] = {
        data,
        timestamp: new Date().getTime(),
      };
    }
  
    get(key, expiryTime = 180000) { // default expiry time is 180 seconds
      const cachedItem = this.cache[key];
      if (cachedItem && (new Date().getTime() - cachedItem.timestamp < expiryTime)) {
        return cachedItem.data;
      }
      return null;
    }
  
    invalidate(key) {
      delete this.cache[key];
    }
  }
  
  const cache = new Cache();
  export default cache;
  