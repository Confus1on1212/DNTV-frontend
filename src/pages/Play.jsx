import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'

import Header from "../components/Header.jsx";
import { ToastContainer, toast } from 'react-toastify';

import { whoami, logout } from "../api/user.js";
import { getMovie } from "../api/videos.js"

const BASE_URL = "http://192.168.9.105:4000";

export default function Play() {
    const [user, setUser] = useState(null);
    const [mediaData, setMediaData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const { slug } = useParams();

    const mediaId = location.state?.id;
    const cover = location.state?.cover; // amit atad a Link state= ben
    const secondsWatched = new URLSearchParams(location.search).get('t') || 0;

    useEffect(() => {
        // USER COOKIE CUCC
        async function checkSession() {
            try {
                const data = await whoami();
                // console.log("Session Check:", data);

                if (data && !data.error) {
                    setUser(data);
                } else {
                    toast.error("Nem vagy bejelentkezve"); // ha nincs cookie
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            }
        }

        async function fetchMedia() {
            setIsLoading(true);
            try {
                console.log(mediaId);
                const data = await getMovie(mediaId);
                setMediaData(data); // A teljes objektumot elmentjük
            } catch (err) {
                console.error(err);
                toast.error(err.message || "Hiba a videó betöltése közben.");
                // Hiba esetén visszanavigálhatunk
                // navigate('/');
            } finally {
                setIsLoading(false);
            }
        }

        checkSession();
        fetchMedia();
        // console.log(mediaData);
    }, [slug]);

    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return toast.error(data.error)
        }
        // console.log("hoki" + user);
        setUser(null)
        // console.log("asd" + user);
        navigate('/')
    }

    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div className="spinner-border text-light" role="status"></div>
                <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            </div>
        );
    }

    if (!mediaData) {
        return <div>A tartalom betöltése sikertelen.</div>;
    }

    return (
        <div className="min-vh-100">
            <Header user={user} onLogOut={onLogout} />
            <div className="container-fluid p-0">
                {/* A video forrása a mediaData objektumból jön */}
                <video key={mediaData.video_filename} width="100%" height="auto" controls autoPlay poster={cover ? `${BASE_URL}/uploads/covers/${cover}` : ''} onLoadedMetadata={(e) => { e.target.currentTime = secondsWatched; }}>
                    <source src={`${BASE_URL}/uploads/movies/${mediaData.file}`} type="video/mp4" />
                    A böngésződ nem támogatja a videó lejátszást.
                </video>
            </div>

            <div className="container mt-4 text-light">
                <h1>{mediaData.title}</h1>
                <p className="text-muted">{mediaData.description}</p>
                

            </div>

            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
}