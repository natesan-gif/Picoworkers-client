import React from "react";
import useAuth from "../../../Hooks/useAuth.jsx";

const DashboardNav = () => {
  const { user } = useAuth();
//   console.log(user);
  return (
    <div>
      <header className="p-4 hidden md:block">
        <div className="container flex justify-end h-16 mx-auto">
          <ul className="items-stretch hidden space-x-3 md:flex">
            {user ? (
              <>
                <li className="flex flex-col">
                   <div>{user?.role || ""}</div>
                  <div>{user?.displayName || ""}</div>
                </li>
                <li className="flex flex-col">
                  <div className="w-12 rounded-full">
                    <img src={user?.photoURL || ""} className="" />
                  </div>
                  <div>{user?.displayName || "user name not found"}</div>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default DashboardNav;
