import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";
import ekivaLogo from "/src/assets/ekiva-logo.svg";
import Loader from "./Loader";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import config from "../config";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    setLoading(true);
    try {
      const res = await axiosInstance.post(`${config.API_BASE}tokens/`, {
        email: username,
        password,
      });

      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.access,
          menus: [],
          school: res.data.school,
        })
      );

      localStorage.setItem("access_token", res.data.access);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      setErrors({ password: "Invalid username or password" });
      toast.error("Login failed: " + error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="wave-header">
        <div className="header-content">
          <img src={ekivaLogo} alt="logo" width={100} />
          <h1 className="title">My Ekiva</h1>
          <p className="subtitle">Teachers, AI, a New Journey</p>
        </div>
        <div className="wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#eaecef"
              d="M0,160L30,165.3C60,171,120,181,180,192C240,203,300,213,360,202.7C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,224C960,224,1020,224,1080,202.7C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256L1440,320H0Z"
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
                <Form onSubmit={handleLogin}>
                  {/* Username */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      isInvalid={!!errors.username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors((prev) => ({ ...prev, username: null }));
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password with toggle */}
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        isInvalid={!!errors.password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors((prev) => ({ ...prev, password: null }));
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Forgot Password */}
                  <div className="text-end mb-3">
                    <a href="/forgot-password" className="forgot-password">
                      Forgot Password?
                    </a>
                  </div>

                  <Button type="submit" className="w-100" variant="primary">
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
