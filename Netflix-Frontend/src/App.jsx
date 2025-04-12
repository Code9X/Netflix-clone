import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import TVShows from './pages/TVShows/TVShows'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/tvshows' element={<TVShows />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/player/:id' element={<Player />}/>
      </Routes>
    </div>
  )
}

export default App