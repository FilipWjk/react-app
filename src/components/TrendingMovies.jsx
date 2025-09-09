import React, { useState, useEffect } from 'react';
import appwriteService from '../services/appwriteService.js';
import Spinner from './Spinner.jsx';

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError('');

    try {
      const movies = await appwriteService.getTrendingMovies();
      setTrendingMovies(movies);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching trending movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  if (isLoading) {
    return (
      <section className="trending">
        <h2 className="text-2xl">Trending Movies</h2>
        <div className="flex justify-center mt-8">
          <Spinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="trending">
        <h2 className="text-2xl">Trending Movies</h2>
        <p className="text-red-400 mt-4">Failed to load trending movies</p>
      </section>
    );
  }

  if (trendingMovies.length === 0) {
    return null;
  }

  return (
    <section className="trending">
      <h2 className="text-2xl">Trending Movies</h2>
      <ul>
        {trendingMovies.map((movie, index) => (
          <li key={movie.$id}>
            <p>{index + 1}</p>
            <img
              src={movie.poster_url || '/no-movie.png'}
              alt={movie.searchTerm || `Trending movie ${index + 1}`}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingMovies;
