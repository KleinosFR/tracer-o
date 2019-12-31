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
        clientName : "Dooby de les bétises",
        clientLogo : dooby
    },
    {
        clientName : "Enzo Geekman",
        clientLogo : zoz
    },
    {
        clientName : "Princesse Raiponce du Kayakland",
        clientLogo : kayakLogo
    },
]


function Clients () {

    return(
        <Row className="my-5">
            <Col xl={11} lg={11} xs={12} className="my-xl-2 my-2 offset-xl-1 offset-lg-1">
                <h3>Nos principaux clients</h3>
            </Col>
            <Col xl={10} lg={10} xs={12} className="offset-xl-1 offset-1">
                <Row className="justify-content-around w-100">
                    {clients.map(client => <Client {...client} />)}
                </Row>
            </Col>
        </Row>
    )
}

export default Clients