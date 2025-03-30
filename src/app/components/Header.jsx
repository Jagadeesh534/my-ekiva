import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginType } from "../features/authSlice";
const Header = () => {
    const menus = useSelector((state) => state.auth.menus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Handle Logout
    const handleLogout = () => {
      dispatch(clearLoginType()); // Clear login data from Redux
      navigate("/"); // Redirect to login page
    };
  

  return (
    <Navbar className="header" variant="dark" expand="lg" fixed="top">
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand as={Link} to="/dashboard" className="text-white fw-bold">
          My Ekiva
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {menus.map((menu, index) => (
              <Nav.Link
                as={Link}
                to={menu.path}
                key={index}
                className="nav-link-custom"
              >
                {menu.name}
              </Nav.Link>
            ))}
            {/* Logout Button */}
            <Button
              variant="outline-light"
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
