import React from "react"
import {Row, Col} from "reactstrap"

import logoFull from "../assets/img/logofull.png"

function Intro () {

    return(

        <Row>
            <Col xl={11} lg={11} xs={12} className="mt-5 offset-xl-1 offset-lg-1 offset-0">
                <h3>Qui sommes nous ?</h3>
            </Col>
            <Col xl={2} lg={3} xs={12} className="offset-xl-1 offset-lg-1 my-4">
                <img width="100%" src={logoFull} alt="Tracer-o Transport de Marchandises et de Colis Express" className=""/>
            </Col>
            <Col xl={8} lg={7} xs={12} className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, eaque fuga unde veniam nobis aliquam mollitia animi earum modi natus ipsum tempore necessitatibus aut temporibus reprehenderit nesciunt libero? Neque, recusandae sit! Voluptates, asperiores. Totam doloremque, eius, nobis, animi labore distinctio maiores deserunt eum ex dolor at temporibus atque ipsam vero minus? Id, vero fugit error illo quas numquam aliquid neque voluptas laboriosam, assumenda odio itaque corporis optio, eius ab esse ipsam quam blanditiis enim? Dolorum sed obcaecati libero vel. Sunt, aliquam. Aut corporis culpa, commodi qui nulla sapiente officia sint a temporibus ut inventore, nemo et ab numquam, dolorem velit?
            </Col>
        </Row>



    )



}

export default Intro