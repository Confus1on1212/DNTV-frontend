import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import HeaderLogo from "./assets/DNTVnobg.png";
import ProfileLogo from "./assets/ProfilePicture.png";
import { Link } from "react-router";



function App() {
  return (
    <div className="app-root">
      <header className="p-2 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center">
            {/* logo */}
            <a href="/" className="d-flex align-items-center text-white text-decoration-none">
              <img src={HeaderLogo} alt="header-logo" width={100} />
              {/* chang logo to samegray + text-success color */}
            </a>

            <ul className="nav nav-underline mx-5">
              {/* movies tab  if active add: active text-success*/}
              <li className="nav-item">
                <a className="nav-link active text-success" aria-current="page" href="#">Movies</a>
              </li>
              {/* shows tab */}
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Shows</a>
              </li>
            </ul>

            {/* search bar and button - disabled if not logged in */}
            {/* <form className="d-flex ms-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button type="button" className="btn btn-outline-light"> Search </button>
            </form> */}

            {/* profile - disabled if not logged in*/}
            {/* <a href="" className="d-flex align-items-center text-white text-decoration-none">
              <img src={ProfileLogo} alt="header-logo" width={40} className="rounded-circle mx-3 img-fluid" />
            </a> */}
            
          {/* log in and sign in button */}
            <div className="d-flex ms-auto">
              <Link to={"/login"}><button type="button" className="btn btn-outline-secondary mx-1">Log in</button></Link>
              <Link to={"/login"}><button type="button" className="btn btn-outline-success mx-1">Sign up</button></Link>
            </div>
          </div> 
          
          
        </div>
      </header>
    </div>
  );
}

export default App;
