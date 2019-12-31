import React from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

function CotationIntroText() {
    return (
        <Row className="d-flex col my-5 justify-content-center">
            <p className="text-justify">
                Nous vous offrons la possibilité d'obtenir une estimation du
                coût de transport de votre marchandise.
            </p>
            <p>
                Attention, cette estimation n'est valable que pour vos colis
                d'un poids maximum de 50 Kg, et d'une dimension maximale de 50cm
                X 50cm X 50cm.
            </p>
            <p>
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
