import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FooterMain from "../footer-main/FooterMain";
import NavSidebar from "../NavSidebar";

const Main = ({ children }) => {
  // Get the current path from the location object
  const location = useLocation();
  const isPrescriptionPage = location.pathname === '/prescription';

  return (
    <div>
      <NavSidebar />
      {children}
      <Outlet />
      {/* Conditionally render FooterMain based on the current path */}
      {!isPrescriptionPage && <FooterMain />}
    </div>
  );
};

export default Main;
