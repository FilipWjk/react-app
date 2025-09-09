import React from 'react';
import { getImageUrl } from '../constants/api.js';

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, release_date, original_language } = movie;

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatYear = (date) => {
    return date ? date.split('-')[0] : 'N/A';
  };

  const formatLanguage = (lang) => {
    return lang ? lang.toUpperCase() : 'N/A';
  };

  return (
    <li>
      <div className="movie-card">
        <img src={getImageUrl(poster_path)} alt={title} loading="lazy" />

        <div className="mt-4">
          <h3 title={title}>{title}</h3>

          <div className="content">
            <div className="rating">
              <img src="/star.svg" alt="Rating" />
              <p>{formatRating(vote_average)}</p>
            </div>

            <span>•</span>
            <p className="lang">{formatLanguage(original_language)}</p>

            <span>•</span>
            <p className="year">{formatYear(release_date)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
