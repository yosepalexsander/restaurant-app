import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async getRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANTS);
      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANT(id));
      const data = await response.json();
      return data.restaurant;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async createReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 12345,
        },
        body: JSON.stringify(review),
      });

      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async searchRestaurant(query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const data = response.json();
      return data.restaurants;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export default RestaurantSource;
