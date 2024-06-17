import React, { useState, useEffect } from 'react'
import './MovieCard.css'

const MovieCard = (props) => {
  return (
    <>
      <div className="MovieCard">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500/${props.cover}`} alt={props.name}/>
        <h3 className="title">{props.name}</h3>
        <p className="rating">Rating: {props.rating}</p>
      </div>
    </>
  )
}

export default MovieCard