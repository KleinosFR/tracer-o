import React from "react"
import {Row} from "reactstrap"
import {Link} from "react-router-dom"

import "./navbar.css"

function Navbar() {

    return(
    <nav>    
        <Row id="navbarRow" className="">
            <h4 id="menuTitle">Menu</h4>
            <ul className="row p-0">
                <li className="col-2 my-3"><Link to="/"><h4 className="text-left">Accueil</h4></Link></li>
                <li className="col-2 my-3"> <Link to="/contact"><h4 className="text-left">Contact</h4></Link></li>
                <li className="col-2 my-3"><h4 className="text-left">Devis en ligne</h4></li>
            </ul>    
        </Row>
    </nav> 
        


    )



}

export default Navbar