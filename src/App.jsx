import React from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import MovieList from './Components/MovieList/MovieList'

const App = () => {
  return (
    <div className="App">
      <h1>Flixster</h1>
      <MovieList/>
    </div> 
  )
}

export default App
