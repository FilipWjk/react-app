import React from 'react';
import MovieCard from './MovieCard.jsx';
import Spinner from './Spinner.jsx';

const MovieList = ({ movies, isLoading, error, title = 'All Movies' }) => {
  return (
    <section className="all-movies">
      <h2 className="text-2xl">{title}</h2>

      {isLoading ? (
        <div className="flex justify-center mt-8">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center mt-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-400">No movies found. Try a different search term.</p>
        </div>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
