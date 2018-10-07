import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Table, Icon, Button } from "semantic-ui-react";

import { getName, getPollType, getVoterBaseLogic, getProposalsWithVotes } from "../actions/searchBarActions";
import { getAllActivities } from "../actions/allActivitiesActions";

import "../styles/tableFooter.css";

const Limit = 1;

class DetailedVoters extends Component {
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
    console.log(window.location.href, this.props.selectedProposalName);
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query && "id" in queryUrl.query && "name" in queryUrl.query && this.props.selectedProposalName === "") {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch({
        type: "PROPOSAL_SELECTED",
        proposalid: queryUrl.query.id,
        proposalname: queryUrl.query.name
      });
      this.props.dispatch(getAllActivities(queryUrl.query.contract, queryUrl.query.id, queryUrl.query.name));
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
            <Table.Cell>{voter.datetime}</Table.Cell>
            <Table.Cell>{voter.weight}</Table.Cell>
          </Table.Row>
        );
      });
    }
  }

  render() {
    return (
      <Grid>
        <div className="detailed-voters-grid">
          <div className="back-to-poll">Back to the Poll</div>
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
            {Math.ceil(this.props.allVoters.length / Limit) > 1.0 ? this.addPageNumbers() : null}
          </Table>
          <button className="csv-button" onClick={this.handleSearchClick}>
            Download CSV
          </button>
        </div>
      </Grid>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    allVoters: globalData.allActivities.allVoters,
    selectedProposalName: globalData.allActivities.selectedProposalName,
    currentVoterPage: globalData.allActivities.currentVoterPage,
    searchText: globalData.searchBarData.searchText
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(DetailedVoters));
