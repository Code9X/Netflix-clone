import React,{useEffect, useState } from 'react'
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../Constants/constants'
import './RowPost.css'
import YouTube from 'react-youtube'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')

    useEffect(() => {
    axios.get(props.url).then((response)=>{
        console.log(response.data);
        setMovies(response.data.results)
    })
    }, [])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
        autoplay: 1,
        },
    };

    const handleMovieClick=(id)=>{
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
            }else{
                console.log('Trailer not available');
            }
        })
    }
    

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                    <img   onClick={()=>handleMovieClick(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='Poster Loading..'/>
                    
                    )}
            </div>
            
{urlId &&   <YouTube videoId={urlId.key} opts={opts} />     }
        </div>

    )
}

export default RowPost        
