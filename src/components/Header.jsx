import React from 'react';
import Search from './Search.jsx';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header>
      <img src="/hero.png" alt="Movie Discovery Hero Banner" />
      <h1 className="text-3xl">
        Find <span className="text-gradient">Movies</span> You'll Enjoy!
      </h1>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for your favorite movies..."
      />
    </header>
  );
};

export default Header;
