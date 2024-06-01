
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';


import {

  Button,


} from "@material-tailwind/react";
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
   <div className='mt-12'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className=''>
          <div className='slide1 h-[500px] w-full slide'>
            <div className='space-y-2'>
                    <h1 className='text-3xl md:text-5xl text-white'>Transform Your Free Time into Money!</h1>
            <p className='text-white'>Unlock your earning potential with our microtasking platform. It’s easy, flexible, and rewarding!</p>
           <Button
                variant="text"
                size="sm"
                className="inline-block px-8 py-3 bg-[#0044BC] hover:bg-[#6BA6FF]  text-white rounded"
              >
                <span>Contact Us</span>
              </Button>
      </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=''>
          <div className='slide2 h-[500px] w-full slide'>
            <div className='space-y-2'>
                    <h1 className='text-3xl md:text-5xl text-white'>Maximize Your Earnings with Microtasks</h1>
            <p className='text-white'>   Don’t let your free time go to waste.Start microtasking today and watch your income grow.</p>
           <Button
                variant="text"
                size="sm"
                className="inline-block px-8 py-3 bg-[#0044BC] hover:bg-[#6BA6FF]  text-white rounded"
              >
                <span>Contact Us</span>
              </Button>
      </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=''>
          <div className='slide3 h-[500px] w-full slide'>
            <div className='space-y-2'>
                    <h1 className='text-3xl md:text-5xl text-white'>Earn Money On Your Terms!</h1>
            <p className='text-white'>
            Join now and experience the convenience and benefits of microtasking. Your time, your money!</p>
           <Button
                variant="text"
                size="sm"
                className="inline-block px-8 py-3 bg-[#0044BC] hover:bg-[#6BA6FF] text-white rounded"
              >
                <span>Contact Us</span>
              </Button>
      </div>
          </div>
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
};

export default Banner;