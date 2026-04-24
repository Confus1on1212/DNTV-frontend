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

    const handleSave = async () => {
        const changedUsers = allUsers.filter(user => dirtyRows[user.user_id]);
        if (changedUsers.length === 0) {
            toast.info("No changes to save.");
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
                toast.success("Users updated successfully!");
            }
        } catch (err) {
            toast.error("Error saving changes.");
        }
    };

    useEffect(() => {
        async function checkSession() {
            try {
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);
                    if (data.role !== 1) {
                        toast.error("You do not have permission to view this page.", {
                            onClose: () => navigate('/')
                        });
                    }
                } else {
                    toast.error("You are not logged in.", {
                        onClose: () => navigate('/')
                    });
                }
            } catch (err) {
                console.error("Auth check failed", err);
                toast.error("An error occurred during authentication.", {
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

                setAllUsers(usersData.error ? [] : usersData);
                setMovies(moviesData.error ? [] : moviesData);
                setShows(showsData.error ? [] : showsData);

                if (usersData.error) toast.error(usersData.error);
                if (moviesData.error) toast.error(moviesData.error);
                if (showsData.error) toast.error(showsData.error);

            } catch (err) {
                toast.error('Failed to fetch page data.');
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
            toast.success("Successfully logged out!");
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error("Error during logout.");
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className="text-custom-yellow fw-bold small text-uppercase mt-4 mb-3">Movie Management</h2>
                                <div className="table-responsive">
                                    <table className="table table-light table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Studio</th>
                                                <th>Imdb rating</th>
                                                <th>Pg rating</th>
                                                <th>Cover</th>
                                                <th>Quality</th>
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-grid mt-4">
                                     <Btn btnClass={"btn btn-custom-yellow py-2 fw-bold"} content={"SAVE USER CHANGES"} onClick={handleSave} disabled={Object.keys(dirtyRows).length === 0} />
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