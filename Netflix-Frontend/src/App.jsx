// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import TVShows from './pages/TVShows/TVShows';
import Player from './pages/Player/Player';
import Loader from './components/Loader/Loader';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import Movie from './pages/Movie/Movie';
import Children from './pages/Children/Children';
import { useKeycloak } from '@react-keycloak/web';

const App = () => (
  <LoadingProvider>
    <AppContent />
  </LoadingProvider>
);

const AppContent = () => {
  const { keycloak, initialized } = useKeycloak();
  const { loading } = useLoading();

  if (!initialized) return <div>Initializing authentication...</div>;

  if (!keycloak) return <div>Keycloak not available.</div>;

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  return (
    <>
      <Loader loading={loading} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/children" element={<Children />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
};

export default App;
