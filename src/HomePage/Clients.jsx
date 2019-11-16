import React from "react"
import {Row, Col} from "reactstrap"

import Client from "./Client"
import kayakLogo from "../assets/img/kayakweb.jpg"
import dooby from "../assets/img/dooby.jpg"
import zoz from "../assets/img/enzo.jpg"
import logoSudOuest from "../assets/img/logoSudOuest.jpg"


const clients = [
    {
        clientName : "Sud-Ouest",
        clientLogo : logoSudOuest
    },
    {
        clientName : "dooby",
        clientLogo : dooby
    },
    {
        clientName : "zoz",
        clientLogo : zoz
    },
    {
        clientName : "kayak",
        clientLogo : kayakLogo
    },
]


function Clients () {

    return(

        <Row className="my-5 w-100">
            <Col lg={12} className="m-5">
                <h3>Nos principaux clients</h3>
            </Col>
            <Row className="justify-content-around w-100">
            {clients.map(client => <Client {...client} />)}
            
            </Row>


        </Row>



    )



}

export default Clients