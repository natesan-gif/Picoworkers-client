import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
import DashboardNav from '../components/Dashboard/DashboardNav/DashboardNav'

const DashboardLayout = () => {
  return (
      <div className=''>
          
          <DashboardNav></DashboardNav>
            <div className='relative min-h-screen md:flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5'>
          <Outlet  />
              </div>
              
          </div>
          
          </div>
          <Footer></Footer>
  </div>
  )
}

export default DashboardLayout