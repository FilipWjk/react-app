import React, { useState, useEffect } from 'react';
import './App.css';

// * Components
import Header from './components/Header.jsx';
import TrendingMovies from './components/TrendingMovies.jsx';
import MovieList from './components/MovieList.jsx';

// * Services
import tmdbService from './services/tmdbService.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setError('');

    try {
      const results = query ? await tmdbService.searchMovies(query) : await tmdbService.getPopularMovies();
      setMovies(results);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const getMovieListTitle = () => {
    if (searchTerm.trim()) {
      return `Search Results for "${searchTerm}"`;
    }
    return 'New Movies';
  };

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <TrendingMovies />

        <MovieList movies={movies} isLoading={isLoading} error={error} title={getMovieListTitle()} />
      </div>
    </main>
  );
}

export default App;
