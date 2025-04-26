import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Player.css';
import Loader from '../../components/Loader/Loader'; // Import the Loader component

function Player() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { embedUrl } = state || {};
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (embedUrl) {
      // Simulate loading for the video
      setLoading(false);
    }
  }, [embedUrl]);

  if (!embedUrl) {
    return <p className="no-trailer">No trailer available.</p>;
  }

  return (
    <div className="player-wrapper">
      <Loader loading={loading} /> {/* Add the loader component here */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <iframe
        className="video-frame"
        src={embedUrl}
        title={`Movie Trailer ${movieId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoading(false)} // Hide the loader once the iframe is loaded
      ></iframe>
    </div>
  );
}

export default Player;
