import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
    const menus = useSelector((state) => state.auth.menus);


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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
