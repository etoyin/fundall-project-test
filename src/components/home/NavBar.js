import React from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import {ReactComponent as Logo} from '../../logo.svg';

export default function NavBar() {
  return (
    <div>
        <Navbar bg="transparent" expand="lg">
            <Container className='navbar-custom' >
                <Navbar.Brand href="#home" className="logo">
                  <Logo />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
        
                  </Nav>
                  <Nav>
                      <Nav.Link href="/login">
                      <div className='login'>
                          LOGIN
                        </div>
                      </Nav.Link>
                      <Nav.Link href="/sign-up">
                        <div className='signUp'>
                          SIGN UP
                        </div>
                      </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
