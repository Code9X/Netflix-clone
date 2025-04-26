import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import TVShows from './pages/TVShows/TVShows';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import Loader from './components/Loader/Loader';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import Movie from './pages/Movie/Movie';
import Children from './pages/Children/Children';

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

const AppContent = () => {
  const { loading } = useLoading(); // Get loading state from context

  return (
    <div>
      <Loader loading={loading} /> {/* Pass loading state to Loader */}
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tvshows' element={<TVShows />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/children' element={<Children />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
