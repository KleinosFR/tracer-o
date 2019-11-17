import React from "react"
import {Container} from "reactstrap"

import "./content.css"
import Intro from "./Intro"
import Destination from "./Destination"
import Clients from "./Clients"

function HomeContent () {

    return(
        <Container fluid style={{maxWidth : "99%"}} className="m-0 p-0">
            <Intro />
            <Destination />
            <Clients />


        </Container>
    )




}

export default HomeContent