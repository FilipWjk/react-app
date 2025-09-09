import React from 'react';

const Search = ({ searchTerm, setSearchTerm, placeholder = 'Search through movies' }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    // ? Allow users to clear search with Escape key
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  };

  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="Search icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search movies"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
