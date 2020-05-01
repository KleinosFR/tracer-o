import React from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

function CotationIntroText() {
    return (
        <Row
            xs={10}
            md={10}
            lg={12}
            xl={12}
            className="d-flex col my-5 justify-content-center col-xl-10 col-10 col-md-10 offset-1 offset-xl-1"
        >
            <h3 className="text-center">
                Nous vous offrons la possibilité d'obtenir une estimation du
                coût de transport de votre marchandise.
            </h3>
            <p className="text-left">
                <br />
                Attention, cette estimation n'est valable que pour vos colis
                d'un poids maximum de 500 Kg, et d'une dimension maximale de
                50cm X 50cm X 50cm. <br /> Pour tout colis au delà de ces
                dimensions veuillez nous contacter directement via notre{" "}
                <Link to="/contact" style={{ color: "darkgreen" }}>
                    formulaire de contact
                </Link>
            </p>
        </Row>
    );
}

export default CotationIntroText;
