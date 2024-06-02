import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { BsCoin, BsFillHouseAddFill } from 'react-icons/bs';
import { FaHistory, FaTasks } from 'react-icons/fa';
import { MdAddTask } from 'react-icons/md';

const TaskCreatorMenu = () => {
    return (
        <>
      <MenuItem icon={BsFillHouseAddFill} label='Home' address='/dashboard' />
   
      <MenuItem
        icon={MdAddTask}
        label='Add new Tasks'
        address='add-task'
      />
      <MenuItem
        icon={FaTasks}
        label='My Tasks'
        address='my-tasks'
      />
      <MenuItem
        icon={BsCoin}
        label='Purchase Coin'
        address='purchase-coin'
      />
      <MenuItem
        icon={FaHistory}
        label='Payment History'
        address='payment-history'
      />
    </>
    );
};

export default TaskCreatorMenu;