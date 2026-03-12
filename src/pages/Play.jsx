import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'

import Header from "../components/Header.jsx";
import { ToastContainer, toast } from 'react-toastify';

import test from '../assets/testvideo.mp4'

import { whoami, logout } from "../user.js";

export default function Play() {
    const [user, setUser] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const navigate = useNavigate();

    const { slug } = useParams(); 
    const [searchParams] = useSearchParams(); 
    const location = useLocation();

    const title = slug.replace(/-/g, ' ');
    const season = searchParams.get('season');   
    const episode = searchParams.get('episode')
    const secondsWatched = searchParams.get('t') || 0;
    const cover = location.state?.cover // amit atad a Link state= ben


    // console.log('Title:', title);
    // console.log('Season:', season);
    // console.log('Episode:', episode);
    // console.log('Start time:', secondsWatched);
    // console.log('Cover:', cover);
    // console.log(`Poster URL: http://192.168.9.105:4000/uploads/covers/${cover}`);

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

        async function checkPlayer() {
            try {
                setVideoSrc(test)
            } catch (err) {
                console.log(err);
                toast.error("Hiba a video lejátszása közben")
            }
        }

        checkSession();
        checkPlayer();
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

    return (
        <div>
            <Header user={user} onLogOut={onLogout} />
            <div className="vh-100">
                {videoSrc ? (
                    <video width={"100%"} height={"95%"} controls loop={false} poster={cover ? `http://192.168.9.105:4000/uploads/covers/${cover}` : ''} preload="auto" autoPlay onLoadedMetadata={(e) => {
                        e.target.currentTime = secondsWatched;
                    }}>
                        <source src={test} type="video/mp4" />
                        Your browser is not supported
                    </video>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>

    )
}