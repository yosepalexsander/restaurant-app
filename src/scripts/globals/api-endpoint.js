import CONFIG from './config';

const API_ENDPOINT = {
  RESTAURANTS: `${CONFIG.BASE_URL}list`,
  RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  REVIEW: `${CONFIG.BASE_URL}review`,
  SEARCH: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
};

export default API_ENDPOINT;
