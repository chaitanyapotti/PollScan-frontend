import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import arrow from "../assets/arrow.png";

class HomePage extends Component{
    render() {
        return(
            <Grid>
                <div className="homepage-grid">
                <Row className="innergrid">
                    <Col className="copy" id="enter" >Enter Contract Address</Col>
                    <Col className="arrow"> <img src={arrow}/> </Col>
                    <Col className="copy">Check Poll Results</Col>
                    <Col className="arrow"> <img src={arrow}/> </Col>
                    <Col className="copy">Audit Voter Stats</Col>
                </Row>
                <div className="footer">
                <Row className="foot"><div>Source code audit, Functionality compliance check and Verified poll flaging coming soon!</div> </Row>
                <Row className="foot"><div>To support us or to contribute to our token-sale, visit <a href='http://electus.network'>Electus Network</a></div> </Row>
                </div>
                </div>
                
            </Grid>

        )
    }
}

export default HomePage;