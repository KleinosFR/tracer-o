import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Router from "./Router";

const App = () => {
    return (
        <div>
            <Router />
            <ToastContainer />
        </div>
    );
};

export default App;
