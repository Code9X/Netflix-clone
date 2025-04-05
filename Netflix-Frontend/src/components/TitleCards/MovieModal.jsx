import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-btn" onClick={onClose} title="Close">×</button>
        {movie.poster || movie.Poster ? (
          <img src={movie.poster || movie.Poster} alt={movie.title || "Movie Poster"} className="modal-poster" />
        ) : (
          <p>No Image Available</p>
        )}
        <h2>{movie.title || "Title not available"} ({movie.year || "N/A"})</h2>
        <p><strong>Genre:</strong> {movie.genre || "N/A"}</p>
        <p><strong>Plot:</strong> {movie.plot || "N/A"}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieModal;
