import React, { useState } from "react";
import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-google-places-autocomplete";
import { Form, Button, Row, Col, Container, Spinner } from "reactstrap";
import Axios from "axios";

import Layout from "../Layout/Layout";
import CotationIntroText from "./CotationIntroText";
import calculation from "./calculation";
import CotationForm from "./CotationForm";

// const convertAddressToLatLng = (address) => {

//     let geocoded = {}

//     geocodeByAddress(address)
//     .then(results => getLatLng(results[0]))
//     .then((res) => {geocoded =  {lat : res.lat, lng : res.lng}
// })
// console.log("geocoded", geocoded)
// return (geocoded)

// }

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

    const handleProv = provResult => {
        setProv(provResult);
        geocodeByAddress(provResult)
            .then(results => getLatLng(results[0]))
            .then(res => {
                setProvCoord(`${res.lat},${res.lng}`);
            });
    };

    const handleDest = destResult => {
        setDest(destResult);
        geocodeByAddress(destResult)
            .then(results => getLatLng(results[0]))
            .then(res => {
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
                            "0bbcb96186msh0b9fd431da4fd2ap143412jsnda868713ef1d"
                    },
                    params: {
                        destinations: destCoord,
                        origins: provCoord
                    }
                }
            )
                .then(async response => {
                    console.log(response);
                    const calcDistance = response.data.distances[0];
                    const calcDuration = response.data.durations[0];
                    console.log("distance en km", calcDistance[0] / 1000);
                    await SetDistance(calcDistance[0] / 1000);
                    await SetDuration(Math.round(calcDuration[0] / 60));
                    distanceVar = calcDistance[0] / 1000;
                    durationVar = Math.round(calcDuration[0] / 60);
                })

                .then(async () => {
                    const calcCost = await calculation(
                        distanceVar,
                        durationVar
                    );
                    await SetCost(calcCost);
                    console.log("cost", cost);
                })
                .catch(err => {
                    console.log(err);
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
                style={{ minHeight: "70vh" }}
            >
                <Form className="my-3 col-10 offset-1">
                    <h4
                        style={{ fontFamily: "Roboto", fontSize: "28px" }}
                        className="text-center my-4"
                    >
                        Estimez votre coût de transport
                    </h4>
                    <GooglePlacesAutocomplete
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ["fr", "es"]
                            },
                            bebounce: 1000
                        }}
                        placeholder="Adresse de prise en charge"
                        onSelect={res => handleProv(res.description)}
                        required
                        inputClassName="form-control my-2 col-12 offset-xl-3 col-xl-6"
                    />
                    <GooglePlacesAutocomplete
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ["fr", "es"]
                            },
                            bebounce: 1000
                        }}
                        placeholder="Adresse de livraison"
                        onSelect={res => handleDest(res.description)}
                        required
                        inputClassName="form-control my-2 col-12 offset-xl-3 col-xl-6"
                    />
                    <Row>
                        <Col className="my-2 text-center">
                            <Button
                                className="center"
                                color="success"
                                onClick={() => handleDistance(prov, dest)}
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
                    <Row className="justify-content-center">
                        <Col>
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
                        <Col xl={12} className="text-center my-2">
                            Distance de transport estimée : {distance} Km
                        </Col>
                        <Col xl={4} className="text-center my-2 offset-2">
                            Cout estimé de la livraison : {cost} € HT
                        </Col>
                        <Col xl={4} className="text-center my-2">
                            Cout estimé de la livraison :{" "}
                            {Math.round((cost + cost * 0.2) * 100) / 100} € TTC
                        </Col>

                        <CotationForm
                            duration={duration}
                            distance={distance}
                            cost={cost}
                        />
                    </Row>
                )}
            </Container>
        </Layout>
    );
}

export default CotationPage;
