import React from "react";
import { Row, Col } from "reactstrap";

import logoFull from "../assets/img/logo-tracer-o.png";

function Intro() {
    return (
        <Row>
            <Col
                xl={11}
                lg={11}
                xs={12}
                className="mt-5 offset-xl-1 offset-lg-1 offset-0"
            >
                <h3>Qui sommes nous ?</h3>
            </Col>
            <Col xl={2} lg={3} xs={12} className="offset-xl-1 offset-lg-1 my-4">
                <img
                    width="100%"
                    src={logoFull}
                    alt="Tracer-o Transporteur Colis Express bayonne pays basque sud landes"
                    className=""
                />
            </Col>
            <Col
                xl={8}
                lg={7}
                xs={12}
                className="text-justify d-flex flex-column justify-content-center"
            >
                <p>
                    Avec une expérience de près de 20 ans en livraison de
                    presse, l’entreprise TRACER-Ô se diversifie et se lance dans
                    la livraison de colis et dans la messagerie express.
                </p>
                <p>
                    Ayant le respect des délais comme objectif prioritaire, elle
                    mettra tout en oeuvre pour organiser vos livraisons au prix
                    le plus juste.
                </p>
                <p>
                    Vous pouvez dors et déjà obtenir un devis en ligne qui sera
                    précisé par retour de mail dans les plus brefs délais.
                </p>
            </Col>
        </Row>
    );
}

export default Intro;
