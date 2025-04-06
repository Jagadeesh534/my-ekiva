import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ title }) => {
    const location = useLocation();
    const [breadcrumbItems, setBreadcrumbItems] = useState([
       
      ]);
      useEffect(() => {
        const pathSegments = location.pathname.split("/").filter((path) => path);
    
        const newBreadcrumbItems = [
          ...pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            let name = segment.charAt(0).toUpperCase() + segment.slice(1);
  
            if (segment === "students") name = "Students";
            if (segment === "register") name = "Register Student";
            if (segment === "edit") name = "Edit Student";
            if (segment === "view") name = "View Student";
    
            return { name, path };
          }),
        ];
    
        setBreadcrumbItems(newBreadcrumbItems);
      }, [location.pathname]);    
  return (
    <div className="app-container">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
      <div className="breadcrumb-section">
          {/* Dynamic Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
