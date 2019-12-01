import React, {useState} from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {Form, Button} from "reactstrap"
import axios from "axios";
import {} from "google-maps-react"

import Layout from "../Layout/Layout"
import CotationIntroText from "./CotationIntroText";



function CotationPage() {

    const [distance, SetDistance] = useState(0)
    const [prov, setProv] = useState("")
    const [dest, setDest] = useState("")
    const apiKey = "AIzaSyCGhfvByiykJT6P9V2R_cuCN3vWzRUJQrk"

const handleDistance = (provId, destId) => {

    console.log(provId, destId)



    }

return(
    <Layout>
        
        <CotationIntroText />

        <Form>
            <GooglePlacesAutocomplete 
                autocompletionRequest={{
                    componentRestrictions : {
                        country : ['fr', 'es']
                        },
                    bebounce : 1000,
                    }} 
                placeholder="Adresse de prise en charge"  
                onSelect={setProv}
                required
                inputClassName = "form-control" />
            <GooglePlacesAutocomplete 
                autocompletionRequest={{
                    componentRestrictions : {
                        country : ['fr', 'es']
                        },
                    bebounce : 1000
                    }} 
                placeholder="Adresse de livraison"  
                onSelect={setDest}
                required
                inputClassName = "form-control" />
            <Button className="center" color="success" onClick={() => handleDistance(prov.place_id, dest.place_id)}>Calculer</Button>
        </Form>


        

    </Layout>

)



}

export default CotationPage