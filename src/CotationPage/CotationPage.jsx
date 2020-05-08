import React, { useState } from "react";
import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-google-places-autocomplete";
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    Spinner,
    Input,
    Label,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import Axios from "axios";
import { toast } from "react-toastify";

import Layout from "../Layout/Layout";
import CotationIntroText from "./CotationIntroText";
import calculation from "./calculation";
import CotationForm from "./CotationForm";

function CotationPage() {
    const [distance, SetDistance] = useState(0);
    const [cost, SetCost] = useState(0);
    const [prov, setProv] = useState("");
    const [dest, setDest] = useState("");
    const [provCoord, setProvCoord] = useState("");
    const [destCoord, setDestCoord] = useState("");
    const [duration, SetDuration] = useState(0);
    const [isCostCalculated, SetIsCostCalculated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVoid, setIsVoid] = useState(false);
    const [cargoWeight, setCargoWeight] = useState("");

    const handleProv = (provResult) => {
        setProv(provResult);
        geocodeByAddress(provResult)
            .then((results) => getLatLng(results[0]))
            .then((res) => {
                setProvCoord(`${res.lat},${res.lng}`);
            });
    };

    const handleDest = (destResult) => {
        setDest(destResult);
        geocodeByAddress(destResult)
            .then((results) => getLatLng(results[0]))
            .then((res) => {
                setDestCoord(`${res.lat},${res.lng}`);
            });
    };

    const handleDistance = () => {
        let distanceVar = 0;
        let durationVar = 0;
        if (destCoord === "" || provCoord === "") {
            setIsVoid(true);
        } else {
            setIsVoid(false);
            setIsLoading(true);
            Axios.get(
                `https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix`,
                {
                    headers: {
                        "content-type": "application/octet-stream",
                        "x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
                        "x-rapidapi-key":
                            "0bbcb96186msh0b9fd431da4fd2ap143412jsnda868713ef1d",
                    },
                    params: {
                        destinations: destCoord,
                        origins: provCoord,
                    },
                }
            )
                .then(async (response) => {
                    const calcDistance = response.data.distances[0];
                    const calcDuration = response.data.durations[0];
                    await SetDistance(calcDistance[0] / 1000);
                    await SetDuration(Math.round(calcDuration[0] / 60));
                    distanceVar = calcDistance[0] / 1000;
                    durationVar = Math.round(calcDuration[0] / 60);
                })

                .then(async () => {
                    const calcCost = await calculation(
                        distanceVar,
                        cargoWeight
                    );
                    await SetCost(calcCost);
                })

                // ****** TODO - manage API error *****
                .catch((err) => {
                    toast.error(
                        <Col>
                            Impossible de trouver l'adresse, merci de réessayer
                            plus tard
                        </Col>,
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                        }
                    );
                })
                .finally(() => {
                    SetIsCostCalculated(true);
                    setIsLoading(false);
                });
        }
    };

    return (
        <Layout>
            <CotationIntroText />

            {/* ----Retrieving addresses---- */}
            <Container
                className="border my-3"
                id="cotationContainer"
                style={{ minHeight: "55vh" }}
            >
                <Form className="my-3 col-12">
                    <h4
                        style={{ fontFamily: "Roboto", fontSize: "28px" }}
                        className="text-center my-4"
                    >
                        Estimez votre coût de transport
                    </h4>
                    <Row>
                        <GooglePlacesAutocomplete
                            autocompletionRequest={{
                                componentRestrictions: {
                                    country: ["fr", "es"],
                                },
                                bebounce: 1000,
                            }}
                            placeholder="Adresse de prise en charge"
                            onSelect={(res) => handleProv(res.description)}
                            required
                            inputClassName="form-control my-2 col-12 offset-xl-3 col-xl-6"
                        />
                        <GooglePlacesAutocomplete
                            autocompletionRequest={{
                                componentRestrictions: {
                                    country: ["fr", "es"],
                                },
                                bebounce: 1000,
                            }}
                            placeholder="Adresse de livraison"
                            onSelect={(res) => handleDest(res.description)}
                            required
                            inputClassName="form-control my-2 col-12 offset-xl-3 col-xl-6"
                        />
                        <InputGroup className="my-2 col-12 offset-xl-4 col-xl-4">
                            <Input
                                placeholder="Poids de la marchandise"
                                type="text"
                                name="cargoWeight"
                                value={cargoWeight}
                                invalid={
                                    cargoWeight > 500 ||
                                    (cargoWeight !== "" && isNaN(cargoWeight))
                                }
                                valid={(cargoWeight <= 500) & (cargoWeight > 0)}
                                required
                                onChange={(e) => setCargoWeight(e.target.value)}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>Kg</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Row>
                    <Row>
                        <Col className="my-2 text-center">
                            <Button
                                className="center"
                                color="success"
                                onClick={() => handleDistance(prov, dest)}
                                disabled={
                                    !dest ||
                                    !prov ||
                                    !cargoWeight ||
                                    isNaN(cargoWeight)
                                }
                            >
                                Calculer
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {/* --- Display message if address are void---  */}
                {isVoid ? (
                    <Row>
                        <Col className="text-center text-danger m-5">
                            {" "}
                            Attention, vous n'avez pas saisi d'adresse
                        </Col>
                    </Row>
                ) : (
                    <> </>
                )}

                {/* --- Display spinner while fetching api---  */}

                {isLoading ? (
                    <Row className="dflex justify-content-center">
                        <Col
                            lg={4}
                            xl={4}
                            className="d-flex justify-content-around"
                        >
                            <Spinner type="grow" color="primary" />
                            <Spinner type="grow" color="secondary" />
                            <Spinner type="grow" color="success" />
                            <Spinner type="grow" color="danger" />
                            <Spinner type="grow" color="warning" />
                            <Spinner type="grow" color="info" />
                            <Spinner type="grow" color="light" />
                            <Spinner type="grow" color="dark" />
                        </Col>
                    </Row>
                ) : (
                    <> </>
                )}
                {/* --- Displaying Results---  */}

                {!isCostCalculated ? (
                    <> </>
                ) : (
                    <Row>
                        <Col
                            xl={6}
                            xs={10}
                            className="text-center offset-1 my-2 offset-xl-3"
                            style={{
                                fontSize: "12px",
                                color: "red",
                                border: "1px solid",
                            }}
                        >
                            Cette estimation n'a aucune valeur contractuelle. Le
                            devis définitif vous sera confirmé en réponse au
                            formulaire ci-dessous.
                        </Col>
                        <Col xl={12} className="text-center my-2">
                            Distance de transport estimée : {distance} Km
                        </Col>
                        <Col xl={5} className="text-center my-2 offset-1">
                            Cout estimé de la livraison : {cost} € HT
                        </Col>
                        <Col xl={5} className="text-center my-2">
                            Cout estimé de la livraison :{" "}
                            {Math.round((cost + cost * 0.2) * 100) / 100} € TTC
                        </Col>

                        <CotationForm
                            duration={duration}
                            distance={distance}
                            cost={cost}
                            prov={prov}
                            dest={dest}
                            weight={cargoWeight}
                        />
                    </Row>
                )}
            </Container>
        </Layout>
    );
}

export default CotationPage;
