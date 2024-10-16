import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import useInstagramFeed from './useInstagramFeed';

const InstagramFeed = ({ accessToken }) => {
  const { feed, loading, error } = useInstagramFeed(accessToken);

  if (loading) return <p>Loading Instagram Feed...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={0}
      loop={true}
      scrollbar={{
        hide: true,
      }}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 0,
        },
      }}
      modules={[Autoplay]}
      className="mySwipers"
    >
      {feed.map((post) => (
        <SwiperSlide key={post.id}>
          <div className="insta-slide-item contaernrulitem">
            {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
              <img src={post.media_url} alt={post.caption || 'Instagram post'} />
            ) : (
              <video src={post.media_url} controls />
            )}
            {/* <p>{post.caption}</p> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InstagramFeed;
