import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { Carousel } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header.jsx";
import CarouselCard from "./components/CarouselCard.jsx"


import { getRandomProjects } from "./api/videos.js";
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

  const [featuredProjectsSlides, setSlides] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    // CAROUSEL SLIDES 
    const fetchSlides = async () => {
      try {
        const data = await getRandomProjects(6);
        // console.log(data);
        if (Array.isArray(data)) {
          setSlides(data);
        } else {
          toast.error("Hiba") // ha nem arra
        }
      } catch (error) {
        console.error("Hiba a lekérés során:", error);
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
          toast.error("Nem vagy bejelentkezve"); // ha nincs cookie 
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    }

    checkSession();
    fetchSlides();
    // console.log(featuredProjectsSlides);
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

  return (
    <div className="app-root">
      <Header user={user} onLogOut={onLogout} onAdminPage={false}/>
      <div className="carousel-wrapper">
        <Carousel className="carousel" autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          {featuredProjectsSlides.map((slide) => {
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

            
            if (slide.secondsWatched > 0) { // HA mar belekezdett a nezesbe, nemfix hogy kelleni fog
              searchParams.append('t', slide.secondsWatched);
            }

            const queryString = searchParams.toString();
            const finalUrl = `/play/${slug}${queryString ? `?${queryString}` : ''}`;
            const linkState = { cover: slide.cover };

            return (
              <CarouselCard key={uniqueKey} cover={slide.cover} displayTitle={displayTitle} description={slide.description} finalUrl={finalUrl} linkState={linkState} />
            )
          })}
        </Carousel>
        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    </div>
  );
}

export default App;
