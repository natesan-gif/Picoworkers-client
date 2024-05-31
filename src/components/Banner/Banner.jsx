import heroImg1 from "../../assets/banner/images4.jpg";
import heroImg2 from "../../assets/banner/images1.jpeg";
import heroImg3 from "../../assets/banner/image3.jpeg";
import { AiFillFire } from "react-icons/ai";
import { Typewriter } from "react-simple-typewriter";

import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <div className="gadgetContainer">
      <Swiper
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        {/* slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:h-[450px] mt-10">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center justify-center lg:justify-start text-[#416EF0] mb-3 text-center lg:text-left">
                <div className="bg-[#416EF0] text-white mr-2 text-xl px-1 py-1 rounded-full">
                  <AiFillFire />
                </div>
                 Featured Task
              </div>

              <p className="xl:text-[50px] lg:text-[40px] md:text-[32px] text-[30px] font-bold text-center lg:text-left">
             Quick Tasks, Instant Rewards! Join to the   <br /> Microtasking  {''}
                <span style={{ color: "#416EF0", fontWeight: "bold" }}>
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={["Revolution ", "Platform"]}
                    loop={0} 
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={40}
                    delaySpeed={1000}
                  />
                </span>
              </p>
              <p className="font-medium text-black/60 dark:text-white md:text-lg text-center lg:text-left">
            Join now and experience the convenience and benefits of microtasking. Your time, your money!
              </p>
              <div className="flex justify-center lg:justify-start mb-2">
                <a href="#food">
                  <button className="font-bold mt-6 rounded-md px-4 py-2 bg-[#416EF0] text-white relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000 t">
                    <span className="absolute bg-[#2046F1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all "></span>
                    Explore Now
                  </button>
                </a>
              </div>
            </div>

            {/* left */}
            <div className="">
              <img className="" src={heroImg1} alt="" />
            </div>
          </div>
        </SwiperSlide>
        {/* slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:h-[450px] mt-10">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center justify-center lg:justify-start text-[#416EF0] mb-3 text-center lg:text-left">
                <div className="bg-[#416EF0] text-white mr-2 text-xl px-1 py-1 rounded-full">
                  <AiFillFire />
                </div>
                  Featured Task
              </div>

              <p className="xl:text-[50px] lg:text-[40px] md:text-[32px] text-[30px] font-bold text-center lg:text-left">
               Transform Your Free Time into Money!  <br />  Start Microtasking  {''}
                <span style={{ color: "#416EF0", fontWeight: "bold" }}>
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={["Today", "Now"]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={40}
                    delaySpeed={1000}
                  />
                </span>
              </p>
              <p className="font-medium text-black/60 dark:text-white md:text-lg text-center lg:text-left">
           Unlock your earning potential with our microtasking platform.It’s easy, flexible, and rewarding!
              </p>
              <div className="flex justify-center lg:justify-start mb-2">
                <a href="#food">
                  <button className="font-bold mt-6 rounded-md px-4 py-2 bg-[#416EF0] text-white relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000">
                   
                    <span className="absolute bg-[#2046F1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Explore Now
                  </button>
                </a>
              </div>
            </div>

            {/* left */}
            <div className="">
              <img className="" src={heroImg2} alt="" />
            </div>
          </div>
        </SwiperSlide>
        {/* slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:h-[450px] mt-10">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center justify-center lg:justify-start text-[#416EF0] mb-3 text-center lg:text-left">
                <div className="bg-[#416EF0] text-white mr-2 text-xl px-1 py-1 rounded-full">
                  <AiFillFire />
                </div>
                 Featured Task
              </div>

              <p className="xl:text-[50px] lg:text-[40px] md:text-[32px] text-[30px] font-bold text-center lg:text-left">
             Maximize Your Earnings with Microtasks! <br />   Sign Up  {''}
               
                <span style={{ color: "#416EF0", fontWeight: "bold" }}>
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={["Now", "Today"]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={30}
                    deleteSpeed={20}
                    delaySpeed={3000}
                  />
                </span>
              </p>
              <p className="font-medium text-black/60 dark:text-white md:text-lg text-center lg:text-left">
             Don’t let your free time go to waste.Start microtasking today and watch your income grow.
              </p>
              <div className="flex justify-center lg:justify-start mb-2">
                <a href="#food">
                  <button className="font-bold mt-6 rounded-md px-4 py-2 bg-[#416EF0] text-white relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000">
                
                    <span className="absolute bg-[#2046F1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Explore Now
                  </button>
                </a>
              </div>
            </div>

            {/* left */}
            <div className="">
              <img className="" src={heroImg3} alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;