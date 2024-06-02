
import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { FaTasks, FaUser } from 'react-icons/fa';

const AdminMenu = () => {
    return (
  <>
      <MenuItem icon={BsFillHouseAddFill} label='Home' address='/dashboard' />
      <MenuItem icon={FaUser} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={FaTasks}
        label='Manage Task'
        address='manage-task'
      />
    </>
    );
};

export default AdminMenu;