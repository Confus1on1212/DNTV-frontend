import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Carousel } from 'antd';
import './style/main.css'

import { getFeatured } from "./videos.js";
import { whoami, logout } from "./user.js";
import Btn from "./components/Btn.jsx";
import {useNavigate} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)
  const [userError, setUserError] = useState("")

  const [featuredProjectsSlides, setSlides] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    // CAROUSEL SLIDES
    const fetchSlides = async () => {
      try {
        const data = await getFeatured(6); 

        if (Array.isArray(data)) {
          setSlides(data);
        } else {
          console.error("Nem tömb érkezett a szerverről:", data);
        }
      } catch (error) {
        console.error("Hiba a lekérés során:", error);
      }
    };

    // USER COOKIE CUCC
    async function checkSession() {
      try {
        const data = await whoami();
        console.log("Session Check:", data);
        
        if (data && !data.error) {
          setUser(data);
        } else {
          setUserError(data?.error);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    }

    checkSession();
    fetchSlides();
  }, []);

  async function onLogout() {
    const data = await logout()

    if (data.error) {
        return setUserError(data.error)
    }
    setUser(null)
    navigate('/')
}

  return (
    <div className="app-root">
      <Header user={user} onLogOut={onLogout}/>
      <div className="carousel-wrapper">
        <Carousel className="carousel" autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          {featuredProjectsSlides.map((slide) => (
            <div key={slide.id}>
              <div className="carousel-card-content" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="overlay">
                  <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                    <p className="lead mb-4">{slide.description}</p>
                    <Btn btnClass={"btn btn-custom-yellow"} content={"Play"} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default App;
