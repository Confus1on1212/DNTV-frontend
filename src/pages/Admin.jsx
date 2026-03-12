import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // A useNavigate-hez is kell
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header.jsx";
import { whoami, logout } from "../user.js";

export default function Admin() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const isAdmin = user?.role === 1

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

        checkSession();
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
            <Header user={user} onLogOut={onLogout} />

            {isAdmin &&
            <div className="container m-5 blurry-light rounded mx-auto">
                <h1>Admin Felület</h1>
                <h4>Username: {user.username}</h4>
                <hr />
            </div>}
            
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
}