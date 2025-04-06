import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleCards.css';
import staticMovies from '../../assets/cards/Cards_data';

const fetchCache = new Map();

function TitleCards({ title, type = null }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [useStatic, setUseStatic] = useState(false);
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/Movie/Get";
  const listRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const normalizedType = type?.toLowerCase().trim() ?? 'popular';
  const getCacheKey = (type, page) => `${type}_${page}`;

  const loadMovies = async (pageNumber) => {
    if (!API_URL || useStatic) {
      setMovies(staticMovies);
      setUseStatic(true);
      return;
    }

    const cacheKey = getCacheKey(normalizedType, pageNumber);
    if (fetchCache.has(cacheKey)) return;

    setLoading(true);
    try {
      let url = `${API_URL}?page=${pageNumber}`;
      if (type) url += `&type=${encodeURIComponent(normalizedType)}`;

      const response = await fetch(url);
      const data = await response.json(); // ✅ JSON for movie list

      if (data?.results?.length > 0) {
        const mappedMovies = data.results
          .filter(movie => movie.poster_path)
          .map(movie => ({
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            name: movie.title,
            imdbID: movie.id,
            id: movie.id,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
            overview: movie.overview
          }));

        setMovies(prev => {
          const ids = new Set(prev.map(m => m.imdbID));
          const newMovies = mappedMovies.filter(m => !ids.has(m.imdbID));
          return [...prev, ...newMovies];
        });

        fetchCache.set(cacheKey, true);
      } else if (pageNumber === 1) {
        setMovies(staticMovies);
        setUseStatic(true);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies(staticMovies);
      setUseStatic(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchCache.clear();
    loadMovies(1);
  }, [normalizedType]);

  useEffect(() => {
    if (page > 1 && !useStatic) {
      loadMovies(page);
    }
  }, [page]);

  const handleCardClick = async (movieId) => {
    try {
      const videoApiUrl = `${import.meta.env.VITE_MOVIE_API}/api/Movie/VideoURL?movieId=${movieId}`;
      const response = await fetch(videoApiUrl);
      const embedUrl = await response.text(); // ✅ Plain text for video URL

      if (!embedUrl) {
        alert("No trailer found.");
        return;
      }

      const match = embedUrl.match(/embed\/([^?&]+)/);
      const videoId = match ? match[1] : null;

      if (videoId) {
        navigate(`/player/${movieId}`, { state: { embedUrl } });
      } else {
        alert("Invalid video URL.");
      }
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      alert("Failed to load trailer.");
    }
  };

  const lastMovieRef = useCallback((node) => {
    if (loading || useStatic) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, useStatic]);

  if (movies.length === 0) return null;

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular Movies'}</h2>
      <div className="card-list" ref={listRef}>
        {movies.map((movie, index) => (
          <div
            className='card'
            key={movie.imdbID}
            onClick={() => handleCardClick(movie.id)}
            ref={index === movies.length - 1 ? lastMovieRef : null}
          >
            <img src={movie.image} alt={movie.name} />
          </div>
        ))}
      </div>
      {loading && <p>Loading more...</p>}
    </div>
  );
}

export default TitleCards;
