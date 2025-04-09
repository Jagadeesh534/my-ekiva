import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, updateUserInfo } from "../features/authSlice";
import ekivaLogo from "/src/assets/ekiva-logo.svg";
import Loader from "./Loader";

const API_BASE = 'https://4d61-117-202-50-217.ngrok-free.app/api';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      setLoading(true);

      // Example login simulation
      dispatch(loginSuccess({
        loginType: 'school',
        userInfo: { username, school: "SBSC", role: "ADMIN" },
        token: "hello",
        menus: []
      }));

      dispatch(updateUserInfo({ username, school: "SBSC", role: "ADMIN" }));
      localStorage.setItem("access_token", "hello");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ password: "Invalid username or password" });
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="app-container">
      {/* Header Section with Wave */}
      <header className="wave-header">
        <div className="header-content">
        <img src={ekivaLogo} alt="logo" width={100} />
          <h1 className="title">My Ekiva</h1>
          <p className="subtitle">Teachers, AI, a New Journey</p>
        </div>
        <div className="wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#eaecef"
              d="M0,160L30,165.3C60,171,120,181,180,192C240,203,300,213,360,202.7C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,224C960,224,1020,224,1080,202.7C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6} lg={4}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h2 className="text-center mb-4">Login to My Ekiva</h2>

                {/* Login Form */}
                <Form onSubmit={handleLogin}>
                  {/* Username */}
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      isInvalid={!!errors.username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) {
                          setErrors((prev) => ({ ...prev, username: null }));
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      isInvalid={!!errors.password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          setErrors((prev) => ({ ...prev, password: null }));
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Forgot Password */}
                  <div className="text-end mb-3">
                    <a href="/forgot-password" className="forgot-password">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit */}
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
