import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import MovieModal from '../../components/TitleCards/MovieModal';

function Home() {
  const API_URL = import.meta.env.VITE_MOVIE_API + "/api/Movie/Get";
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const hardcodedTitle = "The Protector";

  const handlePlayClick = async () => {
    if (!API_URL) {
      console.error("API URL is not set");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?title=${encodeURIComponent(hardcodedTitle)}`);
      const data = await response.json();

      if (data?.search?.length > 0) {
        const imdbID = data.search[0].imdbID;
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${imdbID}+official+trailer`;
        window.open(youtubeSearchUrl, '_blank');
      } else {
        console.error("No movie found");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoreInfoClick = async () => {
    if (!API_URL) {
      console.error("API URL is not set");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?title=${encodeURIComponent(hardcodedTitle)}`);
      const data = await response.json();

      if (data?.search?.length > 0) {
        const movie = data.search[0];
        setMovieDetails({
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          plot: movie.plot,
          poster: movie.poster,
          imdbRating: movie.imdbRating,
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
      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern 
            Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn' onClick={handlePlayClick}>
              {loading ? "Loading..." : <><img src={play_icon} alt=""/>Play</>}
            </button>
            <button className='btn dark-btn' onClick={handleMoreInfoClick}>
              <img src={info_icon} alt="" />More Info
            </button>
          </div>
          <TitleCards movieName={"game"} category={"series"} />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} movieName={"War"} />
        <TitleCards title={"Only on Netflix"} movieName={"Toy"} />
        <TitleCards title={"Upcoming"} movieName={"Super"} />
        <TitleCards title={"Top Picks for You"} movieName={"Amazing"} />
      </div>
      <Footer />
      
      {/* Movie Modal */}
      {movieDetails && <MovieModal movie={movieDetails} onClose={() => setMovieDetails(null)} />}
    </div>
  );
}

export default Home;
