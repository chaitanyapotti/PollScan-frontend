import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { CSVLink } from "react-csv";
import { Table, Loader } from "semantic-ui-react";

import { getEntityData } from "../../actions/entityActions";
import back from "../../assets/back.png";

const Limit = 10;

class EntityAdminActivities extends Component {
  componentDidMount() {
    console.log(window.location.href, this.props.searchText);
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query && this.props.searchText === "") {
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
      this.props.dispatch(getEntityData(queryUrl.query.contract));
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
            type: "ENTITY_ACTIVITIES_PAGE_CHANGED",
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
        .map((activity, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{activity.address}</Table.Cell>
              <Table.Cell> {new Date(parseInt(activity.timeStamp) * 1000).toLocaleString("en-GB")}</Table.Cell>
              <Table.Cell>{activity.type}</Table.Cell>
              <Table.Cell>{<a>View</a>}</Table.Cell>
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

  prepareCSVData(allActivities) {
    let data = [];
    for (let i = 0; i < allActivities.length; i++) {
      let row = {};
      row["Address"] = allActivities[i].address;
      row["Timestamp"] = new Date(parseInt(allActivities[i].timeStamp) * 1000).toLocaleString("en-GB");
      row["Type"] = allActivities[i].type;
      data.push(row);
    }
    return data;
  }

  render() {
    let csvData = this.prepareCSVData(this.props.allActivities);
    return (
      <div>
        <div className="back-to-poll" onClick={this.handleOnClick}>
          <img src={back} /> Back to Entity
        </div>
        {this.props.showActivityLoader ? (
          <Loader active={this.props.showActivityLoader} />
        ) : this.props.allActivitesRetrievedSuccessfully ? (
          <div>
            <Grid>
              <div className="activities-grid">
                <div className="activity-log">Admin Activity</div>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={4}>Address</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Datetime</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Activity</Table.HeaderCell>
                      <Table.HeaderCell width={1}>View</Table.HeaderCell>
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
                <div className="button-float" style={{ marginLeft: "10px" }}>
                  <button className="csv-button">
                    <CSVLink data={csvData} filename={"all-activities.csv"}>
                      <div className="white">Download CSV</div>
                    </CSVLink>
                  </button>
                </div>
                <div className="button-float">
                  <button className="csv-button">
                    <div className="white">Filter Activities</div>
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

const mapStatesToProps = states => {
  return {
    allMembers: states.entityData.allMembers,
    allActivities: states.entityData.allActivities,
    showActivityLoader: states.entityData.showActivityLoader,
    allActivitesRetrievedSuccessfully: states.entityData.allActivitesRetrievedSuccessfully,
    searchText: states.searchBarData.searchText,
    currentActivityPage: states.entityData.currentActivityPage
  };
};

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(EntityAdminActivities));
