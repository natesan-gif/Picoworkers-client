import React,{ useState } from 'react';
import useAuth from '../../../../Hooks/useAuth.jsx';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRole from '../../../../Hooks/useRole.jsx';
import MenuItem from '../MenuItem/MenuItem.jsx';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { FaCoins, FaList, FaTasks } from 'react-icons/fa';

const WorkerMenu = () => {
    const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [role] = useRole()
    return (
        <>
              <MenuItem icon={BsFillHouseAddFill} label='Home' address='worker-home' />
      <MenuItem
        icon={FaTasks}
        label='Task List'
        address='task-list'
      />
      <MenuItem
        icon={FaList}
        label='My Submission'
        address='my-submission'
      />
      <MenuItem
        icon={FaCoins}
        label='Withdraw'
        address='withdraw-coins'
      />
        </>
    );
};

export default WorkerMenu;