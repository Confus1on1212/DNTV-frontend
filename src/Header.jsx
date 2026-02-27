import { Link } from "react-router";
import { useEffect, useState } from "react";

import "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function Header() {
    return(
        <nav className="navbar text-bg-dark p-1">
            <div className="container-lg d-flex align-items-center justify-content-between">
                <Link to={"/"} className="navbar-brand user-select-none text-decoration-none text-secondary text-uppercase fw-bolder ">
                    DNTV
                </Link>

                <div className="navbar-nav nav-underline flex-row overflow-x-auto">
                    <a className="nav-link text-success user-select-none active" href="/">Home</a>
                    <a className="nav-link text-secondary user-select-none" href="#">Movies</a>
                    <a className="nav-link text-secondary user-select-none" href="#">Shows</a>
                </div>

                <div className="d-flex">
                    <Link to={"/login"}><button type="button" className="btn btn-outline-secondary mx-1">Log in</button></Link>
                    <Link to={"/signup"}><button type="button" className="btn btn-outline-success mx-1">Sign up</button></Link>
                </div>
            </div>
        </nav>
    )
}