import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid } from "react-flexbox-grid";
import { getName, getPollType, getVoterBaseLogic, getProposalsWithVotes } from "../actions/searchBarActions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchTextChange(event) {
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: event.target.value
    });
  }

  handleSearchClick(event) {
    console.log("Search button clicked.");
    // this.props.history.push({pathname:`/voters`, search: '?contract='+this.props.searchText })
    this.props.dispatch(getName(this.props.searchText));
    this.props.dispatch(getPollType(this.props.searchText));
    this.props.dispatch(getVoterBaseLogic(this.props.searchText));
    this.props.dispatch(getProposalsWithVotes(this.props.searchText));
    this.props.history.push({
      pathname: `/contract`,
      search: "?contract=" + this.props.searchText
    });
  }

  render() {
    return (
      <Grid>
        <div className="search">
          <input
            className="search-input"
            spellcheck="false"
            value={this.props.searchText}
            placeholder="Enter Poll Address"
            onChange={this.handleSearchTextChange}
          />
          <button className="search-button" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
      </Grid>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    searchText: globalData.searchBarData.searchText
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(SearchBar));
