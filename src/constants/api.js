export const API_BASE_URL = 'https://api.themoviedb.org/3';

export const API_ENDPOINTS = {
  SEARCH_MOVIES: (query) => `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
  DISCOVER_MOVIES: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,
  MOVIE_IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p',
    SIZES: {
      SMALL: 'w300',
      MEDIUM: 'w500',
      LARGE: 'w780',
    },
  },
};

export const getApiOptions = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_TMDB_API_KEY is not configured');
  }

  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
};

export const getImageUrl = (path, size = 'MEDIUM') => {
  if (!path) return '/no-movie.png';
  const imageSize = API_ENDPOINTS.MOVIE_IMAGES.SIZES[size];
  return `${API_ENDPOINTS.MOVIE_IMAGES.BASE_URL}/${imageSize}${path}`;
};
