import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDollarSign,FaClock, FaClipboardList,FaTrophy, FaUserAlt, FaUserCheck, FaChartLine,FaChevronDown, FaChevronUp, FaBook, FaGraduationCap } from "react-icons/fa";
import { useSelector } from "react-redux";
import Slider from "react-slick";
const Dashboard = () => {
  const navigate = useNavigate();
  const loginType = useSelector((state)=> state.auth.loginType);
  const [cards, setCards] = useState([]);
  const userName = useSelector((state)=> state.auth.userInfo.username);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1
  };
  const carouselImages = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80", // students studying
    "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80", // classroom
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1600&q=80", // student with tablet
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80"  // group of students smiling
  ];
  
  
  const allSubjects = [
    {
      name: "Science",
      image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/chemistry-1280572_1280.jpg",
    },
    {
      name: "Maths",
      image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/mathematics-1866758_1280.jpg",
    },
    {
      name: "Social",
      image: "https://cdn.pixabay.com/photo/2016/05/29/15/00/parliament-142866_1280.jpg",
    },
    {
      name: "English",
      image: "https://cdn.pixabay.com/photo/2014/09/27/13/44/letters-463497_1280.jpg",
    },
    {
      name: "Telugu",
      image: "https://cdn.pixabay.com/photo/2018/03/01/09/38/alphabet-3182486_1280.jpg",
    },
    {
      name: "Hindi",
      image: "https://cdn.pixabay.com/photo/2014/04/03/10/32/font-310182_1280.png",
    },
    {
      name: "Computer",
      image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/coding-1869261_1280.jpg",
    },
  ];
  
  const [showAll, setShowAll] = useState(false);
  const visibleSubjects = showAll ? allSubjects : allSubjects.slice(0, 4);
  useEffect(()=>{
    const cardDataAdmin = [
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
        title: "Class Directory",
        icon: <FaGraduationCap className="icon-style" />,
        metric: "10",
        footer: "Classes",
        path: "/dashboard/class",
      },
      {
        title: "Student Tracking",
        icon: <FaUserCheck className="icon-style" />,
        metric: "98%",
        footer: "Attendance Rate",
        path: "/student-tracking",
      },
      {
        title: "Subjects",
        icon: <FaBook className="icon-style" />,
        metric: "10",
        footer: "Subjects",
        path: "/dashboard/subjects",
      }
    ];
    const cardDataStudent = [
      {
        title: "DeskTime",
        icon: <FaClock className="icon-style" />,
        metric: "12 Hrs",
        footer: 'Today',
        path: "/dashboard/desktime",
      },
      {
        title: "Rewards",
        icon: <FaTrophy className="icon-style" />,
        metric: "5+ Rewards",
        footer: "Today",
        path: "/dashboard/rewards",
      },
      {
        title: "Progress",
        icon: <FaChartLine className="icon-style" />,
        metric: "1,245",
        footer: "Total Enrolled",
        path: "/dashboard/students",
      }
    ];
    if(loginType === 'school') {
      setCards(cardDataAdmin);
    } else if(loginType === 'student') {
      setCards(cardDataStudent)
    }
  },[loginType])

 
  // Handle Card Click
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Carousel Section */}

      <h2 className="dashboard-title">Hey, {userName} welcome to Ekiva</h2>
     { (loginType === 'student') && <div className="carousel-container mt-5">
        <Slider {...settings}>
          {carouselImages.map((imgSrc, index) => (
            <div key={index}>
              <img
                src={imgSrc}
                alt={`Slide ${index}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>}
      <div className="dashboard-row" style={loginType==='student' ? {marginTop:'4rem'} :{} }>
        {cards.map((card, index) => (
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
      {loginType === "student" && (
 <div className="mt-5 px-3">
 <h4 className="fw-semibold mb-4 text-center">Subjects</h4>

{/* Subjects Grid */}
<div className="row text-center justify-content-center g-4">
  {visibleSubjects.map((subject, index) => (
    <div key={index} className="col-6 col-md-3">
      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle overflow-hidden border border-2 shadow"
          style={{ width: "90px", height: "90px" }}
        >
          <img
            src={subject.image}
            alt={subject.name}
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <p className="mt-2 fw-medium">{subject.name}</p>
      </div>
    </div>
  ))}
</div>

{/* Show More Button at Bottom */}
<div className="d-flex justify-content-end mt-4">
  <button
    className="btn btn-outline-secondary d-flex align-items-center"
    onClick={() => setShowAll(!showAll)}
  >
    {showAll ? (
      <>
        Show Less <FaChevronUp className="ms-2" />
      </>
    ) : (
      <>
        Show More <FaChevronDown className="ms-2" />
      </>
    )}
  </button>
</div>
</div>
)}



    </div>
  );
};

export default Dashboard;
