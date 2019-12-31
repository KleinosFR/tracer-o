import React from "react"
import {Switch, Route, BrowserRouter} from "react-router-dom"

import HomePage from "./HomePage/Page"
import ContactPage from "./ContactPage/ContactPage"
import CotationPage from "./CotationPage/CotationPage"


function Router () {


return(

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/devis" component={CotationPage} />
        </Switch>
    </BrowserRouter>
)
}


export default Router