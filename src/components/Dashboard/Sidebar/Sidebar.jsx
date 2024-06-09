import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFingerprint, BsFillHouseAddFill } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { MdHomeWork } from 'react-icons/md'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink, Navigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
// import useRole from '../../../hooks/useRole'
// import MenuItem from './Menu/MenuItem'
import ToggleButton from '../../Shared/Button/ToggleButton'
import useAuth from '../../../Hooks/useAuth.jsx'
import useRole from '../../../Hooks/useRole.jsx'
import MenuItem from './MenuItem/MenuItem'
import { Typography } from '@material-tailwind/react'
import AdminMenu from './Menu/AdminMenu.jsx'
import TaskCreatorMenu from './Menu/TaskCreatorMenu.jsx'
import WorkerMenu from './Menu/WorkerMenu.jsx'


const Sidebar = () => {
  const [isActive, setActive] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [role, isLoading] = useRole()
  // console.log(role, isLoading)
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const toggleHandler = event => {
    setToggle(event.target.checked)
  }
   
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
              <Link to='/'>
              <Typography
              as="a"
              href="#"
              className="mr-1 md:mr-2 cursor-pointer py-1.5 font-bold pl-2 md:pl-6 text-xl text-[#416EF0] "
            >
          PicoWorker
            </Typography>
              </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
              <Typography
              as="a"
              href="#"
              className="mr-1 md:mr-2 cursor-pointer py-1.5 font-bold pl-2 md:pl-6 text-xl text-[#416EF0] "
            >
          PicoWorkers
            </Typography>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}
            {role === 'host' && (
              <ToggleButton toggleHandler={toggleHandler} toggle={toggle} />
            )}

            {/*  Menu Items */}
            <nav>
    
              {/* {role === 'guest' && <GuestMenu />}
              {role === 'host' ? (
                toggle ? (
                  <HostMenu />
                ) : (
                  <GuestMenu />
                )
              ) : undefined}
              {role === 'admin' && <AdminMenu />} */}
             
              {
                role === 'worker' &&  <WorkerMenu></WorkerMenu>
            }
              {
                role === 'taskCreator' && <TaskCreatorMenu></TaskCreatorMenu>
            }
              {
                role === 'admin' && 
              <AdminMenu></AdminMenu>
            }
            
            </nav>
          </div>
        </div>

        <div>
          
        </div>
      </div>
    </>
  )
}

export default Sidebar