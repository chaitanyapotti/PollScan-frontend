import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";

import {
  getName,
  getPollType,
  getVoterBaseLogic,
  getProposalsWithVotes
} from "../actions/searchBarActions";

class SearchBar extends Component {
  handleSearchTextChange = event => {
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: event.target.value
    });
  };

  handleSearchClick = event => {
    console.log("Search button clicked.");
    this.props.dispatch(getName(this.props.searchText));
    this.props.dispatch(getPollType(this.props.searchText));
    this.props.dispatch(getVoterBaseLogic(this.props.searchText));
    this.props.dispatch(getProposalsWithVotes(this.props.searchText));
  };

  render() {
    return (
      <div>
        <Input
          value={this.props.searchText}
          placeholder="Enter Poll Address..."
          labelPosition="right"
          iconPosition="left"
          onChange={this.handleSearchTextChange}
        />
        <Button content="Search" onClick={this.handleSearchClick} />
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    searchText: globalData.searchBarData.searchText
  };
}

const myConnector = connect(mapStatesToProps);

export default myConnector(SearchBar);
