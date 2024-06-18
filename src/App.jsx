import React from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import MovieList from './Components/MovieList/MovieList'
import './assets/fonts.css'

const App = () => {
  return (
    <div className="App">
      <h1 className="app-header">Flixster</h1>
      <MovieList/>
    </div> 
  )
}

export default App
