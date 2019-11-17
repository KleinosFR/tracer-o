import React from "react"
import {Row} from "reactstrap"

import "./navbar.css"

function Navbar() {

    return(
    <nav>    
        <Row id="navbarRow" className="">
            <ul className="row p-0">
                <li className="col-2 my-3"><h4 className="text-left">Accueil</h4></li>
                <li className="col-2 my-3"><h4 className="text-left">Contact</h4></li>
                <li className="col-2 my-3"><h4 className="text-left">Devis en ligne</h4></li>
            </ul>    
        </Row>
    </nav> 
        


    )



}

export default Navbar