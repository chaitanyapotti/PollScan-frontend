import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { CSVLink } from "react-csv";

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

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
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
      this.props.dispatch(getStartTime(queryUrl.query.contract));
      this.props.dispatch(getEndTime(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseDenominator(queryUrl.query.contract));
      this.props.dispatch(getVoteTalliesWeighted(queryUrl.query.contract));
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
              <Table.Cell> {new Date(parseInt(voter.datetime) * 1000).toLocaleString("en-GB")}</Table.Cell>
              <Table.Cell>{voter.weight}</Table.Cell>
              <Table.Cell>{voter.value}</Table.Cell>
            </Table.Row>
          );
        });
    } else {
      return (
        <Table.Row key={145} className="reload">
          Activities could not be retrieved, please try reloading the page.
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

  prepareCSVData(allActivities) {
    let data = [];
    for (let i = 0; i < allActivities.length; i++) {
      let row = {};
      row["Address"] = allActivities[i].address;
      row["Type"] = allActivities[i].type;
      row["Timestamp"] = new Date(parseInt(allActivities[i].datetime) * 1000).toLocaleString("en-GB");
      row["Size"] = allActivities[i].weight;
      row["Value"] = allActivities[i].value;
      data.push(row);
    }
    return data;
  }

  render() {
    let csvData = this.prepareCSVData(this.props.allActivities);
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
              <div className="activities-grid">
                <div className="activity-log">Activity Log</div>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={4}>Address</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Type</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Timestamp</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Size</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Value</Table.HeaderCell>
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
                  <button className="csv-button"> 
                    <CSVLink data={csvData} filename={"all-activities.csv"}>
                    <div className="white">
                    Download CSV
                    </div>
                    </CSVLink>
                  </button>
                </div>
              </div>
            </Grid>
          </div>
        ) : (
          <div className="reload-page">Activities could not be retrieved, please try reloading the page.</div>
        )}
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    allActivities: globalData.allActivities.allActivities,
    currentActivityPage: globalData.allActivities.currentActivityPage,
    searchText: globalData.searchBarData.searchText,
    showActivityLoader: globalData.allActivities.showActivityLoader,
    allActivitesRetrievedSuccessfully: globalData.allActivities.allActivitesRetrievedSuccessfully
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(AllActivities));
