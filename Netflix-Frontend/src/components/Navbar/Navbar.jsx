import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function Navbar() {

  const navRef = useRef(null);
  const { keycloak } = useKeycloak();

  useEffect(()=>{
    window. addEventListener('scroll', ()=>{
      if(window. scrollY >= 80){
        navRef. current. classList. add('nav-dark')
      }else{
        navRef. current. classList. remove('nav-dark')
      }    
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tvshows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <li><Link to="/children">Children</Link></li>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
          <li className="username">Hello {keycloak.tokenParsed?.preferred_username}!</li>
          <li className="signout" onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>
            Sign out
          </li>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar