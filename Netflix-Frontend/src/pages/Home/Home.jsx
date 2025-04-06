import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import MovieModal from '../../components/TitleCards/MovieModal';

function Home() {
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/Movie/Get";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const response = await fetch(`${API_URL}?title=superman`);
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
      const videoApiUrl = `${import.meta.env.VITE_MOVIE_API}/api/Movie/VideoURL?movieId=${heroMovie.id}`;
      const response = await fetch(videoApiUrl);
      const data = await response.json();
  
      if (data?.url) {
        navigate(`/player/${heroMovie.id}`, { state: { embedUrl: data.url } });
      } else {
        const searchQuery = encodeURIComponent(heroMovie.title + ' official trailer');
        const fallbackVideoId = searchQuery.split('=')[1];
        const fallbackEmbedUrl = `https://www.youtube.com/embed/${fallbackVideoId}`;
        
        navigate(`/player/${heroMovie.id}`, { state: { embedUrl: fallbackEmbedUrl } });
      }
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      const fallbackVideoId = "9KVG_X_7Naw";
      const fallbackEmbedUrl = `https://www.youtube.com/embed/${fallbackVideoId}`;
      navigate(`/player/${heroMovie.id}`, { state: { embedUrl: fallbackEmbedUrl } });
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
          imdbRating: movie.vote_average ? movie.vote_average : "N/A",  // Added fallback for vote_average
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
    <div className='home'>
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
            <TitleCards type={"popular"} />
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} type={"Blockbuster"} />
        <TitleCards title={"Only on Netflix"} type={"popular"} />
        <TitleCards title={"Drama"} type={"drama"} />
        <TitleCards title={"Comedy"} type={"comedy"} />
        <TitleCards title={"Romance"} type={"romance"} />
        <TitleCards title={"Animation"} type={"animation"} />
        <TitleCards title={"Sci-Fi Movies"} type={"sci-fi"} />
      </div>
      <Footer />

      {/* Movie Modal */}
      {movieDetails && <MovieModal movie={movieDetails} onClose={() => setMovieDetails(null)} />}
    </div>
  );
}

export default Home;
