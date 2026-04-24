import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getMovie, getEpisode } from "../api/videos.js";

export default function Play() {
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    
    // Adatok kiolvasása a Link state-ből és a query paraméterekből
    const mediaId = location.state?.id;
    const isShow = location.state?.is_show;
    const cover = location.state?.cover;
    const secondsWatched = parseInt(new URLSearchParams(location.search).get('t')) || 0;
    const episode = parseInt(new URLSearchParams(location.search).get('episode'));
    const season = parseInt(new URLSearchParams(location.search).get('season'));

    useEffect(() => {
        if (!mediaId) {
            toast.error("A tartalom nem indítható el, hiányzó azonosító.");
            navigate(-1); // Visszanavigál az előző oldalra
            return;
        }

        async function fetchVideoFile() {
            setIsLoading(true);
            try {
                let media;
                let finalVideoUrl = '';

                console.log('mediaId:', mediaId, 'season:', season, 'episode:', episode);

                if (isShow && episode && season) {
                    media = await getEpisode(mediaId, episode, season);

                    if (!media || !media.file) throw new Error("Az epizód videófájlja nem található.");
                    finalVideoUrl = `/uploads/episodes/${media.file}`;
                } else {
                    media = await getMovie(mediaId);
                    const movieData = Array.isArray(media) ? media[0] : media;
                    if (!movieData || !movieData.file) throw new Error("A film videófájlja nem található.");
                    finalVideoUrl = `/uploads/movies/${movieData.file}`;
                }
                
                setVideoUrl(finalVideoUrl);

            } catch (err) {
                console.error(err);
                toast.error(err.message || "Hiba a videó betöltése közben.");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchVideoFile();
    }, [mediaId, episode, isShow, navigate, season]);

    const handleVideoLoaded = (e) => {
        e.target.currentTime = secondsWatched;
        
        // Fullscreen
        const videoElement = e.target;
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) { // Safari
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // IE11
            videoElement.msRequestFullscreen();
        }
    };

    const handleBack = () => {
        // 
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div className="spinner-border text-light" role="status"></div>
            </div>
        );
    }

    return (
        <div className="bg-dark min-vh-100">

             <button
                    onClick={handleBack}
                    className="btn btn-dark position-absolute top-0 start-0 m-3 d-flex align-items-center gap-2"
                    style={{
                        zIndex: 1000,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }}
                >
                    <span className="text-light fw-bold">&laquo; Back</span>
                </button>
            
            <div className="container-fluid p-0">
                {videoUrl ? (
                    <video
                        key={videoUrl}
                        width="100%"
                        height="auto"
                        controls
                        autoPlay
                        poster={cover ? `${import.meta.env.VITE_BASE_URL}/uploads/covers/${cover}` : ''}
                        onLoadedMetadata={(e) => { e.target.currentTime = secondsWatched; }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        A böngésződ nem támogatja a videó lejátszást.
                    </video>
                ) : (
                    <div className="d-flex justify-content-center align-items-center bg-black" style={{ aspectRatio: '16/9' }}>
                        <h2 className="text-light">A videó nem tölthető be.</h2>
                    </div>
                )}
            </div>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
}