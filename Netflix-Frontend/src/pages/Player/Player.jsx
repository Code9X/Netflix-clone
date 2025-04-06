import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Player.css';

function Player() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { embedUrl } = state || {};
  const { movieId } = useParams();

  if (!embedUrl) {
    return <p className="no-trailer">No trailer available.</p>;
  }

  return (
    <div className="player-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <iframe
        className="video-frame"
        src={embedUrl}
        title={`Movie Trailer ${movieId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Player;
