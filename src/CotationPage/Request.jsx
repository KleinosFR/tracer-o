import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { Form, Button } from "reactstrap";

function Request(handleDistance) {
    const [prov, setProv] = useState("");
    const [dest, setDest] = useState("");
    console.log("provenance", prov.place_id);
    console.log("destination", dest.place_id);

    return (
        <Form>
            <GooglePlacesAutocomplete
                autocompletionRequest={{
                    componentRestrictions: {
                        country: ["fr", "es", "pt"]
                    },
                    bebounce: 1000
                }}
                placeholder="Adresse de prise en charge"
                onSelect={setProv}
                required
                inputClassName="form-control"
            />

            <GooglePlacesAutocomplete
                autocompletionRequest={{
                    componentRestrictions: {
                        country: ["fr", "es", "pt"]
                    },
                    bebounce: 1000
                }}
                placeholder="Adresse de livraison"
                onSelect={setDest}
                required
                inputClassName="form-control"
            />

            <Button
                className="center"
                color="success"
                onClick={() => handleDistance(prov.place_id, dest.place_id)}
            >
                Calculer
            </Button>
        </Form>
    );
}

export default Request;
