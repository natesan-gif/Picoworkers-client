import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
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
// console.log(reviews)
  return (
    <section className="mt-12">
      <div className="max-w-[700px] mx-auto text-center space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          Testimonials
        </h2>
        <p>
          Testimonials help us understand what our users love and how we can continue to improve our platform. Your feedback not only inspires us but also helps new users get a sense of what to expect when they join our community
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
                           <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                               <p className="py-8">{review.details}</p>
                        </div>
                    </SwiperSlide>)
                }
     
      </Swiper>
    </section>
  );
};

export default Testimonials;
