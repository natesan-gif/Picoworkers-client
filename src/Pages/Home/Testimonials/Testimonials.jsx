import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
console.log(reviews)
  return (
    <section className="mt-12">
      <div className="max-w-[700px] mx-auto text-center space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          Testimonials
        </h2>
        <p>
          Join our microtasking community and start earning from a wide range of simple tasks. Our secure payment system, detailed task descriptions, and real-time support make it easy to earn extra income. Join our community today and enjoy the flexibility and rewards of microtasking!
        </p>
      </div>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              
         {
                    reviews.map(review => <SwiperSlide
                        key={review.id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                           
                         
                            <div     className="w-20 h-20 rounded-full">
                                              <img 
                src={review.image} 
                alt="" 
                className="w-full h-full rounded-full object-cover" 
              />
                  </div>
                            <h3 className="text-2xl">{review.name}</h3>
                               <p className="py-8">{review.details}</p>
                        </div>
                    </SwiperSlide>)
                }
     
      </Swiper>
    </section>
  );
};

export default Testimonials;
