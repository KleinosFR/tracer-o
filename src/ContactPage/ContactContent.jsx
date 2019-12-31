import React from "react";
import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";

const encode = data => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
};

class ContactContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
            isSent: false,
            isError: false,
            isEmailValid: false
        };
    }

    /* Here’s the juicy bit for posting the form submission */

    handleSubmit = e => {
        /* Check possibility to include yup librairy */

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...this.state })
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, email, message, phone } = this.state;
        return (
            <Row className="w-100">
                <h3 className="col-10 offset-1 text-center my-5">
                    Contactez-nous
                </h3>
                <Row className="col-xl-6 offset-xl-3 mt-xl-3 col-12 offset-1">
                    <p className="text-center">
                        Envoyez nous un message et nous reviendrons vers vous
                        dans les plus brefs délais
                    </p>
                </Row>
                <Row className="w-100">
                    <Col
                        xl={12}
                        className="justify-content-center my-xl-5 my-2"
                    >
                        <Form
                            onSubmit={this.handleSubmit}
                            className="col-10 justify-content-center offset-1"
                        >
                            <FormGroup row>
                                <Label className="col-12 col-xl-4 offset-1 offset-xl-4">
                                    Nom:
                                    <Input
                                        type="text"
                                        name="name"
                                        value={name}
                                        valid={name.length > 3 ? true : false}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-12 col-xl-4 offset-1 offset-xl-4">
                                    Adresse e-mail :
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
                                <Label className="col-12 col-xl-4 offset-1 offset-xl-4">
                                    Téléphone:{" "}
                                    <Input
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Label>
                                <Label className="col-12 col-xl-4 offset-1 offset-xl-4">
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
                                        className="text-white col-6 offset-2 col-xl-2 offset-xl-0"
                                    >
                                        Envoyer
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

export default ContactContent;
