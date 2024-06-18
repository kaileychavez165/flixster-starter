import React, { useState, useEffect } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import Modal from '../Modal/Modal';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchMovies() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    
    if (searchQuery.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      if (page === 1) {
        setMovies(data.results);
      } 
      
      else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
    } 
    
    else {
      setMovies([]);
    }
  };

  fetchMovies();
}, [page]);

    async function fetchSearchResults() {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;

    if (searchQuery.trim() === "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      if (page === 1) {
        setMovies(data.results);
      } 
      
      else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
    } 
    
    else {
      setMovies([]);
    }
  };

  const handlePageChange = () => {
    setPage(page => page + 1);
  };

  const handleSearchUpdate = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
    fetchSearchResults();
  };

  return (
    <>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchUpdate}
        />
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="MovieList">
        {movies.map((movie, index) => (
          <div className="movie-item" key={index}>
            <MovieCard
            cover={movie.poster_path}
            name={movie.title}
            rating={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
            />
          </div>
        ))}
        <button onClick={handlePageChange}>Load More</button>
      </div>

      {selectedMovie && (
        <Modal
        show={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
        >

        <h2>{selectedMovie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          style={{ width: "100%" }}
        />
      </Modal>
    )}
    </>
  );
};

export default MovieList;