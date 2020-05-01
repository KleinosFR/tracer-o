import React from "react";
import { Row, Col } from "reactstrap";

import destinationMap from "../assets/img/zoneLivraison.jpg";
import "./content.css";

function Destination() {
    return (
        <Row className="my-3">
            <Col xl={11} lg={11} className="mt-5 mb-1 offset-xl-1 offset-lg-1">
                <h3>Notre zone de livraison</h3>
            </Col>
            <Col xl={2} lg={4} className="offset-xl-1 offset-lg-1">
                <img
                    width="100%"
                    src={destinationMap}
                    alt="zone de livraison transport Bayonne pays basque sud landes"
                    className="deliveryImg"
                />
            </Col>
            <Col xl={7} lg={6} className="text-justify align-self-start my-3">
                Notre société, basée en périphérie de Bayonne, est en mesure de
                livrer vos colis dans une zone qui s’étend de la frontière
                espagnole, dans les Pyrénées Atlantiques jusque dans les Landes
                voisines.
                <br />
                La possibilité de livrer des colis volumineux ou sur des
                distances plus longues sera étudiée au cas par cas afin de vous
                satisfaire au mieux.
            </Col>
        </Row>
    );
}

export default Destination;
