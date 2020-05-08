import React from "react";
import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { toast } from "react-toastify";

const encode = (data) => {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
};

class CotationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
            cargoKind: "",
            cargoWeight: this.props.weight,
            cargoDimensions: "",
            provenance: this.props.prov,
            destination: this.props.dest,
            cotationCost: this.props.cost,
            cotationDuration: this.props.duration,
            cotationDistance: this.props.distance,
            isSent: false,
            isError: false,
            isEmailValid: false,
        };
    }

    handleSubmit = (e) => {
        const message = {
            nom: this.state.name,
            email: this.state.email,
            telephone: this.state.phone,
            message: this.state.message,
            marchandise: this.state.cargoKind,
            poids: this.state.cargoWeight,
            dimensions: this.state.cargoDimensions,
            provenance: this.state.provenance,
            destination: this.state.destination,
            distanceTransport: this.state.cotationDistance,
            tempsTransport: this.state.cotationDuration,
            montantCalcul: this.state.cotationCost,
        };

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "demandeDevis", ...message }),
        })
            .then(() =>
                toast.success(
                    <Col>
                        Votre demande de devis a bien été envoyée, nous vous
                        répondrons dans les plus brefs délais
                    </Col>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                )
            )
            .catch((error) =>
                toast.error(
                    <Col>
                        Votre demande n'a pas pu être envoyée. Veuillez essayer
                        un peu plus tard, ou nous contacter par téléphone
                    </Col>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    }
                )
            );

        e.preventDefault();
    };

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {
            name,
            email,
            message,
            phone,
            cargoDimensions,
            cargoKind,
        } = this.state;
        return (
            <Row>
                <h3 className="col-xl-10 offset-xl-1 text-center my-3 ">
                    Confirmez votre demande de devis
                </h3>
                <Row>
                    <Col
                        xl={10}
                        xs={10}
                        className="justify-content-center my-2 offset-1"
                    >
                        <Form
                            onSubmit={this.handleSubmit}
                            className="justify-content-center"
                        >
                            <FormGroup row>
                                <Label className="col-xl-8 offset-xl-2">
                                    Nom:{" "}
                                    <Input
                                        type="text"
                                        name="name"
                                        value={name}
                                        valid={name.length > 3 ? true : false}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-5 offset-xl-1">
                                    Adresse e-mail :{" "}
                                    <Input
                                        type="email"
                                        name="email"
                                        valid={
                                            email.includes("@") &&
                                            email.includes(".")
                                                ? true
                                                : false
                                        }
                                        required
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-5">
                                    Téléphone:{" "}
                                    <Input
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        invalid={
                                            (phone.length < 10) & (phone !== "")
                                        }
                                        valid={
                                            phone.length >= 10 ? true : false
                                        }
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-5 offset-xl-1">
                                    Nature de la marchandise:{" "}
                                    <Input
                                        type="text"
                                        name="cargoKind"
                                        value={cargoKind}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-5 ">
                                    Dimension de la marchandise:{" "}
                                    <Input
                                        type="text"
                                        name="cargoDimensions"
                                        value={cargoDimensions}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-10 offset-xl-1">
                                    Message:{" "}
                                    <Input
                                        type="textarea"
                                        name="message"
                                        required
                                        value={message}
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Col xs={12} className="text-center my-5">
                                    <Button
                                        color="success"
                                        type="submit"
                                        className="text-white"
                                    >
                                        Envoyer votre demande
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Row>
        );
    }
}

export default CotationForm;
