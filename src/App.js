import NavBar from "./Components/NavBar/NavBar";
import {originals,trending,action,horrorMovies,comedyMovies,romanceMovies,documentaries} from './urls'
import './App.css'
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {

    return (
        <div className="App">
            <NavBar />
            <Banner />
            <RowPost title='Trending Now !'                url={trending}/>
            <RowPost title='Netflix Originals' isSmall    url={originals}/>
            <RowPost title='Action'            isSmall    url={action}/>
            <RowPost title='Horror Movies'     isSmall    url={horrorMovies}/>
            <RowPost title='Comedy Movies'     isSmall    url={comedyMovies}/>
            <RowPost title='Romance Movies'    isSmall    url={romanceMovies}/>
            <RowPost title='Documentaries'     isSmall    url={documentaries}/>
        </div>
    )
}

export default App;