import React from "react"
import {Row, Col} from "reactstrap"

import logoFull from "../assets/img/logofull.png"

function Intro () {

    return(

        <Row>
            <Col lg={12} className="my-5">
                <h3>Qui sommes nous ?</h3>
            </Col>
            <Col lg={2} className="offset-lg-1">
                <img width="100%" src={logoFull} alt="logo" className=""/>
            </Col>
            <Col lg={8} className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, eaque fuga unde veniam nobis aliquam mollitia animi earum modi natus ipsum tempore necessitatibus aut temporibus reprehenderit nesciunt libero? Neque, recusandae sit! Voluptates, asperiores. Totam doloremque, eius, nobis, animi labore distinctio maiores deserunt eum ex dolor at temporibus atque ipsam vero minus? Id, vero fugit error illo quas numquam aliquid neque voluptas laboriosam, assumenda odio itaque corporis optio, eius ab esse ipsam quam blanditiis enim? Dolorum sed obcaecati libero vel. Sunt, aliquam. Aut corporis culpa, commodi qui nulla sapiente officia sint a temporibus ut inventore, nemo et ab numquam, dolorem velit?
            </Col>
        </Row>



    )



}

export default Intro