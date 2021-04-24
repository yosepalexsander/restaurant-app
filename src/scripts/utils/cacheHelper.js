import CONFIG from '../globals/config';

class CacheHelper {
  static async cachingAppShell(requests) {
    const cache = await this.openCache();
    cache.addAll(requests);
  }

  static async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      return response;
    }
    return this.fetchRequest(request);
  }

  static async fetchRequest(request) {
    const response = await fetch(request);
    if (!response || response.status !== 200) {
      return response;
    }

    await this.addCache(request);
    return response;
  }

  static async openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  }

  static async addCache(request) {
    try {
      const cache = await this.openCache();
      cache.add(request);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteOldCache() {
    try {
      const cacheNames = await caches.keys();
      cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName));
    } catch (error) {
      console.error('Failed to delete cache: \n', error);
    }
  }
}

export default CacheHelper;
