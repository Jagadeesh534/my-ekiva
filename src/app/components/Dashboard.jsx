import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaClipboardList, FaUserAlt, FaUserCheck } from "react-icons/fa";
const Dashboard = () => {
  const navigate = useNavigate();

  // Define Card Data with Metrics
  const cardData = [
    {
      title: "Revenue",
      icon: <FaDollarSign className="icon-style" />,
      metric: "Rs. 12,54000/-",
      footer: "Last Month",
      path: "/revenue",
    },
    {
      title: "Content Review",
      icon: <FaClipboardList className="icon-style" />,
      metric: "7 Pending",
      footer: "Today",
      path: "/dashboard/contents",
    },
    {
      title: "Student List",
      icon: <FaUserAlt className="icon-style" />,
      metric: "1,245",
      footer: "Total Enrolled",
      path: "/dashboard/students",
    },
    {
      title: "Student Tracking",
      icon: <FaUserCheck className="icon-style" />,
      metric: "98%",
      footer: "Attendance Rate",
      path: "/student-tracking",
    },
  ];

  // Handle Card Click
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Ekiva - Oxford School</h2>
      <div className="dashboard-row">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => handleCardClick(card.path)}
          >
            {card.icon}
            <h4 className="card-title">{card.title}</h4>
            <p className="card-metric">{card.metric}</p>
            <p className="card-footer-text m-1">{card.footer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
