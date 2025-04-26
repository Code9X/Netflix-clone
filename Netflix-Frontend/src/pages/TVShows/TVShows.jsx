import React, { useState, useEffect } from 'react';
import './TVShows.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import MovieModal from '../../components/TitleCards/MovieModal';
import Loader from '../../components/Loader/Loader';

function TVShows() {
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/TV";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/GET?Id=1396`);
        const data = await response.json();
        console.log("API Response:", data);

        if (data?.id) {
          setHeroMovie(data);
        } else {
          console.error("Invalid data format for hero movie.");
        }
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroMovie();
  }, []);

  const handlePlayClick = async () => {
    if (!heroMovie?.id) return;

    setLoading(true);
    try {
      const videoApiUrl = `${import.meta.env.VITE_MOVIE_API}/api/Get/VideoURL?movieId=${heroMovie.id}&category=tvshows`;
      const response = await fetch(videoApiUrl);
      const embedUrl = await response.text();

      const url = embedUrl.startsWith("https://www.youtube.com/embed/") 
        ? embedUrl 
        : "https://www.youtube.com/embed/T6DJcgm3wNY";

      navigate(`/player/${heroMovie.id}`, { state: { embedUrl: url } });
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
    if (!heroMovie?.id) return;

    // Handle genres properly
    const genres = heroMovie?.genres?.length > 0 
      ? heroMovie.genres.map(g => g.name).join(", ")
      : "N/A";
    
    setMovieDetails({
      title: heroMovie.name || heroMovie.original_title,
      year: heroMovie.first_air_date?.split("-")[0] || "Unknown",
      plot: heroMovie.overview,
      poster: heroMovie.backdrop_path ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}` : "",
      imdbRating: heroMovie.vote_average || "N/A",
      seasons: heroMovie.number_of_seasons || 0,
      episodes: heroMovie.number_of_episodes || 0,
      genres: genres,
    });
  };

  return (
    <div className='TVShows'>
      <Navbar />
      <Loader loading={loading} />
      {heroMovie && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt="Hero Banner"
            className='banner-img'
          />
          <div className="hero-caption">
            <h1 className="caption-title">{heroMovie.name}</h1>
            <p>{heroMovie.overview}</p>
            <div className="hero-btns">
              <button className='btn' onClick={handlePlayClick} disabled={loading}>
                {loading ? "Loading..." : <><img src={play_icon} alt="" />Play</>}
              </button>
              <button className='btn dark-btn' onClick={handleMoreInfoClick} disabled={loading}>
                <img src={info_icon} alt="" />More Info
              </button>
            </div>
            <TitleCards category={"tvshows"} type={"popular"} />
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards category={"tvshows"} title={"Top Rated"} type={"top_rated"} />``
        <TitleCards category={"tvshows"} title={"Airing Today"} type={"airing_today"} />
        <TitleCards category={"tvshows"} title={"On The Air"} type={"on_the_air"} />
        <TitleCards category={"tvshows"} title={"Action"} type={"airing_today"} />
      </div>

      <Footer />
      {movieDetails && (
        <MovieModal movie={movieDetails} onClose={() => setMovieDetails(null)} />
      )}
    </div>
  );
}

export default TVShows;
