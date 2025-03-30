import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginType } from "../features/authSlice";
const Landing = () => {
  const options = [
    { icon: <FaUserGraduate />, label: "Student" , value:'student'},
    { icon: <FaChalkboardTeacher />, label: "Teacher" , value:'teacher'},
    { icon: <FaSchool />, label: "School" , value:'school'},
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanldeOnclick=(user)=>{
    dispatch(setLoginType(user))
    navigate('/login')

  }
  return (
    <div className="app-container">
      {/* Header Section with Wave */}
      <header className="wave-header">
        <div className="header-content">
          <img src="/logo.png" alt="My Ekiva Logo" className="logo" />
          <h1 className="title">My Ekiva</h1>
          <p className="subtitle">Teachers, AI, a New Journey</p>
        </div>
        <div className="wave">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#eaecef"
              d="M0,160L30,165.3C60,171,120,181,180,192C240,203,300,213,360,202.7C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,224C960,224,1020,224,1080,202.7C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <Container className="content">
        <p className="welcome-text">Welcome to My Ekiva!</p>

        {/* Options Section */}
        <Row className="justify-content-center">
          {options.map((option, index) => (
            <Col key={index} md={8} sm={12} className="mb-3">
              <Card className="option-card">
                <Card.Body>
                  <Button variant="light" onClick={()=>hanldeOnclick(option.value)} className="option-button w-100">
                    {option.icon} <span className="ms-2">{option.label}</span>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
