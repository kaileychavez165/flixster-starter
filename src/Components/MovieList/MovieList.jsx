import React, { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const apiKey = import.meta.env.VITE_API_KEY;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
  
  useEffect(() => {
    async function fetchMovie() {
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
    fetchMovie();
  }, [page]);

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
 const updatePage = () => {
  setPage(page => page + 1)
 }
  
  return (
    <>
    <div className="MovieList">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          cover={movie.poster_path}
          name={movie.original_title}
          rating={movie.vote_average}
        />
      ))}
      <button onClick={updatePage}>Load More</button>
    </div> 
    </>
    
  )
};

export default MovieList