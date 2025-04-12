import React, { useState, useEffect } from 'react';
import './TVShows.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import MovieModal from '../../components/TitleCards/MovieModal';

function TVShows() {
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/TV/Get";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const response = await fetch(`${API_URL}?title=breaking bad`);
        const data = await response.json();
        if (data?.results?.length > 0) {
          setHeroMovie(data.results[0]);
        }
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      }
    };
    fetchHeroMovie();
  }, []);

  const handlePlayClick = async () => {
    if (!heroMovie?.id) {
      console.warn("Movie ID not found");
      return;
    }
  
    setLoading(true);
    try {
      const videoApiUrl = `${import.meta.env.VITE_MOVIE_API}/api/Get/VideoURL?movieId=${heroMovie.id}`;
      const response = await fetch(videoApiUrl);
      const embedUrl = await response.text();
  
      if (embedUrl && embedUrl.startsWith("https://www.youtube.com/embed/")) {
        navigate(`/player/${heroMovie.id}`, { state: { embedUrl } });
      } else {
        navigate(`/player/${heroMovie.id}`, {
          state: { embedUrl: "https://www.youtube.com/embed/T6DJcgm3wNY" },
        });
      }
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      navigate(`/player/${heroMovie.id}`, {
        state: { embedUrl: "https://www.youtube.com/embed/T6DJcgm3wNY" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMoreInfoClick = async () => {
    if (!heroMovie) return;
  
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?title=${encodeURIComponent(heroMovie.title)}`);
      const data = await response.json();
  
      if (data?.results?.length > 0) {
        const movie = data.results[0];
        setMovieDetails({
          title: movie.title,
          year: movie.release_date?.split("-")[0],
          plot: movie.overview,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
          imdbRating: movie.vote_average ? movie.vote_average : "N/A",
        });
      } else {
        console.error("No movie found");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className='TVShows'>
      <Navbar />
      {heroMovie && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt="Hero Banner"
            className='banner-img'
          />
          <div className="hero-caption">
            <h1 className="caption-title">{heroMovie.title}</h1>
            <p>{heroMovie.overview}</p>
            <div className="hero-btns">
              <button className='btn' onClick={handlePlayClick}>
                {loading ? "Loading..." : <><img src={play_icon} alt="" />Play</>}
              </button>
              <button className='btn dark-btn' onClick={handleMoreInfoClick}>
                <img src={info_icon} alt="" />More Info
              </button>
            </div>
            <TitleCards category={"tvshows"} type={"popular"} />
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards category={"tvshows"} title={"Drama"} type={"drama"} />
        <TitleCards category={"tvshows"} title={"Top Rated"} type={"top_rated"} />
        <TitleCards category={"tvshows"} title={"Action"} type={"action"} />
        <TitleCards category={"tvshows"} title={"Family"} type={"family"} />
        <TitleCards category={"tvshows"} title={"Reality"} type={"reality"} />
        <TitleCards category={"tvshows"} title={"Mystery"} type={"mystery"} />
        <TitleCards category={"tvshows"} title={"Documentary"} type={"documentary"} />
        <TitleCards category={"tvshows"} title={"Sci-Fi Series"} type={"sci-fi"} />
      </div>
      <Footer />

      {/* Movie Modal */}
      {movieDetails && <MovieModal movie={movieDetails} onClose={() => setMovieDetails(null)} />}
    </div>
  );
}

export default TVShows;
