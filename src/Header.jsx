import { Link } from "react-router";
import { useEffect, useState } from "react";
import Btn from './components/Btn'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './style/main.css'

export default function Header({user, onLogOut}) {
    const isLoggedIn = !!user
    console.log(user);
    const isAdmin = user?.role === 1
    console.log(isAdmin);

    return(
        <nav className="navbar blurry-light p-1">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <Link to={"/"} className="navbar-brand user-select-none text-decoration-none text-custom-yellow text-uppercase fw-bolder hover ms-3">DNTV</Link>

                {isLoggedIn && 
                <div className="navbar-nav nav-underline flex-row align-items-center overflow-x-auto">
                    <Link className="nav-link text-custom-yellow user-select-none active">Home</Link>
                    <Link className="nav-link text-custom-blue user-select-none">Movies</Link>
                    <Link className="nav-link text-custom-blue user-select-none">Shows</Link>
                </div>}

                {!isLoggedIn &&
                <div className="d-flex">
                    <Link to={"/login"}><Btn btnClass={'btn btn-outline-custom-green mx-1'} content={'Log In'}/></Link>
                    <Link to={"/signup"}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Sign Up'}/></Link>
                </div>}

                {isLoggedIn &&
                    <div className="d-flex">
                        {isAdmin &&
                            <Link to={'/upload'}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Upload'}/></Link>
                        }
                        <Link><Btn btnClass={'btn btn-outline-custom-red mx-1'} content={'Log Out'} onClick={onLogOut} /></Link>
                    </div>
                }
                
            </div>
        </nav>
    )
}