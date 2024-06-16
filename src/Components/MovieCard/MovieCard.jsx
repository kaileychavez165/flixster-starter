import React, { useState, useEffect } from 'react'
import './MovieCard.css'

const MovieCard = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  const [movieCards, setMovieCards] = useState([]);
  
  useEffect(() => {
    async function fetchMovieCard() {
      const resp = await fetch(url);
      const info = await resp.json();
      
      console.log("data is:", info);

      // Get the data -> data.results and store in the movies array useState
      setMovieCards(info.results);
    }
    fetchMovieCard();
  }, []);

  return (
    <div className="MovieCard">
      <img className="poster" src={`https://image.tmdb.org/t/p/w500/${props.cover}`} alt={props.name}/>
      <h3 className="title">{props.name}</h3>
      <p className="rating">{props.rating}</p>
    </div>
  )
}

export default MovieCard