import { API_ENDPOINTS, getApiOptions } from '../constants/api.js';

class TMDBService {
  constructor() {
    this.apiOptions = getApiOptions();
  }

  async fetchMovies(query = '') {
    try {
      const endpoint = query ? API_ENDPOINTS.SEARCH_MOVIES(query) : API_ENDPOINTS.DISCOVER_MOVIES;

      const response = await fetch(endpoint, this.apiOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies. Please try again later.');
    }
  }

  async searchMovies(query) {
    if (!query.trim()) {
      return this.fetchMovies();
    }
    return this.fetchMovies(query);
  }

  async getPopularMovies() {
    return this.fetchMovies();
  }
}

export default new TMDBService();
