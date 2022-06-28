import { useEffect, useState } from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../Constants/constants'
import './Banner.css'



function Banner() {
    const [movie, setMovie] = useState()
    
    useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
    console.log(response.data);
    setMovie(response.data.results[5]);
        })
    }, [])

    
    return (
        <div 
        style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path : ""})`}}
        className='Banner'>
            <div className='content'>
                <h1 className='title'> {movie ? movie.original_name || movie.original_title : ""} </h1>
                <div className='banner_buttons'>
                    <button className='button1'>▶Play</button>
                    <button className='button2'>➕ My List</button>
                </div>
                <h1 className='description'>{movie ? movie.overview : ""}</h1>
            </div>
            <div className="fade_banner"></div>
        </div >
    )
}

export default Banner

/*
*in banner, we are automating using useEffect

*IN useEffect, 
    axios.get('trending/all/week?api_key={API_KEY_HERE}&language=en-US')
we changed it into,
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
to console the output we use,
    .then((response)=>{
    console.log(response.data);
})
    nb:Back tick (`) is provide to make it as string
    
*IN useState we changed return,
    *title :{movie.title} changed into {movie ? movie.title : ""}
                                            [Turnery Operator]
    Reason!
    here "movie" object will get data from axios call and it will take some time to fetch the data that means on initial render "title" will not be there. So you have to put some check and access that key only when it is available.
    *style,
            style={{backgroundImage:movie? movie.backdrop_path : ""}}
    changed-style={{backgroundImage:`${movie? movie.backdrop_path : ""}`}} 
    changed-style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path : ""})`}}
*/