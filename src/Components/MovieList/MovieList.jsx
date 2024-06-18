import React, { useState, useEffect } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;
  
  useEffect(() => {
    async function fetchMovies() {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`; 

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        if (page === 1) {
          setMovies(data.results);
        }
  
        else if (page !== 1) {
          setMovies(prevMovies => [...prevMovies, ...data.results]);
        }
      }
  
      else {
        setMovies([]);
      }
    }
    
    fetchMovies();
  }, [page]);

  /* async function fetchQuery() {
    const response = await fetch(queryUrl);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      if (page === 1) {
        setMovies(data.results);
      }

      else if (page !== 1) {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
    }

    else {
      setMovies([]);
    }
  } */

  useEffect(() => {
    const fetchQuery = async () => {
      if (searchQuery.trim() === "") {
        return; // No need to fetch if search query is empty
      }

      let queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
      const response = await fetch(queryUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results]);
        }
      } else {
        setMovies([]);
      }
    };

    fetchQuery();
  }, [page, searchQuery]);

  /* Filtering
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  <div className="search-box">
      <input type="text" 
      placeholder="Search movies..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} 
      className="search-input"/>
    </div> 
    
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  } 
  */
 
 const handlePageChange = () => {
  setPage(page => page + 1);
 }

 const handleSearchChange = (e) => {
  setPage(1);
  setSearchQuery(e.target.value);
  fetchQuery();
 }

 const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
 );
  
  return (
    <>
    <div className="search-box">
      <input type="text" 
      placeholder="Search movies..." 
      value={searchQuery}
      onChange={handleSearchChange}
      className="search-input"/>
    </div> 

    <div className="MovieList">
      {filteredMovies.map((movie, index) => (
        <MovieCard
          key={index}
          cover={movie.poster_path}
          name={movie.original_title}
          rating={movie.vote_average}
        />
      ))}
      <button onClick={handlePageChange}>Load More</button>
    </div> 
    </>
    
  )
};

export default MovieList