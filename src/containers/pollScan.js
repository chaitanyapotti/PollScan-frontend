import React, { Component } from "react";
import { connect } from "react-redux";

import { Divider } from "semantic-ui-react";

import SearchBar from "../components/searchBar";
import DetailedVoters from "../components/detailedVoters";
import AllActivities from "../components/allActivities";
import PollStats from "../components/pollStats";

class TokenWeightedPoll extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Divider />
        <PollStats />
        <Divider />
        <DetailedVoters />
        <Divider />
        <AllActivities />
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    data: globalData.data
  };
}

const myConnector = connect(mapStatesToProps);

export default myConnector(TokenWeightedPoll);
