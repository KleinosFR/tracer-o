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
            className="d-flex col my-5 justify-content-center col-xl-12 col-10 col-md-10 offset-1 offset-xl-0"
        >
            <p className="text-left">
                Nous vous offrons la possibilité d'obtenir une estimation du
                coût de transport de votre marchandise.
            </p>
            <p className="text-left">
                Attention, cette estimation n'est valable que pour vos colis
                d'un poids maximum de 50 Kg, et d'une dimension maximale de 50cm
                X 50cm X 50cm.
            </p>
            <p className="text-left">
                Pour tout colis au delà de ces dimensions veuillez nous
                contacter directement via notre{" "}
                <Link to="/contact" style={{ color: "darkgreen" }}>
                    formulaire de contact
                </Link>
            </p>
        </Row>
    );
}

export default CotationIntroText;
