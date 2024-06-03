
import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { FaTasks, FaUser } from 'react-icons/fa';

const AdminMenu = () => {
    return (
  <>
      <MenuItem icon={BsFillHouseAddFill} label='Home' address='admin-home' />
      <MenuItem icon={FaUser} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={FaTasks}
        label='Manage Tasks'
        address='manage-tasks'
      />
    </>
    );
};

export default AdminMenu;