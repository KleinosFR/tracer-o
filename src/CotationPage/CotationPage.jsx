import React, {useState} from "react"
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {Form, Button} from "reactstrap"
import Axios from "axios"



import Layout from "../Layout/Layout"
import CotationIntroText from "./CotationIntroText";
import calculation from "./calculation";

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

    const [distance, SetDistance] = useState(0)
    const [cost, SetCost] = useState(0)
    const [prov, setProv] = useState("")
    const [dest, setDest] = useState("")
    const [provCoord, setProvCoord] = useState("")
    const [destCoord, setDestCoord] = useState("")

    const apiKey = "AIzaSyCGhfvByiykJT6P9V2R_cuCN3vWzRUJQrk"

    const handleProv = (provResult) => {

        setProv(provResult);
        geocodeByAddress(provResult)
        .then(results => getLatLng(results[0]))
        .then((res) => {setProvCoord (`${res.lat},${res.lng}`)
        })
    }

    const handleDest = (destResult) => {

        setDest(destResult);
        geocodeByAddress(destResult)
        .then(results => getLatLng(results[0]))
        .then((res) => {setDestCoord (`${res.lat},${res.lng}`)
        })
    }

    const handleDistance = () => {

        let distanceVar = 0
        let durationVar = 0

        Axios.get(`https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix`, 
            {
            headers: {
                "content-type":"application/octet-stream",
                "x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
                "x-rapidapi-key": "0bbcb96186msh0b9fd431da4fd2ap143412jsnda868713ef1d"
            },
            params : {
                "destinations" : destCoord,
                "origins" : provCoord
            }
        })
        .then(async response => {
            console.log(response)
            const calcDistance = response.data.distances[0]
            const calcDuration = response.data.durations[0]
            console.log("distance en km", calcDistance[0]/1000 );
            await SetDistance(calcDistance[0]/1000)
            distanceVar = calcDistance[0]/1000
            durationVar = Math.round(calcDuration[0]/60)

        })
        .catch(err => {
            console.log(err);
        })
        .then( async () =>{

            const calcCost = await calculation(distanceVar, durationVar)
            await SetCost(calcCost);
            console.log("cost", cost);
            }
        )   
        
        }


return(
    <Layout>

        <CotationIntroText />

    {/* ----Retrieving addresses---- */}

        <Form>
            <GooglePlacesAutocomplete 
                autocompletionRequest={{
                    componentRestrictions : {
                        country : ['fr', 'es']
                        },
                    bebounce : 1000,
                    }} 
                placeholder="Adresse de prise en charge"  
                onSelect={res => handleProv(res.description)}
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
                onSelect={res => handleDest(res.description)}
                required
                inputClassName = "form-control" />
            <Button className="center" color="success" onClick={() => handleDistance(prov, dest)}>Calculer</Button>
        </Form>
        {distance === 0 ? <> </> :
        <>
        <p>Distance de transport estimée : {distance} Km</p>
        <p>Cout estimé de la livraison : {cost} € HT</p>
        <p>Cout estimé de la livraison : {(Math.round((cost+cost*0.2)*100))/100} € TTC</p>


        </>
        }



    </Layout>
    

)



}

export default CotationPage;