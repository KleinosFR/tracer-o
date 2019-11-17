import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';
import {useHistory} from "react-router-dom"

import "./footer.css"

function Footer (props) {

let history=useHistory()

const handleLink = (path) =>{

    history.push(path)
}


  return (
    <footer id="footer" className="">
        <Navbar color="light" light expand="lg" className="">
            <NavbarBrand className="col-12 col-lg-1">TRACER-O</NavbarBrand>
            <Nav className="mr-auto col-12 col-lg-6 justify-content-center my-2" navbar>
                <NavItem>
                    <NavLink onClick={() => handleLink("/")}>Accueil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Contact</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Devis en ligne</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Mentions légales</NavLink>
                </NavItem>

            </Nav>
            <Nav className="ml-auto col-lg-4 my-2" navbar>
                <NavItem>
                    Made with ❤ by <a className="text-dark" href="https://stephane-lavaud.dev">Stéphane LAVAUD</a>  - All rights reserved 2019
                </NavItem>
            </Nav>
            
        </Navbar>
    </footer>
  );
}

export default Footer;