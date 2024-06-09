import React from 'react';
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';

import Nav from '../components/Navbar/Nav';
import Footer from '../components/Footer/Footer';

const Main = () => {
    const location = useLocation();
    // console.log(location)
    const noHeaderFooter= location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            <div className='max-w-[1170px] mt-8 mx-auto p-4'>
                <ScrollRestoration/>
            {
                noHeaderFooter ||   <Nav></Nav> 
          } 
            <Outlet></Outlet>
       
        </div>
             {
                noHeaderFooter ||       <Footer></Footer>
      }
       </div>
    );
};

export default Main;