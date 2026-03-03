import { Link } from "react-router";
import { useEffect, useState } from "react";
import Btn from './components/Btn'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './scss/main.scss'
import './style/main.css'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return(
        <nav className="navbar blurry-light p-1">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <Link to={"/"} className="navbar-brand user-select-none text-decoration-none text-custom-yellow text-uppercase fw-bolder hover ms-3">DNTV</Link>

                {isLoggedIn && 
                <div className="navbar-nav nav-underline flex-row align-items-center overflow-x-auto">
                    <a className="nav-link text-custom-yellow user-select-none active" href="/">Home</a>
                    <a className="nav-link text-custom-blue user-select-none" href="#">Movies</a>
                    <a className="nav-link text-custom-blue user-select-none" href="#">Shows</a>
                </div>}

                {!isLoggedIn &&
                <div className="d-flex">
                    <Link to={"/login"}><Btn btnClass={'btn btn-outline-custom-green mx-1'} content={'Log In'}/></Link>
                    <Link to={"/signup"}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Sign Up'}/></Link>
                </div>}
            </div>
        </nav>
    )
}