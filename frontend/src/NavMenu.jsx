import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, NavbarBrand,
NavbarToggle, NavbarOffcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, NavLink, 
DropdownItem, FormControl} from 'react-bootstrap'

const NavMenu = () => {

  // Style for the navbar
  const navMenuStyle = {
    backgroundColor: "#50C8CC",
    color: "#FFFFFF",
  };

  // Style for the title in the navbar
  const titleStyle = {
    color: "#000000",
    fontFamily: "Poppins",
    fontWeight: 800,
    fontSize: 30,
  }

  // Style for the navigation links
  const navLinkStyle = {
    color: "#171717",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 20,
  }

  return (
    <>
      {/* Navigation bar */}
      <Navbar data-bs-theme="light" key={'md'} expand={'md'} className="mb-3" style={navMenuStyle}>
        <Container fluid>
          {/* Navbar brand */}
          <NavbarBrand href="#" style={titleStyle}>TECLabs</NavbarBrand>
          {/* Navbar toggle button for small screens */}
          <NavbarToggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
          {/* Offcanvas component for the offcanvas navigation */}
          <NavbarOffcanvas
            id={`offcanvasNavbar-expand-${'md'}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
            placement="start"
            style={navMenuStyle}
          >
            {/* Offcanvas header with close button */}
            <OffcanvasHeader closeButton>
              <OffcanvasTitle id={`offcanvasNavbarLabel-expand-${'md'}`} style={titleStyle}>
                TECLabs
              </OffcanvasTitle>
            </OffcanvasHeader>
            {/* Offcanvas body containing navigation links */}
            <OffcanvasBody>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink href="#action1" style={navLinkStyle}>Documentos</NavLink>
                <NavLink href="#action2" style={navLinkStyle}>Reportes</NavLink>
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Container>
      </Navbar>
      
  </>
  );
}

export default NavMenu