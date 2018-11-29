import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { CSVLink } from "react-csv";
import { Table, Loader, Dropdown, Checkbox } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import { getEntityData } from "../../actions/entityActions";
import back from "../../assets/back.png";
import "react-datepicker/dist/react-datepicker.css";

const Limit = 10;

class EntityMembersFilters extends Component {
  processEntityMemberFilters = () => {
    this.props.dispatch({
      type: "PROCESS_ENTITY_MEMBERS_FILTERS",
      payload: null
    });
  };

  handleChangeStart = newStartDate => {
    this.props.dispatch({
      type: "ENTITY_MEMBERS_START_DATE_SELECTED",
      payload: newStartDate
    });
  };

  handleChangeEnd = newEndDate => {
    this.props.dispatch({
      type: "ENTITY_MEMBERS_END_DATE_SELECTED",
      payload: newEndDate
    });
  };

  resetEntityMemberFilters = () => {
    this.props.dispatch({
      type: "RESET_ENTITY_MEMBER_FILTERS",
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

  prepareOptions = optionList => {
    let tempList = [];
    for (let i in optionList) {
      tempList.push({ key: optionList[i], value: optionList[i], text: optionList[i] });
    }
    return tempList;
  };

  optionsSelected = (index, attributeName, event, data) => {
    console.log("logging: ", index, attributeName, data.value);
    this.props.dispatch({
      type: "ENTITY_MEMBER_FILTER_OPTIONS_SELECTED",
      payload: null,
      filterIndex: index,
      attributeName: attributeName,
      filterOptions: data.value
    });
  };

  populateFilters = () => {
    return Object.keys(this.props.attributeDetails).map((attributeName, index) => {
      return (
        <Row>
          {attributeName}
          <Dropdown
            key={index}
            clearable
            fluid
            multiple
            search
            selection
            onChange={this.optionsSelected.bind(this, index, attributeName)}
            options={this.prepareOptions(this.props.attributeDetails[attributeName])}
            placeholder={`Select ${attributeName}`}
          />
        </Row>
      );
    });
  };

  render() {
    return (
      <Grid>
        <div className="activities-grid">
          <div className="activity-log">
            Filter Members
            <div>{this.props.memberListArray.length} Members</div>
            <Row className="activity-log">
              <Col>
                <br />
                <div>Joining Date Range</div>
                <DatePicker
                  selected={this.props.memberFilterStartDate}
                  selectsStart
                  startDate={this.props.memberFilterStartDate}
                  endDate={this.props.memberFilterEndDate}
                  onChange={this.handleChangeStart}
                />

                <DatePicker
                  selected={this.props.memberFilterEndDate}
                  selectsEnd
                  startDate={this.props.memberFilterStartDate}
                  endDate={this.props.memberFilterEndDate}
                  onChange={this.handleChangeEnd}
                />
              </Col>
            </Row>
            <br />
            <Row>Filters</Row>
            {this.populateFilters()}
          </div>
        </div>
        <Row>
          <div className="button-grid">
            <div className="button-float" style={{ marginLeft: "10px" }}>
              <button className="csv-button" onClick={this.processEntityMemberFilters}>
                <div className="white">Done</div>
              </button>
            </div>
            <div className="button-float">
              <button className="csv-button" onClick={this.resetEntityMemberFilters}>
                <div className="white">Reset</div>
              </button>
            </div>
          </div>
        </Row>
      </Grid>
    );
  }
}

class EntityMembers extends Component {
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

  addPageNumbers = () => {
    return (
      <ReactPaginate
        breakLabel={<a href="">...</a>}
        breakClassName={"BreakView"}
        pageCount={Math.ceil(this.props.memberListArray.length / Limit)}
        initialPage={this.props.currentMemberPage}
        forcePage={this.props.currentMemberPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={data => {
          this.props.dispatch({
            type: "ENTITY_MEMBERS_PAGE_CHANGED",
            payload: parseInt(data.selected)
          });
        }}
        containerClassName={"pagination"}
        subContainerClassName={"paginationPage"}
        activeClassName={"active"}
        previousClassName={"previous"}
      />
    );
  };

  addAttributesDynamically = row => {
    let temp = row.slice();
    temp.splice(0, 3);
    temp.pop();
    return temp.map((elements, index) => {
      return <Table.Cell>{elements}</Table.Cell>;
    });
  };

  addTableRowsDynamically = () => {
    if (this.props.memberListArray.length > 0) {
      return this.props.memberListArray
        .slice(this.props.currentMemberPage * Limit, (this.props.currentMemberPage + 1) * Limit)
        .map((member, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{member[0]}</Table.Cell>
              <Table.Cell> {new Date(parseInt(member[1]) * 1000).toLocaleString("en-GB")}</Table.Cell>
              {this.addAttributesDynamically(member)}
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
  };

  prepareCSVData = (memberList, attributeHeaders) => {
    let data = [];
    for (let i = 0; i < memberList.length; i++) {
      let row = {};
      row["Address"] = memberList[i].address;
      row["Timestamp"] = new Date(parseInt(memberList[i].timeStamp) * 1000).toLocaleString("en-GB");
      for (let j = 0; j < attributeHeaders.length; j++) {
        row[attributeHeaders[j]] = memberList[i][attributeHeaders[j]];
      }
      row["revoked"] = memberList[i].revoked.toString();
      data.push(row);
    }
    return data;
  };

  populateHeaders = () => {
    if (this.props.attributeHeaders.length > 0) {
      return this.props.attributeHeaders.map((attributeName, index) => {
        return <Table.HeaderCell width={2}>{attributeName}</Table.HeaderCell>;
      });
    } else {
      return null;
    }
  };

  showEntityMembersFilterClicked = () => {
    this.props.dispatch({
      type: "SHOW_ENTITY_MEMBERS_FILTERS",
      payload: true
    });
  };

  handleBackButtonClick = () => {
    this.props.history.push({
      pathname: `/entity`,
      search: "?contract=" + this.props.searchText
    });
  };

  render() {
    let csvData = this.prepareCSVData(this.props.memberList, this.props.attributeHeaders);
    return (
      <div>
        {this.props.showMemberFilters ? (
          <EntityMembersFiltersConnected />
        ) : (
          <div>
            <div className="back-to-poll" onClick={this.handleBackButtonClick}>
              <img src={back} /> Back to Entity
            </div>
            {this.props.showAllMembersLoader ? (
              <Loader active={this.props.showAllMembersLoader} />
            ) : this.props.memberListRetrievedSuccessfully ? (
              <div>
                <Grid>
                  <div className="activities-grid">
                    <div className="activity-log">Entity Members</div>
                    <Table basic>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={4}>Address</Table.HeaderCell>
                          <Table.HeaderCell width={3}>Datetime</Table.HeaderCell>
                          {this.populateHeaders()}
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>{this.addTableRowsDynamically()}</Table.Body>
                    </Table>
                    <Row>
                      <Col>{Math.ceil(this.props.memberListArray.length / Limit) > 1.0 ? this.addPageNumbers() : null}</Col>
                    </Row>
                  </div>
                </Grid>
                <Grid>
                  <div className="button-grid">
                    <div className="button-float" style={{ marginLeft: "10px" }}>
                      <button className="csv-button">
                        <CSVLink data={csvData} filename={"all-members.csv"}>
                          <div className="white">Download CSV</div>
                        </CSVLink>
                      </button>
                    </div>
                    <div className="button-float">
                      <button className="csv-button" onClick={this.showEntityMembersFilterClicked}>
                        <div className="white">Filter Members</div>
                      </button>
                    </div>
                  </div>
                </Grid>
              </div>
            ) : (
              <div className="reload-page">Memberlist could not be retrieved, please try reloading the page.</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStatesToProps = states => {
  return {
    memberList: states.entityData.memberList,
    memberListArray: states.entityData.memberListArray,
    showAllMembersLoader: states.entityData.showAllMembersLoader,
    memberListRetrievedSuccessfully: states.entityData.memberListRetrievedSuccessfully,
    searchText: states.searchBarData.searchText,
    currentMemberPage: states.entityData.currentMemberPage,
    attributeHeaders: states.entityData.attributeHeaders,
    showMemberFilters: states.entityData.showMemberFilters,
    memberFilterStartDate: states.entityData.memberFilterStartDate,
    memberFilterEndDate: states.entityData.memberFilterEndDate,
    attributeDetails: states.entityData.attributeDetails
  };
};

const myConnector = connect(mapStatesToProps);
const EntityMembersFiltersConnected = myConnector(EntityMembersFilters);

export default withRouter(myConnector(EntityMembers));
