import { Link, NavLink, useLocation } from "react-router";
import Btn from './Btn'

export default function Header({ user, onLogOut }) {
    const isLoggedIn = !!user
    // console.log(user);
    const isAdmin = user?.role === 1
    // console.log(isAdmin);

    return (
        <nav className="navbar blurry-light p-1">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <Link to={"/"} className="navbar-brand user-select-none text-decoration-none text-custom-yellow text-uppercase fw-bolder hover ms-3">DNTV</Link>

                {isLoggedIn &&
                    <div className="d-flex">
                        {isAdmin &&
                            <Link to={'/upload'}><Btn btnClass={'btn btn-outline-custom-yellow mx-1'} content={'Upload'} /></Link>
                        }
                        <Btn btnClass={'btn btn-outline-custom-red mx-1'} content={'Log Out'} onClick={onLogOut} />
                    </div>
                }

            </div>
        </nav>
    )
}