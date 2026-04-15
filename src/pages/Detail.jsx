import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Header from "../components/Header.jsx";
import Slider from "../components/Slider.jsx";
import CustomPlayBtn from "../components/CustomPlayBtn.jsx";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { getAllMovies, getAllShows, getShowEpisodes, getRandomProjects } from "../api/videos.js";
import { whoami, logout } from "../api/user.js";

const BASE_URL = "http://2.tcp.eu.ngrok.io:11408";

function generateSlug(title) {
    return title.toLowerCase().replace(/ /g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, '');
}

export default function Detail() {
    const [user, setUser] = useState(null);
    const [mediaData, setMediaData] = useState(null);
    const [episodesData, setEpisodesData] = useState([]);
    const [filteredEpisodes, setFilteredEpisodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [otherProjects, setOtherProjects] = useState([]);


    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const initialSeason = parseInt(searchParams.get('season')) || 1;
    const initialEpisode = parseInt(searchParams.get('episode')) || 1;

    const [selectedSeason, setSelectedSeason] = useState(initialSeason);
    const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode);


    const navigate = useNavigate();

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

    useEffect(() => {
        // USER COOKIE CUCC
        async function checkSession() {
            try {
                const data = await whoami();
                // console.log("Session Check:", data);

                if (data && !data.error) {
                    setUser(data);
                } else {
                    // toast.error("Nem vagy bejelentkezve"); // ha nincs cookie 
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            }
        }

        checkSession()
    }, []);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [allMovies, allShows] = await Promise.all([getAllMovies(), getAllShows()]); // lekeri
                const allMedia = [...allMovies, ...allShows]; // csnal nagy tomab
                const foundMedia = allMedia.find(item => generateSlug(item.title) === slug); // megkeresi hogy melyik media

                if (!foundMedia) throw new Error("A keresett tartalom nem található.");

                setMediaData(foundMedia); // feltolti a mediadatat

                if (foundMedia.showid) { // ha van showid
                    const allEpisodes = await getShowEpisodes(foundMedia.showid); // feltolti a allepisodes - showid alapjan
                    setEpisodesData(allEpisodes);
                }

                const randomProjects = await getRandomProjects(12);
                setOtherProjects(randomProjects);
            } catch (err) {
                toast.error(err.message);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [slug, navigate]);

    useEffect(() => {
        if (mediaData?.showid && episodesData.length > 0) {
            const episodesInSeason = episodesData.filter(
                ep => ep.season == selectedSeason
            );
            // console.log(episodesData);
            setFilteredEpisodes(episodesInSeason);
        }
    }, [selectedSeason, episodesData, mediaData]);

    // console.log(filteredEpisodes);

    const handleSeasonChange = (e) => {
        const newSeason = parseInt(e.target.value);
        setSelectedSeason(newSeason);
        setSelectedEpisode(1); // Új évad választásakor visszaállítjuk az epizódot 1-re
    };

    const isShow = !!mediaData?.showid;

    // Itt lenne a checkSession és onLogout, ha szükséges

    if (isLoading || !mediaData) {
        return <div className="vh-100 d-flex justify-content-center align-items-center bg-dark"><div className="spinner-border text-light"></div></div>;
    }

    const playButtonUrl = `/play/${slug}`;
    const playButtonState = {
        id: isShow ? mediaData.showid : mediaData.movieid,
        cover: mediaData.cover,
        is_show: isShow
    };
    // console.log(mediaData);
    // console.log(playButtonState);
    // console.log(isShow);


    let seasons = [];
    if (episodesData && episodesData.length > 0) {
        // Egyedi season számok kinyerése
        const uniqueSeasons = [...new Set(episodesData.map(ep => ep.season))];

        // Rendezés és formázás
        seasons = uniqueSeasons
            .sort((a, b) => a - b) // Növekvő sorrend
            .map(seasonNum => ({
                season_number: seasonNum,
                episode_count: episodesData.filter(e => e.season === seasonNum).length
            }));
    }

    // console.log('Available seasons:', seasons);

    // console.log('mediaData:', mediaData);
    // console.log('isShow:', isShow);
    // console.log('episodesData:', episodesData);
    // console.log('episodesData:', episodesData);

    return (
    <div className="detail-page-wrapper">
        <div className="detail-overlay">
            <Header user={user} onLogOut={onLogout} onAdminPage={false} />

            <div className="container text-black mt-5">
                <div className="row">
                    <div className="col-md-4 d-none d-md-block">
                        <img src={`${BASE_URL}/uploads/covers/${mediaData.cover}`} alt={mediaData.title} className="img-fluid rounded shadow-lg" />
                    </div>
                    <div className="col-md-8">
                        <h1 className="display-4 fw-bold">{mediaData.title.replace(/_/g, ' ')}</h1>
                        <p className="lead">{mediaData.description}</p>
                        

                        {!isShow && (
                            <Link to={playButtonUrl} state={playButtonState} className="text-decoration-none">
                                <CustomPlayBtn size="large" />
                            </Link>
                        )}

                        {isShow && (
                            <div className="mt-3" style={{ maxWidth: '250px' }}>
                                <label className="form-label text-dark">Season</label>
                                <select className="form-select text-dark" value={selectedSeason} onChange={handleSeasonChange}>
                                    {seasons.map(s => <option key={s.season_number} value={s.season_number}>Season {s.season_number}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {isShow && (
                    <div className="mt-3">
                        <Slider
                            title={`Episodes in Season ${selectedSeason}`}
                            slides={filteredEpisodes}
                            isLoading={isLoading}
                            isEpisodeSlider={true}
                        />
                    </div>
                )}

                <div className="mt-3">
                    <Slider title={"Others have watched this"} slides={otherProjects} isLoading={isLoading} isEpisodeSlider={false} />
                </div>
                

            </div>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    </div>
);
}