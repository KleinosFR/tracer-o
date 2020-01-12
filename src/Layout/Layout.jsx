import React from "react";
import { Col } from "reactstrap";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            <Col xs={12} className="">
                {children}
            </Col>
            <Footer />
        </>
    );
}

export default Layout;
