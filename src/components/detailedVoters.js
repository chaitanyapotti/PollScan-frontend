import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Table, Loader } from "semantic-ui-react";

import {
  getName,
  getPollType,
  getVoterBaseLogic,
  getProposalsWithVotes,
  getStartTime,
  getEndTime,
  getVoterBaseDenominator,
  getVoteTalliesWeighted
} from "../actions/searchBarActions";
import { getAllActivities } from "../actions/allActivitiesActions";

import "../styles/tableFooter.css";
import back from "../assets/back.png";

const Limit = 10;

class DetailedVoters extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  addPageNumbers() {
    return (
      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"BreakView"}
          pageCount={Math.ceil(this.props.allVoters.length / Limit)}
          initialPage={this.props.currentVoterPage}
          forcePage={this.props.currentVoterPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={data => {
            this.props.dispatch({
              type: "VOTERS_PAGE_CHANGED",
              payload: parseInt(data.selected)
            });
          }}
          containerClassName={"pagination"}
          subContainerClassName={"paginationPage"}
          activeClassName={"active"}
        />
      </div>
    );
  }

  componentWillMount() {
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query && "id" in queryUrl.query && "name" in queryUrl.query && this.props.selectedProposalName === "All") {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch({
        type: "PROPOSAL_NAME_SELECTED",
        payload: queryUrl.query.name
      });
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch(getStartTime(queryUrl.query.contract));
      this.props.dispatch(getEndTime(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseDenominator(queryUrl.query.contract));
      this.props.dispatch(getVoteTalliesWeighted(queryUrl.query.contract));
      // this.props.dispatch({
      //   type: "PROPOSAL_SELECTED",
      //   proposalid: queryUrl.query.id,
      //   proposalname: queryUrl.query.name
      // });
      this.props.dispatch(getAllActivities(queryUrl.query.contract, queryUrl.query.id, queryUrl.query.name));
    } else if ("contract" in queryUrl.query && "id" in queryUrl.query && "name" in queryUrl.query) {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch(getAllActivities(queryUrl.query.contract, queryUrl.query.id, queryUrl.query.name));
      this.props.dispatch(getStartTime(queryUrl.query.contract));
      this.props.dispatch(getEndTime(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseDenominator(queryUrl.query.contract));
      this.props.dispatch(getVoteTalliesWeighted(queryUrl.query.contract));
    } else if ("contract" in queryUrl.query) {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch(getAllActivities(queryUrl.query.contract));
      this.props.dispatch(getStartTime(queryUrl.query.contract));
      this.props.dispatch(getEndTime(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseDenominator(queryUrl.query.contract));
      this.props.dispatch(getVoteTalliesWeighted(queryUrl.query.contract));
    }
  }

  handleSearchTextChange(event) {
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: event.target.value
    });
  }

  addTableRowsDynamically() {
    if (this.props.allVoters.length > 0) {
      return this.props.allVoters.slice(this.props.currentVoterPage * Limit, (this.props.currentVoterPage + 1) * Limit).map((voter, index) => {
        return (
          <Table.Row key={index}>
            <Table.Cell>{voter.address}</Table.Cell>
            <Table.Cell>{new Date(parseInt(voter.datetime) * 1000).toLocaleString("en-GB")}</Table.Cell>
            <Table.Cell>{voter.weight}</Table.Cell>
          </Table.Row>
        );
      });
    } else {
      return this.props.showActivityLoader ? null : (
        <Table.Row key={145} className="reload">
          Voters list could not be retrieved, please try reloading the page.
        </Table.Row>
      );
    }
  }

  handleOnClick() {
    this.props.history.push({
      pathname: `/contract`,
      search: "?contract=" + this.props.searchText
    });
    this.props.dispatch({
      type: "SHOW_ACTIVITY_LOADER",
      payload: ""
    });
  }

  render() {
    return (
      <div>
        <div className="back-to-poll" onClick={this.handleOnClick}>
          <img src={back} /> Back to the Poll
        </div>
        {this.props.showActivityLoader ? (
          <Loader active={this.props.showActivityLoader} />
        ) : this.props.allActivitesRetrievedSuccessfully ? (
          <div>
            <Grid>
              <div className="detailed-voters-grid">
                <div className="proposal-voters">'{this.props.selectedProposalName}' Voters</div>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Address</Table.HeaderCell>
                      <Table.HeaderCell>Vote Date & Time</Table.HeaderCell>
                      <Table.HeaderCell>Vote Weight</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.addTableRowsDynamically()}</Table.Body>
                </Table>
                <Row>
                  <Col>{Math.ceil(this.props.allVoters.length / Limit) > 1.0 ? this.addPageNumbers() : null}</Col>
                </Row>
              </div>
            </Grid>
            <Grid>
              <div className="button-grid">
                <div className="button-float">
                  <button className="csv-button" onClick={this.handleSearchClick}>
                    Download CSV
                  </button>
                </div>
              </div>
            </Grid>
          </div>
        ) : (
          <div className="reload-page">Voters could not be retrieved, please try reloading the page.</div>
        )}
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    allVoters: globalData.allActivities.allVoters,
    selectedProposalName: globalData.allActivities.selectedProposalName,
    currentVoterPage: globalData.allActivities.currentVoterPage,
    searchText: globalData.searchBarData.searchText,
    showActivityLoader: globalData.allActivities.showActivityLoader,
    allActivitesRetrievedSuccessfully: globalData.allActivities.allActivitesRetrievedSuccessfully
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(DetailedVoters));
