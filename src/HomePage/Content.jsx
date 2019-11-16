import React from "react"
import {Container} from "reactstrap"

import "./content.css"
import Intro from "./Intro"
import Destination from "./Destination"
import Clients from "./Clients"

function HomeContent () {

    return(
        <Container fluid className="">
            <Intro />
            <Destination />
            <Clients />


        </Container>
    )




}

export default HomeContent