import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import arrow from "../assets/arrow.png";
import SearchBar from "./searchBar";
import { Search } from "semantic-ui-react";

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="homepage-searchbar">
          <SearchBar />
        </div>
        <Grid>
          <div className="homepage-grid">
            <Row className="innergrid">
              <Col className="copy" id="enter">
                Enter Contract Address
              </Col>
              <Col className="arrow">
                <img src={arrow} />
              </Col>
              <Col className="copy">Check Poll Results</Col>
              <Col className="arrow">
                <img src={arrow} />
              </Col>
              <Col className="copy">Audit Voter Stats</Col>
            </Row>
          </div>
          <div className="footgrid"><Row>
                <div className="footer">
                  <Row>
                    <Col lg={12}>
                      <div className="foot">Source code audit, Functionality compliance check and Verified poll flagging coming soon!</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="foot">
                        To support us or to contribute to our token sale, visit <a href="http://electus.network">Electus Network</a>
                      </div>
                    </Col>
                  </Row>
                </div>
            </Row> </div>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
