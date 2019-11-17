import React from "react"
import {Col} from "reactstrap"


function Client ({clientName, clientLogo }) {

    return (
        <Col xl={2} lg={3} xs={6}>
            <figure>
                <img 
                src={clientLogo} 
                alt={clientName}
                width="100%"
                />
                <figcaption className="text-center">{clientName}</figcaption>
            </figure>
        </Col>

    )



}

export default Client