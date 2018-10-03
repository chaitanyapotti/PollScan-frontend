import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';

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
    this.props.history.push({ pathname: `/contract`, search: "?contract=" + this.props.searchText });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12} xs={12}>
            <div className="search">
              <Input value={this.props.searchText} placeholder="Enter Poll Address..." onChange={this.handleSearchTextChange} className="search-input" />
              <Button content="Search" onClick={this.handleSearchClick} className="search-button"/>
            </div>
          </Col>
        </Row>
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
