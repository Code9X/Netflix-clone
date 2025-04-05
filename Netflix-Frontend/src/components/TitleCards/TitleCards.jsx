import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleCards.css';
import staticMovies from '../../assets/cards/Cards_data';

function TitleCards({ title, movieName, category = null }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [useStatic, setUseStatic] = useState(false);
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/Movie/Get";
  const listRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const loadMovies = async (pageNumber) => {
    if (!API_URL) {
      setMovies(staticMovies);
      setUseStatic(true);
      return;
    }

    setLoading(true);
    try {
      let url = `${API_URL}?title=${encodeURIComponent(movieName)}&page=${pageNumber}`;
      
      if (category) {
        url += `&type=${encodeURIComponent(category)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data?.search?.length > 0) {
        const mappedMovies = data.search.map(movie => ({
          image: movie.poster,
          name: movie.title,
          imdbID: movie.imdbID, // Store IMDb ID for navigation
        }));
        setMovies(prevMovies => [...prevMovies, ...mappedMovies]);
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
    loadMovies(1);
  }, [movieName]);

  useEffect(() => {
    if (page > 1 && !useStatic) {
      loadMovies(page);
    }
  }, [page]);

  const handleCardClick = (imdbID) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${imdbID}+official+trailer`;
    window.open(youtubeSearchUrl, '_blank');
  };

  // Infinite Scroll Logic
  const lastMovieRef = useCallback((node) => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={listRef}>
        {movies.map((movie, index) => (
          <div 
            className='card' 
            key={index} 
            onClick={() => handleCardClick(movie.imdbID)}
            ref={index === movies.length - 1 ? lastMovieRef : null} // Set last item ref
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