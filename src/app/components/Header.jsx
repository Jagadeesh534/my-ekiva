import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaEdit } from "react-icons/fa";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginType } from "../features/authSlice";

const Header = () => {
  const menus = useSelector((state) => state.auth.menus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePath = useSelector((state)=>state.auth.profilePath);

  // Dummy Profile Info (replace with real user data)
  const profile = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/40", // Replace with user avatar URL
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(clearLoginType()); // Clear login data from Redux
    navigate("/"); // Redirect to login page
  };

  // Navigate to Profile Edit
  const handleProfileEdit = () => {
    console.log(profilePath);
    navigate(profilePath); // Redirect to profile edit page
  };

  return (
    <Navbar className="header" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        {/* Logo and Brand */}
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="text-white fw-bold logo-text"
        >
          My Ekiva
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
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

            {/* Profile and Logout - Mobile Mode */}
<NavDropdown
  title={<FaUserCircle size={22} />}
  id="profile-dropdown"
  align="end"
  className="profile-dropdown d-lg-none"
>
  <NavDropdown.Item onClick={handleProfileEdit}>
    Edit Profile
  </NavDropdown.Item>
  <NavDropdown.Divider />
  <NavDropdown.Item onClick={handleLogout} className="text-danger">
    <FaSignOutAlt className="me-1" /> Logout
  </NavDropdown.Item>
</NavDropdown>

{/* Profile and Logout - Desktop Mode */}
<NavDropdown
  title={
    <>
      <FaUserCircle className="me-1 d-none d-lg-inline" size={22} />
      <span className="d-none d-lg-inline">Profile</span>
    </>
  }
  id="profile-dropdown-desktop"
  align="end"
  className="profile-dropdown d-none d-lg-block"
>
  <NavDropdown.Item onClick={handleProfileEdit}>
    Edit Profile
  </NavDropdown.Item>
  <NavDropdown.Divider />
  <NavDropdown.Item onClick={handleLogout} className="text-danger">
    <FaSignOutAlt className="me-1" /> Logout
  </NavDropdown.Item>
</NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
