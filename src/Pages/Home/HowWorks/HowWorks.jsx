import React from 'react';
import register from '../../../assets/how works/RegisteredUsers.svg'
import task from '../../../assets/how works/CompletedTasks.svg'
import rewards from '../../../assets/how works/GetPaid.svg'
const HowWorks = () => {
    return (
        <div className='mt-12'>
               <div className="max-w-[700px] mx-auto text-center space-y-4">
                  <h2 className="text-2xl lg:text-4xl font-bold text-black ">
How It Works
          </h2>
          <p>Join our microtasking community and start earning from a wide range of simple tasks.  Our secure payment system, detailed task descriptions, and real-time support make it easy to earn extra income. Join our community today and enjoy the flexibility and rewards of microtasking!</p>
            </div>
            <div className="grid gap-6 my-16 lg:grid-cols-3">
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full ">
                        <img src={register} alt="" />
                </div>
				<p className="text-2xl font-semibold pt-4">
					Step 1.
                    </p>
				<p className="text-3xl font-semibold">
					Register
                    </p>
                    <p className='pb-4 text-lg'>Register using email and password or your social accounts.</p>
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-600 "><img src={task} alt="" /></div>
                    <p className="text-2xl font-semibold">
					Step 2.
                    </p>
				<p className="text-3xl font-semibold pt-4">
				Complete Tasks
                    </p>
                    <p className='pb-4 text-lg'>Select a task that interests you and complete it</p>
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-600">
                          <img src={rewards} alt="" />
                    </div>
                    <p className="text-2xl font-semibold pt-4">
					Step 3.
                    </p>
				<p className="text-3xl font-semibold">
				Earn Rewards
                    </p>
                    <p className='pb-4 text-lg'>
                        Get paid immediately once you complete the task.
                    </p>
                </div>
                </div>
        </div>
    );
};

export default HowWorks;