import React, { useEffect, useRef } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Close modal on Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Adding event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);
  console.log("first_air_date:", movie.first_air_date);
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-btn" onClick={onClose} title="Close">×</button>
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title || "Movie Poster"} className="modal-poster" />
        ) : (
          <p>No Image Available</p>
        )}
        <h2>{movie.title || "Title not available"} ({movie.first_air_date || "N/A"})</h2>
        <p><strong>Genre:</strong> {movie.genres || "N/A"}</p>
        <p><strong>Plot:</strong> {movie.plot || "N/A"}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}</p>
        <p><strong>Seasons:</strong> {movie.seasons || "N/A"}</p>
        <p><strong>Episodes:</strong> {movie.episodes || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieModal;