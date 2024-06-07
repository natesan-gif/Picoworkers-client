import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const TopEarners = () => {
    const axiosPublic=useAxiosPublic()
  const [topEarners, setTopEarners] = useState([]);

  useEffect(() => {
    const fetchTopEarners = async () => {
      try {
        const response = await axiosPublic.get('/topEarners');
        setTopEarners(response.data);
      } catch (error) {
        console.error('Failed to fetch top earners', error);
      }
    };

    fetchTopEarners();
  }, [axiosPublic]);

  return (
   <section className="mt-12">
      <div className="max-w-[700px] mx-auto text-center space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          Top Earners
        </h2>
        <p>We believe in celebrating success and recognizing the hard work and dedication of our top earners. These individuals go above and beyond, setting an example for excellence and commitment in every task they undertake</p>
      </div>
      <div className="mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {topEarners.slice(0, 6).map((earner) => (
            <div key={earner.email} className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
              <img
                src={earner.profilePicture}
                alt={earner.name}
                className="w-16 h-16 rounded-full"
              />
              <div className='pl-6'>
                <h3 className="text-xl font-bold">{earner.name}</h3>
                <p>Available Coins: {earner.availableCoins}</p>
                <p>Task Completions: {earner.taskCompletionCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopEarners;
