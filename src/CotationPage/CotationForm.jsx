import React from "react";
import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";

const encode = data => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
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
            cargoWeight: "",
            cargoDimensions: "",
            isSent: false,
            isError: false,
            isEmailValid: false,
            cotationCost: this.props.cost,
            cotationDuration: this.props.duration,
            cotationDistance: this.props.distance
        };
    }

    /* Here’s the juicy bit for posting the form submission */

    handleSubmit = e => {
        /* Check possibility to include yup librairy */

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "cotation", ...this.state })
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {
            name,
            email,
            message,
            phone,
            cargoDimensions,
            cargoKind,
            cargoWeight
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
                                <Label className="col-xl-5 offset-xl-1">
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
                                <Label className="col-xl-5">
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
                                <Label className="col-xl-5 offset-xl-3">
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
                                <Label className="col-xl-5">
                                    Poids de la marchandise (Kg):{" "}
                                    <Input
                                        type="text"
                                        name="cargoWeight"
                                        value={cargoWeight}
                                        invalid={cargoWeight > 50}
                                        valid={
                                            (cargoWeight <= 50) &
                                            (cargoWeight > 0)
                                        }
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-xl-5 offset-xl-3">
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
