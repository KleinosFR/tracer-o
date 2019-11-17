import React from "react"
import {Col} from "reactstrap"


function Client ({clientName, clientLogo }) {

    return (
        <Col xl={2} lg={4} xs={6}>
            <figure>
                <img 
                src={clientLogo} 
                alt={clientName}
                width="100%"
                />
                <figcaption>{clientName}</figcaption>
            </figure>
        </Col>

    )



}

export default Client