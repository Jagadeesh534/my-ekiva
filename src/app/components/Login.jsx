import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../features/authSlice";
import axios from 'axios';
import Loader from "./Loader";
const API_BASE = 'https://4d61-117-202-50-217.ngrok-free.app/api';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    dispatch(setUserName(username))

    try {

      setLoading(true);
      const response = await axios.post(`${API_BASE}/token/`, {
        username: username,
        password: password,
      });   
      // const response = await axios.post(`${API_BASE}/token/`, {
      //   email: username,
      //   password: password,
      // });
      console.log("Response:", response.data);
  

      const { access, refresh } = response.data;
      debugger
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setToken(access);
      console.log("Login successful:", response.data);
      if (response.status === 200) {
        navigate("/dashboard");
        setLoading(false);
      } else {
        alert("Login failed");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      navigate("/dashboard");
      throw error;
    }
  };
  if(loading) return <Loader />;
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
      <Container className="">
        <Row className="justify-content-center mt-5">
          <Col md={6} lg={4}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h2 className="text-center mb-4">Login to My Ekiva</h2>

                {/* Login Form */}
                <Form onSubmit={handleLogin}>
                  {/* Username Field (No Label) */}
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      
                    />
                  </Form.Group>

                  {/* Password Field (No Label) */}
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      
                    />
                  </Form.Group>

                  {/* Forgot Password Link */}
                  <div className="text-end mb-3">
                    <a href="/forgot-password" className="forgot-password">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
