import React from "react";
import {Row, Col, Form, Label, Input, FormGroup, Button} from "reactstrap";



const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    }

class ContactContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "", 
            email: "", 
            phone: "", 
            message: "",
            isSent : false,
            isError : false,
            isEmailValid : false,
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
        const { name, email, message, phone} = this.state;
        return (
        <Row className="w-100">
                <h3 className="col-10 offset-1 text-center my-5">Contactez-nous</h3>
            <Row>
                <p className="col-8 offset-2 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus iusto veniam dignissimos, facere autem aspernatur sunt voluptatum cum, ipsam dolores nam dolor mollitia assumenda explicabo ipsa ab modi quo voluptatibus repellendus necessitatibus voluptatem culpa voluptate libero in? Nostrum, expedita et? Sint nisi consequuntur quis cumque tempore eius tenetur architecto cupiditate!
                </p>
            </Row>
            <Row className="w-100">
                <Col xl={12} className="justify-content-center my-5">
                    <Form onSubmit={this.handleSubmit} className="col-10 justify-content-center offset-1">
                        <FormGroup row>
                        <Label className="col-4 offset-4">
                            Nom: <Input type="text" name="name" value={name} valid={name.length>3 ? true : false} required onChange={this.handleChange} />
                        </Label>
                        <Label className="col-4 offset-4">
                            Adresse e-mail : <Input type="email" name="email" valid={email.includes("@") && email.includes(".") ? true : false} required value={email} onChange={this.handleChange} />
                        </Label>
                        <Label className="col-4 offset-4">
                            Téléphone: <Input type="text" name="phone" value={phone} required onChange={this.handleChange} />
                        </Label>
                        <Label className="col-4 offset-4">
                            Message: <Input type="textarea" name="message" required value={message} onChange={this.handleChange} />
                        </Label>
                            <Col xs={12} className="text-center my-5">
                                <Button color="success" type="submit" className="text-white">Envoyer</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Row>
        );
    }
    }


export default ContactContent