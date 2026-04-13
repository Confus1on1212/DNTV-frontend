import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Header from "../components/Header.jsx";
import Slider from "../components/Slider.jsx";
import CustomPlayBtn from "../components/CustomPlayBtn.jsx";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { getAllMovies, getAllShows, getShowEpisodes } from "../api/videos.js";
import { login } from "../api/user.js";

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

    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const initialSeason = parseInt(searchParams.get('season')) || 1;
    const initialEpisode = parseInt(searchParams.get('episode')) || 1;

    const [selectedSeason, setSelectedSeason] = useState(initialSeason);
    const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode);

    const navigate = useNavigate();

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
                    const allEpisodes = await getShowEpisodes(foundMedia.showid); // feltolti a 
                    setEpisodesData(allEpisodes);
                }
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

    const isShow = !!mediaData.showid;

    // Itt lenne a checkSession és onLogout, ha szükséges

    if (isLoading || !mediaData) {
        return <div className="vh-100 d-flex justify-content-center align-items-center bg-dark"><div className="spinner-border text-light"></div></div>;
    }

    const playButtonUrl = `/play/${slug}`
    const playButtonState = {
        id: mediaData.movieid,
        cover: mediaData.cover,
        is_show: false
    };
    // console.log(mediaData);

    const seasons = episodesData.reduce((acc, episode) => {
        if (!acc.find(s => s.season_number === episode.season)) {
            acc.push({
                season_number: episode.season,
                episode_count: episodesData.filter(e => e.season === episode.season).length
            });
        }
        return acc;
    }, []);

    return (
        <div className="detail-page-wrapper">
            <div className="detail-overlay">
                <Header user={user} onLogOut={() => { }} />

                <div className="container text-black mt-5">
                    <div className="row align-items-center">
                        <div className="col-md-4 d-none d-md-block">
                            <img src={`${BASE_URL}/uploads/covers/${mediaData.cover}`} alt={mediaData.title} className="img-fluid rounded shadow-lg" />
                        </div>
                        <div className="col-md-8">
                            <h1 className="display-4 fw-bold">{mediaData.title.replace(/_/g, ' ')}</h1>
                            <p className="lead">{mediaData.description}</p>
                            {!isShow && (
                                <div className="play-button-wrapper">
                                    <Link to={"finalUrl"} state={"linkState"} className="text-decoration-none">
                                        <CustomPlayBtn size='small' />
                                    </Link>
                                </div>
                            )
                            }
                        </div>
                        {isShow && (
                            <div className="container my-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="form-label text-dark">Évad</label>
                                        <select className="form-select text-dark" value={selectedSeason} onChange={handleSeasonChange}>
                                            {seasons.map(s => <option key={s.season_number} value={s.season_number}>Season {s.season_number}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Slider
                                        title={`Episodes in Season ${selectedSeason}`}
                                        slides={filteredEpisodes}
                                        isLoading={isLoading}
                                        isEpisodeSlider={true}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
}