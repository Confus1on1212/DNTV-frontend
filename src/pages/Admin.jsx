import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from "../components/AdminHeader.jsx";
import { whoami, logout } from "../api/user.js";
import { getAllUsers } from '../api/admin.js'
import { getAllMovies, getAllShows } from '../api/videos.js'

import Btn from '../components/Btn.jsx'

export default function Admin() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])

    const isAdmin = user?.role === 1;
    const [dirtyRows, setDirtyRows] = useState({});

    const handleChange = (index, field, value) => {
        const updatedUsers = [...allUsers];
        const user = updatedUsers[index];
        user[field] = value;
        setAllUsers(updatedUsers);
        setDirtyRows(prev => ({
            ...prev,
            [user.user_id]: true
        }));
    };

    const handleChangeForMovies = (index, field, value) => {
        const updatedMovies = [...movies];
        const movie = updatedMovies[index];
        movie[field] = value;
        setMovies(updatedMovies);
        setDirtyRows(prev => ({
            ...prev,
            [movie.movieid]: true
        }));
    };
    const handleChangeForShows = (index, field, value) => {
        const updatedShows = [...shows];
        const show = updatedShows[index];
        show[field] = value;
        setShows(updatedShows);
        setDirtyRows(prev => ({
            ...prev,
            [show.showid]: true
        }));
    };
    const handleSave = async () => {
        const changedUsers = allUsers.filter(user => dirtyRows[user.user_id]);
        if (changedUsers.length === 0) {
            toast.info("Nincs mit menteni!");
            return;
        }

        try {
            await fetch("/admin/bulk-update-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(changedUsers)
            });

            setDirtyRows({});
            const data = await getAllUsers();

            if (data.error) {
                toast.error(data.error);
            } else {
                setAllUsers(data);
                toast.success("Felhasználók sikeresen mentve!");
            }
        } catch (err) {
            toast.error("Mentési hiba.");
        }
    };
    const handleSaveForMovies = async () => {
        const changedMovies = movies.filter(movie => dirtyRows[movie.movieid]);
        if (changedMovies.length === 0) {
            toast.info("Nincs mint menteni.");
            return;
        }

        try {
            await fetch("/admin/bulk-update-movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(changedMovies)
            });

            setDirtyRows({});
            const data = await getAllUsers();

            if (data.error) {
                toast.error(data.error);
            } else {
                setAllUsers(data);
                toast.success("Filmek sikeresen frissítve!");
            }
        } catch (err) {
            toast.error("Hiba mentés közben");
        }
    };
    const handleSaveForShows = async () => {
        const changedShows = shows.filter(show => dirtyRows[show.showid]);
        if (changedShows.length === 0) {
            toast.info("Nincsen mit menteni!");
            return;
        }

        try {
            await fetch("/admin/bulk-update-shows", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(changedShows)
            });

            setDirtyRows({});
            const data = await getAllUsers();

            if (data.error) {
                toast.error(data.error);
            } else {
                setAllUsers(data);
                toast.success("Show sikeresen frissítve!");
            }
        } catch (err) {
            toast.error("Hiba mentés közben");
        }
    };
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Biztosan ki akarod törölni ezt a felhasználót?")) return;

        try {
            const res = await fetch(`/admin/delete-user/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                setAllUsers(prev => prev.filter(u => u.user_id !== id));
                toast.success("Felhasználó törölve!");
            }
        } catch (err) {
            toast.error("Törlés sikertelen.");
        }
    };
    const handleDeleteMovie = async (id) => {
        if (!window.confirm("Biztos ki akarod törölni ezt a filmet?")) return;

        try {
            const res = await fetch(`/admin/delete-movie/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                setMovies(prev => prev.filter(m => m.movieid !== id));
                toast.success("Film törölve!");
            }
        } catch (err) {
            toast.error("Törlés sikertelen!");
        }
    };
    const handleDeleteShow = async (id) => {
        if (!window.confirm("Biztos ki akarod törölni ezt a show-t?")) return;

        try {
            const res = await fetch(`/admin/delete-show/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                setShows(prev => prev.filter(s => s.showid !== id));
                toast.success("Show kitörölve!");
            }
        } catch (err) {
            toast.error("Törlés sikertelen!");
        }
    };

    useEffect(() => {
        async function checkSession() {
            try {
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);
                    if (data.role !== 1) {
                        toast.error("Nincsen engedélyed ezt az oldalt megnézni!", {
                            onClose: () => navigate('/')
                        });
                    }
                } else {
                    toast.error("Nem vagy bejelentkezve!", {
                        onClose: () => navigate('/')
                    });
                }
            } catch (err) {
                console.error("auth csekk fail", err);
                toast.error("Hiba autentikáció során!.", {
                    onClose: () => navigate('/')
                });
            }
        }

        async function fetchData() {
            try {
                const [usersData, moviesData, showsData] = await Promise.all([
                    getAllUsers(),
                    getAllMovies(),
                    getAllShows()
                ]);
                console.log(Object.keys(showsData[0]));
                //console.log(`${moviesData}`)
                setAllUsers(usersData.error ? [] : usersData);
                setMovies(moviesData.error ? [] : moviesData);
                setShows(showsData.error ? [] : showsData);

                if (usersData.error) toast.error(usersData.error);
                if (moviesData.error) toast.error(moviesData.error);
                if (showsData.error) toast.error(showsData.error);

            } catch (err) {
                toast.error('Nem sikerült fetchelni a data-t.');
            }
        }

        checkSession().then(() => {
            if (user?.role === 1 || (user === null && window.location.pathname.includes('admin'))) {
                fetchData();
            }
        });
    }, [navigate, user?.role]);

    async function onLogout() {
        try {
            await logout();
            toast.success("Sikeresen kijelentkezve!");
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error("Hiba kijelentkezés során");
        }
    }

    if (!user) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            </div>
        );
    }

    return (
        <div className="min-vh-100">
            <AdminHeader user={user} onLogOut={onLogout} />

            {isAdmin && (
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="p-4 p-md-5 blurry-light rounded shadow-lg text-white">
                                <h1 className="text-custom-yellow fw-bold text-uppercase text-center mb-4">Admin Dashboard</h1>

                                <h2 className="text-custom-yellow fw-bold small text-uppercase mt-4 mb-3">User Management</h2>
                                <div className="table-responsive">
                                    <table className="table table-light table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Művelet</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers.map((u, index) => (
                                                <tr key={u.user_id} style={dirtyRows[u.user_id] ? { borderLeft: '3px solid orange' } : {}}>
                                                    <td>{u.user_id}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={u.username}
                                                            onChange={(e) => handleChange(index, "username", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={u.email}
                                                            onChange={(e) => handleChange(index, "email", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select bg-transparent border-secondary"
                                                            value={u.role}
                                                            onChange={(e) => handleChange(index, "role", Number(e.target.value))}
                                                        >
                                                            <option value={0}>User</option>
                                                            <option value={1}>Admin</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteUser(u.user_id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-grid mt-4">
                                    <Btn btnClass={"btn btn-custom-yellow py-2 fw-bold"} content={"SAVE USER CHANGES"} onClick={handleSave} disabled={Object.keys(dirtyRows).length === 0} />
                                </div>



                                <h2 className="text-custom-yellow fw-bold small text-uppercase mt-4 mb-3">Movie Management</h2>
                                <div className="table-responsive">
                                    <table className="table table-light table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Studio</th>
                                                <th>Imdb rating</th>
                                                <th>Pg rating</th>
                                                <th>Quality</th>
                                                <th>Művelet</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {movies.map((m, index) => (
                                                <tr key={m.movieid} style={dirtyRows[m.movieid] ? { borderLeft: '3px solid orange' } : {}}>
                                                    <td>{m.movieid}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.title}
                                                            onChange={(e) => handleChangeForMovies(index, "title", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.description}
                                                            onChange={(e) => handleChangeForMovies(index, "description", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.studio}
                                                            onChange={(e) => handleChangeForMovies(index, "studio", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.imdbrating}
                                                            onChange={(e) => handleChangeForMovies(index, "imdbrating", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.pgrating}
                                                            onChange={(e) => handleChangeForMovies(index, "pgrating", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={m.quality}
                                                            onChange={(e) => handleChangeForMovies(index, "quality", e.target.value)}
                                                        />
                                                    </td>
                                                <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteMovie(m.movieid)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-grid mt-4">
                                    <Btn btnClass={"btn btn-custom-yellow py-2 fw-bold"} content={"SAVE MOVIE CHANGES"} onClick={handleSaveForMovies} disabled={Object.keys(dirtyRows).length === 0} />
                                </div>






                                {/*██████████████████████████████████████████████████████████████████████████████innentolshow cuuuucucu█████████████████████████████████████████████*/}


                                <h2 className="text-custom-yellow fw-bold small text-uppercase mt-4 mb-3">Show Management</h2>
                                <div className="table-responsive">
                                    <table className="table table-light table-hover align-middle">
                                        {/*'showid', 'title', 'description', 'studio', 'imdbrating', 'pgrating', 'quality']*/}
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Studio</th>
                                                <th>Imdb rating</th>
                                                <th>Pg rating</th>
                                                <th>Quality</th>
                                                <th>Művelet</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {shows.map((s, index) => (
                                                <tr key={s.showid} style={dirtyRows[s.showid] ? { borderLeft: '3px solid orange' } : {}}>
                                                    <td>{s.showid}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.title}
                                                            onChange={(e) => handleChangeForShows(index, "title", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.description}
                                                            onChange={(e) => handleChangeForShows(index, "description", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.studio}
                                                            onChange={(e) => handleChangeForShows(index, "studio", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.imdbrating}
                                                            onChange={(e) => handleChangeForShows(index, "imdbrating", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.pgrating}
                                                            onChange={(e) => handleChangeForShows(index, "pgrating", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-transparent border-secondary"
                                                            value={s.quality}
                                                            onChange={(e) => handleChangeForShows(index, "quality", e.target.value)}
                                                        />
                                                    </td>
                                                <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteShow(s.showid)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-grid mt-4">
                                    <Btn btnClass={"btn btn-custom-yellow py-2 fw-bold"} content={"SAVE SHOW CHANGES"} onClick={handleSaveForShows} disabled={Object.keys(dirtyRows).length === 0} />
                                </div>

                                <h2 className="text-custom-yellow fw-bold small text-uppercase mt-5 mb-3">Content Overview</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="p-3 rounded text-custom-yellow blurry-light">
                                            <h4>Movies</h4>
                                            <p className="fs-1 fw-bold mb-0">{movies.length}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3 mt-md-0">
                                        <div className="p-3 rounded text-custom-yellow blurry-light">
                                            <h4>Shows</h4>
                                            <p className="fs-1 fw-bold mb-0">{shows.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
}