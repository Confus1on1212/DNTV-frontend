import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { Carousel } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header.jsx";
import CarouselCard from "./components/CarouselCard.jsx"
import Footer from "./components/Footer.jsx";
import Slider from "./components/Slider.jsx";

import 'swiper/css';
import 'swiper/css/navigation';

import { getRandomProjects, getTopRatedTVseries, getTopRatedTVMovies, getTopRatedTVSeriesAndMovies } from "./api/videos.js";
import { whoami, logout } from "./api/user.js";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ /g, '-') // Szóközök cseréje kötőjelre
    .replace(/_/g, '-') // Aláhúzások cseréje kötőjelre
    .replace(/[^\w-]+/g, ''); // Minden nem-szó karakter eltávolítása (kivéve kötőjel)
}

function App() {
  const [user, setUser] = useState(null)

  const [featuredSlides, setFeaturedSlides] = useState([]);
  const [random1, setRandom1] = useState([]);
  const [random2, setRandom2] = useState([]);
  const [topRatedProjects, setTopRatedProjects] = useState([])
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    // CAROUSEL SLIDES and  
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [featuredData, random1, random2, topRatedData, topRatedMovieData, topRatedSeriesData] = await Promise.all([ //megvarja hogy mind valaszt adjon
          getRandomProjects(6),
          getRandomProjects(12),
          getRandomProjects(12),
          getTopRatedTVSeriesAndMovies(10),
          getTopRatedTVMovies(10),
          getTopRatedTVseries(10)
        ]);

        setFeaturedSlides(featuredData); // carousel
        setTopRatedProjects(topRatedData);
        setTopRatedSeries(topRatedSeriesData); // top rated show
        setTopRatedMovies(topRatedMovieData);
        setRandom1(random1)
        setRandom2(random2)

      } catch (error) {
        toast.error("Error loading in the page");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

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
    fetchAllData()
  }, []);

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

  async function onNavigateUser() {
    navigate('/user')
  }

  return (
    <div className="app-root">
      <Header user={user} onLogOut={onLogout} onAdminPage={false} onNavigateUser={onNavigateUser} />
      <div className="carousel-wrapper">
        <Carousel className="carousel" autoplay={{ dotDuration: true }} autoplaySpeed={5000} draggable={true} arrows arrowSize={32} dotHeight={6}>
          {featuredSlides.map((slide) => {
            const uniqueKey = slide.episodeid ? `${slide.movieid}-${slide.episodeid}` : slide.movieid; // ha nincs episodeid akkor movie- nem kell episodeid a slugba

            const slug = generateSlug(slide.title);
            let displayTitle = slide.title.replace(/_/g, ' '); // alahuzas -> space

            const searchParams = new URLSearchParams();

            if (slide.season && slide.episodeid) { // HA sorozat
              searchParams.append('season', slide.season);
              searchParams.append('episode', slide.episodeid);

              // const seasonNum = String(slide.season).padStart(2, '0');
              // const episodeNum = String(slide.episodeid).padStart(2, '0');
              // displayTitle = `${displayTitle} S${seasonNum}E${episodeNum}`;
            }


            if (slide.secondsWatched > 0) { // HA mar belekezdett a nezesbe, nemfix hogy kelleni foge
              searchParams.append('t', slide.secondsWatched);
            }

            const queryString = searchParams.toString();
            const finalUrl = `/details/${slug}?${queryString}`;
            const linkState = {
              cover: slide.cover,
              id: slide.movieid
            };

            return (
              <CarouselCard key={uniqueKey} cover={slide.cover} displayTitle={displayTitle} description={slide.description} finalUrl={finalUrl} linkState={linkState} />
            )
          })}
        </Carousel>


        <Slider title="Top-Rated " slides={topRatedProjects} isLoading={isLoading} />
        <Slider title="Top-rated TV series" slides={topRatedSeries} isLoading={isLoading} />
        <Slider title="Top-rated Movies" slides={topRatedMovies} isLoading={isLoading} />
        <Slider title="Other top projects " slides={random1} isLoading={isLoading} />
        <Slider title="People's favourite" slides={random2} isLoading={isLoading} />


        <Footer />

        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    </div>
  );
}

export default App;
