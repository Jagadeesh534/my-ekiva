import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ title, breadcrumbItems }) => {
    const location = useLocation();
    const defaultBreadcrumbItems = breadcrumbItems || [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: title || "Page", path: location.pathname },
      ];
  return (
    <div className="app-container">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
      <div className="breadcrumb-section">
          {/* Dynamic Breadcrumbs */}
          <Breadcrumbs items={defaultBreadcrumbItems} />
        </div>

        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
