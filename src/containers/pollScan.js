import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

import { Modal } from "semantic-ui-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import SearchBar from "../components/searchBar";
import DetailedVoters from "../components/detailedVoters";
import AllActivities from "../components/allActivities";
import PollStats from "../components/pollStats";
import HomePage from "../components/homePage";

class TokenWeightedPoll extends Component {
  constructor(props) {
    super(props);
    this.handleModalDoneAction = this.handleModalDoneAction.bind(this);
  }

  handleModalDoneAction(event) {
    this.props.dispatch({ type: "CLOSE_API_ERROR_MODAL" });
    this.props.history.push({ pathname: `/` });
  }

  render() {
    return (
      <div>
        {this.props.showWrongAddressModal ? (
          <Modal
            open={this.props.showWrongAddressModal === true}
            header="Incompatible address!"
            content="The address you provided is either invalid, or belongs to a non-compliant smart contract."
            actions={[{ key: "done", content: "Done", positive: true }]}
            onActionClick={this.handleModalDoneAction}
          />
        ) : null}

        <main className="mainClass">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <SearchBar />
                  <HomePage/>
                </div>
              )}
            />

            <Route
              path="/voters"
              render={() => (
                <div>
                  <SearchBar />
                  <DetailedVoters />
                </div>
              )}
            />

            <Route
              path="/contract"
              render={() => (
                <div>
                  <SearchBar />
                  <PollStats />
                </div>
              )}
            />

            <Route
              path="/events"
              render={() => (
                <div>
                  <SearchBar />
                  <AllActivities />
                </div>
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    showWrongAddressModal: globalData.searchBarData.showWrongAddressModal
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(TokenWeightedPoll));
