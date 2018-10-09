import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Table, Loader } from "semantic-ui-react";

import { getName, getPollType, getVoterBaseLogic, getProposalsWithVotes } from "../actions/searchBarActions";
import { getAllActivities } from "../actions/allActivitiesActions";

import "../styles/tableFooter.css";

import back from "../assets/back.png";
import blue_back from "../assets/back_on_hover.png";
const Limit = 10;

class AllActivities extends Component {
  componentWillMount() {
    console.log(window.location.href, this.props.searchText);
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query && this.props.searchText === "") {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch(getAllActivities(queryUrl.query.contract));
    }
  }

  addPageNumbers() {
    return (
      <ReactPaginate
        breakLabel={<a href="">...</a>}
        breakClassName={"BreakView"}
        pageCount={Math.ceil(this.props.allActivities.length / Limit)}
        initialPage={this.props.currentActivityPage}
        forcePage={this.props.currentActivityPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={data => {
          this.props.dispatch({
            type: "ACTIVITIES_PAGE_CHANGED",
            payload: parseInt(data.selected)
          });
        }}
        containerClassName={"pagination"}
        subContainerClassName={"paginationPage"}
        activeClassName={"active"}
        previousClassName={"previous"}
      />
    );
  }

  addTableRowsDynamically() {
    if (this.props.allActivities.length > 0) {
      return this.props.allActivities
        .slice(this.props.currentActivityPage * Limit, (this.props.currentActivityPage + 1) * Limit)
        .map((voter, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{voter.address}</Table.Cell>
              <Table.Cell>{voter.type}</Table.Cell>
              <Table.Cell>{voter.datetime}</Table.Cell>
              <Table.Cell>{voter.weight}</Table.Cell>
              <Table.Cell>{voter.value}</Table.Cell>
            </Table.Row>
          );
        });
    } else {
      return this.props.showActivityLoader ? null : (
        <Table.Row key={145} className="reload">
          Activities could not be retrieved, please try reloading the page.
        </Table.Row>
      );
    }
  }

  render() {
    return (
      <div>
        <Loader active={this.props.showActivityLoader} />
        <div className="back-to-poll" onClick> <img src={back}/>  Back to the Poll</div>
        <Grid>
          <div className="activities-grid">
            <div className="activity-log">Activity Log</div>
            <Table basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Transaction Date & Time</Table.HeaderCell>
                  <Table.HeaderCell>Size</Table.HeaderCell>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.addTableRowsDynamically()}</Table.Body>
            </Table>
            <Row>
              <Col>{Math.ceil(this.props.allActivities.length / Limit) > 1.0 ? this.addPageNumbers() : null}</Col>
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
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    allActivities: globalData.allActivities.allActivities,
    currentActivityPage: globalData.allActivities.currentActivityPage,
    searchText: globalData.searchBarData.searchText,
    showActivityLoader: globalData.allActivities.showActivityLoader
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(AllActivities));
