import React from "react"
import {Col} from "reactstrap"

import "./header.css"



function Header () {

    return (
        <header className="row w-100 mb-2 pt-5 py-lg-3 py-xl-4 pb-xl-2 mx-auto align-items-center">
            <Col xs={12} lg={4} xl={5} className="align-items-center offset-lg-1 offset-xl-0 mt-5 mt-lg-0 mt-xl-0">
        <h1 style={{color : "green"}} className="text-center"> TRACER-O </h1>
            </Col>
            <Col xs={12} lg={6} xl={7}>
                <h2 className="text-center">Transport de Marchandises et de Colis Express</h2>
            
            </Col>
        </header>
    )




}

export default Header