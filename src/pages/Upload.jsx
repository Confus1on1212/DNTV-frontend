import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from "../components/AdminHeader.jsx";
import { whoami, logout } from "../api/user.js";
import { getAllUsers } from '../api/admin.js'
import { getAllMovies, getAllShows } from '../api/videos.js'

import Btn from '../components/Btn.jsx'





export default function Upload() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])

    const isAdmin = user?.role === 1

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
        const changedUsers = allUsers.filter(
            user => dirtyRows[user.user_id]
        );

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
                toast.success("Sikeres mentés!");
            }

        } catch (err) {
            toast.error("Hiba mentés közben");
        }
    };



    useEffect(() => {
        async function checkSession() {
            try {
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);

                    if (data.role !== 1) {
                        toast.error("Nincs jogosultságod az oldal megtekintéséhez!", {
                            onClose: () => navigate('/')
                        })
                    }
                } else {
                    toast.error("Nem vagy bejelentkezve!", {
                        onClose: () => navigate('/')
                    })
                }
            } catch (err) {
                console.error("Auth check failed", err);
                toast.error("Hiba történt az azonosítás során.", {
                    onClose: () => navigate('/')
                })
            }
        }

        async function getUsers() {
            try {
                const data = await getAllUsers()
                // console.log(data);
                if (data.error) {
                    toast.error('Hiba', data.error)
                } else {
                    setAllUsers(data)
                }
            } catch (err) {
                toast.error('Hiba a felhasználók lekérdezése során')
            }
        }

        async function getMovies() {
            try {
                const data = await getAllMovies()
                if (data.error) {
                    toast.error('Hiba', data.error)
                } else {
                    setMovies(data)
                }
            } catch (err) {
                toast.error('Hiba a filmek lekérdezése során')
            }
        }

        async function getShows() {
            try {
                const data = await getAllShows()
                if (data.error) {
                    toast.error('Hiba', data.error)
                } else {
                    setShows(data)
                }
            } catch (err) {
                toast.error('Hiba a sorozatok lekérdezése során')
            }
        }

        checkSession();
        getUsers();
        getMovies()
        getShows()
        console.log(allUsers);
        console.log(movies);
        console.log(shows);
    }, [navigate]);

    async function onLogout() {
        try {
            await logout();
            toast.success("Sikeresen kijelentkeztél!");
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error("Hiba a kijelentkezés során.");
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
        <div className="min-vh-100 scenic-background">
            <AdminHeader user={user} onLogOut={onLogout} />

            {isAdmin &&
                <div className="container m-5 blurry-light rounded mx-auto">
                    <div className="mx-auto users align-items-center m-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <h1>Upload</h1>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Choose upload type:
                            </h5>
                            <select
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                value={user.role}
                                onChange={(e) => {
                                    handleChange(index, "role", Number(e.target.value));
                                    e.target.style.backgroundColor = "orange";
                                }}
                            >
                                <option value={0}>Movie</option>
                                <option value={1}>Show</option>
                            </select>
                        </div>

                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Title:
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Description : 
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Studio :
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Imdb rating :
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Pg rating :
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <h5 className="p-2 mb-0" style={{ minWidth: "120px", width:"30vh" }}>
                                Quality :
                            </h5>
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => {
                                    handleChange(index, "email", e.target.value);
                                    e.target.style.backgroundColor = "orange";
                                }}
                            />
                        </div>

                        <p>asd</p>
                        <hr />
                    </div>
                    <div
                        style={{
                            position: "sticky",
                            bottom: 0,
                            background: "rgba(0,0,0,0.3)",
                            padding: "10px",
                            backdropFilter: "blur(5px)"
                        }}>
                        <Btn btnClass={"btn btn-custom-green w-100"} content={"Commit changes"} onClick={handleSave} />
                    </div>
                    <div className="mx-auto movies">

                    </div>

                    <div className="mx-auto shows">

                    </div>
                </div>
            }



            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
}