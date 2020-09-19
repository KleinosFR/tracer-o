/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  GoogleMap, DistanceMatrixService, LoadScript, Autocomplete, DirectionsRenderer, DirectionsService
} from '@react-google-maps/api';
import { toast } from 'react-toastify';

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Spinner,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap';
import Layout from '../Layout/Layout';
import CotationIntroText from './CotationIntroText';
import calculation from './calculation';
import CotationForm from './CotationForm';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const libraries = ['places'];
const restrictCountries = {country: ['fr', 'es']};

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 43.492949,
  lng: -1.474841
};

const secondsToFormatedTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().substr(11, 8);
  return time;
};

function CotationPage() {
  const [distance, SetDistance] = useState(0);
  const [cost, SetCost] = useState(0);
  const [prov, setProv] = useState('');
  const [dest, setDest] = useState('');
  const [duration, SetDuration] = useState(0);
  const [isCostCalculated, SetIsCostCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const [cargoWeight, setCargoWeight] = useState('');
  const [autocompleteProv, setAutocompleteProv] = useState(null);
  const [autocompleteDest, setAutocompleteDest] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(null);

  const onLoadProv = (autocomplete) => {
    setAutocompleteProv(autocomplete);
  };

  const onLoadDest = (autocomplete) => {
    setAutocompleteDest(autocomplete);
  };

  const handleProv = () => {
    if (autocompleteProv) {
      const provResult = autocompleteProv.getPlace();
      setProv(provResult.formatted_address);
    }
  };

  const handleDest = () => {
    if (autocompleteDest) {
      const destResult = autocompleteDest.getPlace();
      setDest(destResult.formatted_address);
    }
  };

  const handleSubmit = async () => {
    if (dest === '' || prov === '') {
      setIsVoid(true);
    } else {
      setIsSubmitted(true);
      setIsVoid(false);
      setIsLoading(true);
      try {
        const calcCost = await calculation(distance, cargoWeight);
        SetCost(calcCost);
        console.log(calcCost);
      } catch (error) {
        toast.error(
          <Col>
            Impossible de trouver calculer le coût, merci de réessayer
            plus tard
          </Col>,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          }
        );
      } finally {
        setIsLoading(false);
        SetIsCostCalculated(true);
      }
    }
  };

  return (
    <Layout>
      <CotationIntroText />

      {/* ----Retrieving addresses---- */}
      <Container className="border my-3" id="cotationContainer" style={{ minHeight: '55vh' }}>
        <LoadScript googleMapsApiKey={googleApiKey} libraries={libraries}>
          <Form className="my-3 col-12">
            <h4 style={{ fontFamily: 'Roboto', fontSize: '28px' }} className="text-center my-4">
              Estimez votre coût de transport
            </h4>

            <Autocomplete onPlaceChanged={handleProv} onLoad={onLoadProv} restrictions={restrictCountries}>
              <input
                type="text"
                placeholder="Adresse de prise en charge"
                className=" form-control my-2 col-12 offset-xl-3 col-xl-6"
              />
            </Autocomplete>
            <Autocomplete onPlaceChanged={handleDest} onLoad={onLoadDest} restrictions={restrictCountries}>
              <input
                type="text"
                placeholder="Adresse de destination"
                className=" form-control my-2 col-12 offset-xl-3 col-xl-6"
              />
            </Autocomplete>
            <Row>

              <InputGroup className="my-2 col-12 offset-xl-4 col-xl-4">
                <Input
                  placeholder="Poids de la marchandise"
                  type="text"
                  name="cargoWeight"
                  value={cargoWeight}
                  invalid={cargoWeight > 500 || (cargoWeight !== '' && isNaN(cargoWeight))}
                  valid={!!((cargoWeight <= 500) & (cargoWeight > 0))}
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
                  onClick={() => handleSubmit()}
                  disabled={!dest || !prov || !cargoWeight || isNaN(cargoWeight)}
                >
                  Calculer
                </Button>
              </Col>
            </Row>
          </Form>

          <GoogleMap id="map" mapContainerStyle={containerStyle} center={center} zoom={10}>
            <DistanceMatrixService
              options={{
                destinations: [dest],
                origins: [prov],
                travelMode: 'DRIVING'
              }}
              callback={(res, stat) => {
                if (res.rows[0].elements[0]?.distance?.value) {
                  SetDistance(res.rows[0].elements[0]?.distance?.value / 1000);
                  SetDuration(secondsToFormatedTime(res.rows[0].elements[0]?.duration?.value));
                }
              }}
            />
            {
              (
                dest !== ''
                && prov !== '' && !direction
              ) && (
                <DirectionsService
                  // required
                  options={{
                    destination: dest,
                    origin: prov,
                    travelMode: 'DRIVING'
                  }}
                  // required
                  callback={(value) => setDirection(value)}
                />
              )
            }
            {isSubmitted && (
            <DirectionsRenderer
              options={{
                directions: direction
              }}
            />
            )}
          </GoogleMap>
        </LoadScript>

        {/* --- Display message if address are void---  */}
        {isVoid && (
          <Row>
            <Col className="text-center text-danger m-5">
              Attention, vous n'avez pas saisis d'adresse
            </Col>
          </Row>
        ) }

        {/* --- Display spinner while fetching api---  */}

        {isLoading ? (
          <Row className="dflex justify-content-center">
            <Col lg={4} xl={4} className="d-flex justify-content-around">
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
                fontSize: '12px',
                color: 'red',
                border: '1px solid'
              }}
            >
              Cette estimation n'a aucune valeur contractuelle. Le devis définitif vous sera
              confirmé en réponse au formulaire ci-dessous.
            </Col>
            <Col xl={12} className="text-center my-2">
              Distance de transport estimée :
              {' '}
              {distance}
              {' '}
              Km
            </Col>
            <Col xl={5} className="text-center my-2 offset-1">
              Cout estimé de la livraison :
              {' '}
              {cost}
              {' '}
              € HT
            </Col>
            <Col xl={5} className="text-center my-2">
              Cout estimé de la livraison :
              {' '}
              {Math.round((cost + cost * 0.2) * 100) / 100}
              {' '}
              € TTC
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
