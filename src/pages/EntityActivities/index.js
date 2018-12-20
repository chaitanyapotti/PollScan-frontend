import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { CSVLink } from "react-csv";
import { Table, Loader, Checkbox } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import { getEntityData } from "../../actions/entityActions";
import back from "../../assets/back.png";

import "react-datepicker/dist/react-datepicker.css";

const Limit = 10;

class EntityActivitiesFilters extends Component {
  processEntityActivitiesFilters = () => {
    this.props.dispatch({
      type: "PROCESS_ENTITY_ACTIVITIES_FILTERS",
      payload: null
    });
  };

  handleChangeStart = newStartDate => {
    this.props.dispatch({
      type: "ENTITY_ACTIVITIES_START_DATE_SELECTED",
      payload: newStartDate
    });
  };

  handleChangeEnd = newEndDate => {
    this.props.dispatch({
      type: "ENTITY_ACTIVITIES_END_DATE_SELECTED",
      payload: newEndDate
    });
  };

  resetEntityFilters = () => {
    this.props.dispatch({
      type: "RESET_ENTITY_FILTERS",
      payload: null
    });
  };

  assignedCheckBoxClicked = () => {
    this.props.dispatch({
      type: "ASSIGNED_CHECK_BOX_CLICKED",
      payload: !this.props.assignedCheckBoxStatus
    });
  };

  approvedCheckBoxClicked = () => {
    this.props.dispatch({
      type: "APPROVED_CHECK_BOX_CLICKED",
      payload: !this.props.approvedCheckBoxStatus
    });
  };

  revokedCheckBoxClicked = () => {
    this.props.dispatch({
      type: "REVOKED_CHECK_BOX_CLICKED",
      payload: !this.props.revokedCheckBoxStatus
    });
  };

  render() {
    return (
      <Grid>
        <div className="activities-grid">
          <div className="activity-log">
            Filter Admin Activities
            <div>{this.props.allActivities.length} Activities</div>
            <Row className="activity-log">
              <Col>
                <br />
                <div>Activity Dates</div>
                <DatePicker
                  selected={this.props.startDate}
                  selectsStart
                  startDate={this.props.startDate}
                  endDate={this.props.endDate}
                  onChange={this.handleChangeStart}
                />

                <DatePicker
                  selected={this.props.endDate}
                  selectsEnd
                  startDate={this.props.startDate}
                  endDate={this.props.endDate}
                  onChange={this.handleChangeEnd}
                />
              </Col>
              <Col>
                <br />
                <Row>Activity</Row>
                <Row>
                  <Checkbox label={{ children: "Assigned" }} onClick={this.assignedCheckBoxClicked} checked={this.props.assignedCheckBoxStatus} />
                  <Checkbox label={{ children: "Approved" }} onClick={this.approvedCheckBoxClicked} checked={this.props.approvedCheckBoxStatus} />
                  <Checkbox label={{ children: "Revoked" }} onClick={this.revokedCheckBoxClicked} checked={this.props.revokedCheckBoxStatus} />
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <div className="button-grid">
            <div className="button-float" style={{ marginLeft: "10px" }}>
              <button className="csv-button" onClick={this.processEntityActivitiesFilters}>
                <div className="white">Done</div>
              </button>
            </div>
            <div className="button-float">
              <button className="csv-button" onClick={this.resetEntityFilters}>
                <div className="white">Reset</div>
              </button>
            </div>
          </div>
        </Row>
      </Grid>
    );
  }
}

class EntityActivities extends Component {
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

  addPageNumbers = () => (
    <ReactPaginate
      breakLabel={<a href="">...</a>}
      breakClassName="BreakView"
      pageCount={Math.ceil(this.props.allActivitiesArray.length / Limit)}
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
      containerClassName="pagination"
      subContainerClassName="paginationPage"
      activeClassName="active"
      previousClassName="previous"
    />
  );

  addTableRowsDynamically = () => {
    if (this.props.allActivities.length > 0) {
      return this.props.allActivitiesArray
        .slice(this.props.currentActivityPage * Limit, (this.props.currentActivityPage + 1) * Limit)
        .map((activity, index) => (
          <Table.Row key={index}>
            <Table.Cell>{activity[0]}</Table.Cell>
            <Table.Cell> {new Date(parseInt(activity[1]) * 1000).toUTCString("en-GB")}</Table.Cell>
            <Table.Cell>{activity[2]}</Table.Cell>
            <Table.Cell>{<a>View</a>}</Table.Cell>
          </Table.Row>
        ));
    }
    return (
      <Table.Row key={145} className="reload">
        Activities could not be retrieved, please try reloading the page.
      </Table.Row>
    );
  };

  prepareCSVData = allActivities => {
    const data = [];
    for (let i = 0; i < allActivities.length; i++) {
      const row = {};
      row.Address = allActivities[i].address;
      row.Timestamp = new Date(parseInt(allActivities[i].timeStamp) * 1000).toUTCString("en-GB");
      row.Type = allActivities[i].type;
      data.push(row);
    }
    return data;
  };

  showEntityActivitiesFilterClicked = () => {
    this.props.dispatch({
      type: "SHOW_ENTITY_ACTIVITY_FILTERS",
      payload: true
    });
  };

  handleBackButtonClick = () => {
    this.props.history.push({
      pathname: `/entity`,
      search: `?contract=${this.props.searchText}`
    });
  };

  render() {
    const csvData = this.prepareCSVData(this.props.allActivities);
    return (
      <div>
        {this.props.showActivityFilters ? (
          <EntityActivitiesFiltersConnected />
        ) : (
          <div>
            <div className="back-to-poll" onClick={this.handleBackButtonClick}>
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
                        <CSVLink data={csvData} filename="all-activities.csv">
                          <div className="white">Download CSV</div>
                        </CSVLink>
                      </button>
                    </div>
                    <div className="button-float">
                      <button onClick={this.showEntityActivitiesFilterClicked} className="csv-button">
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
        )}
      </div>
    );
  }
}

const mapStatesToProps = states => ({
  allActivities: states.entityData.allActivities,
  allActivitiesArray: states.entityData.allActivitiesArray,
  showActivityLoader: states.entityData.showActivityLoader,
  allActivitesRetrievedSuccessfully: states.entityData.allActivitesRetrievedSuccessfully,
  searchText: states.searchBarData.searchText,
  currentActivityPage: states.entityData.currentActivityPage,
  showActivityFilters: states.entityData.showActivityFilters,
  startDate: states.entityData.startDate,
  endDate: states.entityData.endDate,
  assignedCheckBoxStatus: states.entityData.assignedCheckBoxStatus,
  approvedCheckBoxStatus: states.entityData.approvedCheckBoxStatus,
  revokedCheckBoxStatus: states.entityData.revokedCheckBoxStatus
});

const myConnector = connect(mapStatesToProps);

const EntityActivitiesFiltersConnected = myConnector(EntityActivitiesFilters);

export default withRouter(myConnector(EntityActivities));
