import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Nav from '../components/Navbar/Nav';
import Footer from '../components/Footer/Footer';

const Main = () => {
    const location = useLocation();
    // console.log(location)
    const noHeaderFooter= location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className='max-w-[1170px] mt-8 mx-auto'>
            {
                noHeaderFooter ||   <Nav></Nav> 
          } 
            <Outlet></Outlet>
            {
                noHeaderFooter ||       <Footer></Footer>
      }
        </div>
    );
};

export default Main;