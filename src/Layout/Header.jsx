import React from "react"
import {Row, Col} from "reactstrap"


function Header () {

    return (
        <Row className="w-100 my-3">
            <Col xs={12} lg={2}>
        <h1 style={{color : "darkgreen"}} className="text-center"> TRACER-O </h1>
            </Col>
            <Col lg={10} xs={12}>
                <h2 className="text-center">Transport de Marchandises et de Colis Express</h2>
            
            </Col>
        </Row>
    )




}

export default Header