import React from "react";
import { Row, Col } from "reactstrap";

import destinationMap from "../assets/img/kayakweb.jpg";

function Destination() {
    return (
        <Row className="my-5">
            <Col xl={11} lg={11} className="mt-5 mb-1 offset-xl-1 offset-lg-1">
                <h3>Notre zone de livraison</h3>
            </Col>
            <Col xl={3} lg={4} className="offset-xl-1 offset-lg-1">
                <img
                    width="100%"
                    src="https://www.touradour.com/torent/images/france-aquitaine-torent.png"
                    alt="zone de livraison pays basque sud landes"
                    className=""
                />
            </Col>
            <Col xl={7} lg={6} className="text-justify align-self-start">
                Nous sommes capables de livrer vos colis dans une zone qui
                s’étend de la frontière espagnole, dans les Pyrénées Atlantiques
                jusque dans les Landes voisines. La possibilité de livrer des
                colis volumineux ou sur des distances plus longues sera étudiée
                au cas par cas pour satisfaire le client.
            </Col>
        </Row>
    );
}

export default Destination;
