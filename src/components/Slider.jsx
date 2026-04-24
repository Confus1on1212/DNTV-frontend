import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; // Helyes import a react-router-dom-ból

import CustomPlayBtn from './CustomPlayBtn'; // Feltételezve, hogy itt van a gombod

import 'swiper/css';

// Helper függvény a slug generálásához
function generateSlug(title) {
  return title.toLowerCase().replace(/ /g, '-').replace(/_/g, '-').replace(/[^\w-]+/g, ''); // space -> -, _ -> -,  
}

export default function Slider({ title, slides, isLoading, isEpisodeSlider }) {
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

          let finalUrl = '';
          let linkState = {};

          if (isEpisodeSlider) {
            // HA EPIZÓD SLIDER
            searchParams.append('season', slide.season);
            searchParams.append('episode', slide.episode);

            finalUrl = `/play/${slug}?${searchParams.toString()}`;
            linkState = {
              id: slide.showid, // Az epizód a sorozat ID-ját örökli
              cover: slide.cover, // Az epizódnak lehet saját borítója
              is_show: true
            };
          } else {
            // HA FŐOLDAL
            finalUrl = `/details/${slug}`;
            linkState = {
              id: slide.showid || slide.movieid,
              cover: slide.cover
            };
          }
          
          const uniqueKey = slide.episodeid ? `${slide.movieid}-${slide.episodeid}` : slide.movieid;

          return (
            <SwiperSlide key={uniqueKey}>
              <div className="movie-card-link">
                <div className="movie-card" style={{ backgroundImage: `url(/uploads/covers/${slide.cover})` }}>
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