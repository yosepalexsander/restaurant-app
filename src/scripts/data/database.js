import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

class FavoriteRestaurant {
  static async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  }

  static async getRestaurant(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  }

  static async putRestaurant(restaurant) {
    if (!Object.prototype.hasOwnProperty.call(restaurant, 'id')) return undefined;
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  }

  static async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  }
}

export default FavoriteRestaurant;
