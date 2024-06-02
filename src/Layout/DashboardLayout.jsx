import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import DashboardFooter from "../components/Dashboard/DashboardFooter/DashboardFooter";

const DashboardLayout = () => {
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    const headerHeight = document.querySelector("header").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;
    setContentHeight(`calc(100vh - ${headerHeight + footerHeight}px)`);
  }, []);

  return (
    <div className="">
      <DashboardNav></DashboardNav>
      <div className="relative md:flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Outlet --> Dynamic content */}
        <div className="flex-1 md:ml-64" style={{ minHeight: contentHeight }}>
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
      <DashboardFooter></DashboardFooter>
    </div>
  );
};

export default DashboardLayout;
