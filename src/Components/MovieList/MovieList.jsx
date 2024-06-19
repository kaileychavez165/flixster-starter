import React, { useState, useEffect } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import Modal from '../Modal/Modal';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchMovies() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

    if (searchQuery.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
    }

    else if (sortBy !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    console.log("data is: ", data.results);
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
}, [page, sortBy]);

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

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    setPage(1);
  };

  return (
    <>
    <hr className="rounded-divider"></hr>
    <div className="header-content">
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

        <div className="sort-dropdown">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Sort by...</option>
            <option value="vote_average.desc">Sort by rating, descending</option>
            <option value="primary_release_date.desc">Sort by date, descending</option>
            <option value="title.asc">Sort by alphabetical order</option>
          </select>
        </div>
    </div>
    
    <div className="main-page-title"><h2><span className="title-emphasis">—</span> BROWSE MOVIES <span className="title-emphasis">—</span></h2></div>

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
      </div>

      <button className="load-more-button" onClick={handlePageChange}>Load More</button>

      <footer className="footer">
        Lights, Camera, Action!
        <p>© 2024 Flixster, Kailey Chavez</p>
        <div className="links">
          <p><a className="page-links" href="https://www.themoviedb.org/about?language=en-US#:~:text=The%20Movie%20Database%20(TMDB)%20is,we're%20incredibly%20proud%20of.">ABOUT</a></p>
          <p><a className="page-links" href="https://www.linkedin.com/in/kaileychavez165">CONTACT</a></p>
        </div>
      </footer>

      {selectedMovie && (
        <Modal
        show={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
        >

        <h2>{selectedMovie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`}
          alt={selectedMovie.title}
          style={{ width: "100%" }}
        />
        <p><strong className="modal-intros">Release Date: </strong>{selectedMovie.release_date}</p>
        <p><strong className="modal-intros">Overview: </strong>{selectedMovie.overview}</p>
      </Modal>
    )}
    </>
  );
};

export default MovieList;