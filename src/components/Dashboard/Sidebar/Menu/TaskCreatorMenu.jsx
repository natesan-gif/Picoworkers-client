import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { BsCoin, BsFillHouseAddFill } from 'react-icons/bs';
import { FaEdit, FaHistory, FaTasks } from 'react-icons/fa';
import { MdAddTask } from 'react-icons/md';

const TaskCreatorMenu = () => {
    return (
        <>
      <MenuItem icon={BsFillHouseAddFill} label='Home' address='task-creator-home' />
   
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
      {/* <MenuItem
        icon={FaEdit}
        label='Update Task'
        address='update-task'
      /> */}
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