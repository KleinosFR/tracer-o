import React from "react"
import {Row, Col} from "reactstrap"

import logo from "../assets/img/logo.png"


function Header () {

    return (
        <Row className="w-100 mb-4 pt-1 pb-xl-4 mx-auto bg-light align-items-center">
            <Col xs={12} lg={2}>
            <img width={"75%"} src={logo} alt="logo" />
            </Col>
            <Col xs={12} lg={2} className="align-items-center my-2">
        <h1 style={{color : "darkgreen"}} className="text-center"> TRACER-O </h1>
            </Col>
            <Col xs={12} lg={8}>
                <h2 className="text-center">Transport de Marchandises et de Colis Express</h2>
            
            </Col>
        </Row>
    )




}

export default Header