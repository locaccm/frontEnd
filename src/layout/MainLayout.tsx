import React, { useState } from "react";
import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="main-layout">
      <Sidebar setActivePage={setActivePage} />
      <div className="content">
        <p>Page active : {activePage}</p>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
