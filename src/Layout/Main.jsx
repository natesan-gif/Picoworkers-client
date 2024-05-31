import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    // console.log(location)
    // const noHeaderFooter= location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className='max-w-6xl mx-auto'>
            {/* {
                noHeaderFooter ||   <Navbar></Navbar>
          } */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* {
                noHeaderFooter ||       <Footer></Footer>
      } */}
        </div>
    );
};

export default Main;