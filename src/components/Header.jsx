import { Link, NavLink, useLocation } from "react-router";
import Btn from './Btn'

export default function Header({user, onLogOut}) {
    const isLoggedIn = !!user
    // console.log(user);
    const isAdmin = user?.role === 1
    // console.log(isAdmin);

    const location = useLocation();

    const onAdminPage = location.pathname.startsWith('/admin');

    return(
        <nav className="navbar blurry-light p-1">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <Link to={"/"} className="navbar-brand user-select-none text-decoration-none text-custom-yellow text-uppercase fw-bolder hover ms-3">DNTV</Link>

                
                    {isLoggedIn && !onAdminPage && (
                        <div className="navbar-nav nav-underline flex-row align-items-center overflow-x-auto">
                            <NavLink className="nav-link text-custom-yellow user-select-none active" to="/">Home</NavLink>
                            <NavLink className="nav-link text-custom-blue user-select-none" to="/movies">Movies</NavLink>
                            <NavLink className="nav-link text-custom-blue user-select-none" to="/shows">Shows</NavLink>
                        </div>
                    )}

                    {/* B. Admin nézet (bejelentkezve, admin ÉS az admin oldalon) */}
                    {isLoggedIn && isAdmin && onAdminPage && (
                        <div className="navbar-nav nav-underline flex-row align-items-center overflow-x-auto">
                            <NavLink className="nav-link text-custom-yellow user-select-none active" to="/admin/users">Users</NavLink>
                            <NavLink className="nav-link text-custom-blue user-select-none" to="/admin/movies">Movies</NavLink>
                            <NavLink className="nav-link text-custom-blue user-select-none" to="/admin/shows">Shows</NavLink>
                        <Link to={"/upload"}><Btn btnClass={'btn btn-outline-custom-red mx-1'} content={'Upload'}/></Link>
                    </div>)}

                {!isLoggedIn &&
                    <div className="d-flex">
                        <Link to={"/login"}><Btn btnClass={'btn btn-outline-custom-red mx-1'} content={'Log In'}/></Link>
                        <Link to={"/signup"}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Sign Up'}/></Link>
                    </div>}

                {isLoggedIn &&
                    <div className="d-flex">
                        {isAdmin &&
                            <Link to={'/admin'}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Admin'}/></Link>
                        }
                        <Btn btnClass={'btn btn-outline-custom-red mx-1'} content={'Log Out'} onClick={onLogOut} />
                    </div>
                }
                
            </div>
        </nav>
    )
}