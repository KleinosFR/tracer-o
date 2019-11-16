import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const Footer = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <Navbar color="light" light expand="xs" className="">
            <NavbarBrand>TRACER-O</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink>Accueil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Contact</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Devis en ligne</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    Made with ❤ by Stéphane LAVAUD  - All rights reserved 2019
                </NavItem>
            </Nav>
            
        </Navbar>
    </div>
  );
}

export default Footer;