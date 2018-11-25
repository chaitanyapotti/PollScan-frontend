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

  addPageNumbers() {
    return (
      <ReactPaginate
        breakLabel={<a href="">...</a>}
        breakClassName={"BreakView"}
        pageCount={Math.ceil(this.props.memberList.length / Limit)}
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
  }

  addAttributesDynamically(attributes) {
    return this.props.attributeHeaders.map((attributeName, index) => {
      return <Table.Cell>{attributes[attributeName]}</Table.Cell>;
    });
  }

  addTableRowsDynamically() {
    if (this.props.memberList.length > 0) {
      return this.props.memberList.slice(this.props.currentMemberPage * Limit, (this.props.currentMemberPage + 1) * Limit).map((member, index) => {
        return (
          <Table.Row key={index}>
            <Table.Cell>{member.address}</Table.Cell>
            <Table.Cell> {new Date(parseInt(member.timeStamp) * 1000).toLocaleString("en-GB")}</Table.Cell>
            {this.addAttributesDynamically(member.attributes)}
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

  prepareCSVData(memberList, attributeHeaders) {
    let data = [];
    for (let i = 0; i < memberList.length; i++) {
      let row = {};
      row["Address"] = memberList[i].address;
      row["Timestamp"] = new Date(parseInt(memberList[i].timeStamp) * 1000).toLocaleString("en-GB");
      for (let j = 0; j < attributeHeaders.length; j++) {
        row[attributeHeaders[j]] = memberList[i]["attributes"][attributeHeaders[j]];
      }
      row["revoked"] = memberList[i].revoked.toString();
      data.push(row);
    }
    return data;
  }

  populateHeaders() {
    if (this.props.attributeHeaders.length > 0) {
      return this.props.attributeHeaders.map((attributeName, index) => {
        return <Table.HeaderCell width={2}>{attributeName}</Table.HeaderCell>;
      });
    } else {
      return null;
    }
  }

  render() {
    let csvData = this.prepareCSVData(this.props.memberList, this.props.attributeHeaders);
    return (
      <div>
        <div className="back-to-poll" onClick={this.handleOnClick}>
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
                  <Col>{Math.ceil(this.props.memberList.length / Limit) > 1.0 ? this.addPageNumbers() : null}</Col>
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
                  <button className="csv-button">
                    <div className="white">Filter Members</div>
                  </button>
                </div>
              </div>
              {/* <div className="button-grid">
                                <div className="button-float">
                                    <button className="csv-button">
                                        <div className="white"> Filter Members</div>
                                    </button>
                                </div>
                            </div> */}
            </Grid>
          </div>
        ) : (
          <div className="reload-page">Memberlist could not be retrieved, please try reloading the page.</div>
        )}
      </div>
    );
  }
}

const mapStatesToProps = states => {
  return {
    memberList: states.entityData.memberList,
    showAllMembersLoader: states.entityData.showAllMembersLoader,
    memberListRetrievedSuccessfully: states.entityData.memberListRetrievedSuccessfully,
    searchText: states.searchBarData.searchText,
    currentMemberPage: states.entityData.currentMemberPage,
    attributeHeaders: states.entityData.attributeHeaders
  };
};

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(EntityMembers));
