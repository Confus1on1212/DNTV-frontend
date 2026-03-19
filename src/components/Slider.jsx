// src/components/Slider.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; // Helyes import a react-router-dom-ból

import CustomPlayBtn from './CustomPlayBtn'; // Feltételezve, hogy itt van a gombod

import 'swiper/css';

const BASE_URL = "http://192.168.9.105:4000";

// Helper függvény a slug generálásához
function generateSlug(title) {
  return title.toLowerCase().replace(/ /g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, ''); // space -> -, _ -> -,  
}

export default function Slider({ title, slides, isLoading }) {
  if (isLoading) {
    return (
      <div className="category-slider">
        <h2 className="category-title">{title}</h2>
        <p style={{ color: 'white' }}>Loading...</p>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="category-slider">
      <h2 className="category-title">{title}</h2>
      <Swiper
        spaceBetween={15}
        slidesPerView={2.2}
        breakpoints={{
          768: { slidesPerView: 3.5, spaceBetween: 20 },
          1024: { slidesPerView: 5.5, spaceBetween: 20 },
        }}
      >
        {slides.map((slide) => {
          const slug = generateSlug(slide.title);
          const searchParams = new URLSearchParams();
          if (slide.season && slide.episodeid) {
            searchParams.append('season', slide.season);
            searchParams.append('episode', slide.episodeid);
          }

          if (slide.secondsWatched > 0) {
            searchParams.append('t', slide.secondsWatched);
          }
          
          const queryString = searchParams.toString();
          const finalUrl = `/play/${slug}${queryString ? `?${queryString}` : ''}`;
          
          const linkState = { 
            cover: slide.cover,
            id: slide.movieid 
          };
          
          const uniqueKey = slide.episodeid ? `${slide.movieid}-${slide.episodeid}` : slide.movieid;

          return (
            <SwiperSlide key={uniqueKey}>
              <div className="movie-card-link">
                <div className="movie-card" style={{ backgroundImage: `url(${BASE_URL}/uploads/covers/${slide.cover})` }}>
                  <div className="movie-card-overlay">
                    <p className='movie-card-title'>{slide.title.replace(/_/g, ' ')}</p>
                    <div className="play-button-wrapper">
                      <Link to={finalUrl} state={linkState} className="text-decoration-none">
                        <CustomPlayBtn size='small' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}