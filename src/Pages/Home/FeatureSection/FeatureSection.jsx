import React from "react";
import earnings from "../../../assets/features/earnings.jpeg";
import tasks from "../../../assets/features/task ma.png";
import task from "../../../assets/features/task m.jpeg";
import taskm from "../../../assets/features/task-management.png";
import secure from "../../../assets/features/secure.jpeg";
const FeatureSection = () => {
  return (
    <div className="mt-12">
          <div className="max-w-[700px] mx-auto text-center space-y-4">
                  <h2 className="text-2xl lg:text-4xl font-bold text-black ">
        Features
          </h2>
          <p>Join our microtasking community and start earning from a wide range of simple tasks.  Our secure payment system, detailed task descriptions, and real-time support make it easy to earn extra income. Join our community today and enjoy the flexibility and rewards of microtasking!</p>
  </div>
      <div className="py-8 pt-12 flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-1/2 space-y-2">
          <h3 className="text-xl lg:text-3xl font-bold text-black">
            Earn Coins by Completing Tasks
          </h3>
          <p>
            Whether you're a student, a stay-at-home parent, a freelancer, or
            anyone looking to boost their income, Microworker offers a diverse
            range of microtasks that require no special skills. Take surveys,
            play games, or do quick 3-5 minute tasks – turn spare moments into
            valuable earnings.
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img src={earnings} alt="" className="w-full" />
        </div>
      </div>
      <div className="py-8 flex flex-col md:flex-row-reverse gap-20 items-center">
        <div className="md:w-1/2 space-y-2">
          <h3 className="text-xl lg:text-3xl font-bold text-black">
       Create and Manage Tasks
          </h3>
          <p>
           Enhance your productivity with our user-friendly task management platform. Create tasks, set deadlines, and track progress all in one place. Perfect for teams and individuals alike, our tools are designed to simplify your workflow and ensure nothing falls through the cracks. Start managing your tasks efficiently—join us today
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img src={taskm} alt="" className="w-full" />
        </div>
      </div>
      <div className="py-8 flex flex-col md:flex-row gap-20 items-center ">
        <div className="md:w-1/2 space-y-2">
          <h3 className="text-xl lg:text-3xl font-bold text-black">
            Secure Payments
          </h3>
          <p>
       Ensure your transactions are safe and reliable with our secure payment solutions. Our platform uses advanced encryption and fraud protection measures to guarantee the safety of your personal and financial information. Join us now and enjoy peace of mind with every payment you make. Sign up today and experience secure, hassle-free transactions
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img src={secure} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
