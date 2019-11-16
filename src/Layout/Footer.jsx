import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';

import "./footer.css"

const Footer = (props) => {

  return (
    <footer id="footer" className="w-100">
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
    </footer>
  );
}

export default Footer;