import React, { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(url);
      const data = await response.json();
      
      // console.log("data is:", data);

      // Get the data -> data.results and store in the movies array useState
      setMovies(data.results);
    }
    fetchMovie();
  }, []);
  
  return (
    <div className="MovieList">
      <h2>Movie List</h2>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            cover={movie.poster_path}
            name={movie.original_title}
            rating={movie.vote_average}
          />
        </div>
      ))}     
    </div> 
  )
}

export default MovieList