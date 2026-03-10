import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { Carousel } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header.jsx";
import Btn from "./components/Btn.jsx";

import { getFeatured } from "./videos.js";
import { whoami, logout } from "./user.js";

function App() {
  const [user, setUser] = useState(null)

  const [featuredProjectsSlides, setSlides] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    // CAROUSEL SLIDES 
    // asdasd
    const fetchSlides = async () => {
      try {
        const data = await getFeatured(6);

        if (Array.isArray(data)) {
          setSlides(data);
        } else {
          toast.error("nem array erkezett")
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
          toast.error(data?.error);
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
      return toast.error(data.error)
    }
    console.log("hoki" + user);
    setUser(null)
    console.log("asd" + user);
    navigate('/')
  }

  return (
    <div className="app-root">
      <Header user={user} onLogOut={onLogout} />
      <div className="carousel-wrapper">
        <Carousel className="carousel" autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          {featuredProjectsSlides.map((slide) => (
            <div key={slide.id}>
              <div className="carousel-card-content" style={{ backgroundImage: `url("http://192.168.9.105:4000/uploads/covers/${slide.cover}")`, height: 600 }}>
                <div className="overlay">
                  <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                    <p className="lead mb-4">{slide.description}</p>
                    <Link to={'/play/${slide.title}'}><Btn btnClass={"btn btn-custom-yellow"} content={"Play"}/></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default App;
