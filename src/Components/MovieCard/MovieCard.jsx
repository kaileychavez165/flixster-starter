import React, { useState, useEffect } from 'react';
import './MovieCard.css';

const MovieCard = ({cover, name, rating, onClick}) => {
  return (
    <>
      <div className="MovieCard" onClick={onClick}>
        <img className="poster" src={`https://image.tmdb.org/t/p/w500/${cover}`} alt={name}/>
        <h3 className="title">{name}</h3>
        <p className="rating">Rating: {rating} / 10</p>
      </div>
    </>
  )
}

export default MovieCard;