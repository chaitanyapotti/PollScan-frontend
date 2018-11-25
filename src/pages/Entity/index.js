import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { getEntityData } from "../../actions/entityActions";

class Entity extends Component {
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

  render() {
    return <div>Show me some charts bitch</div>;
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

export default withRouter(myConnector(Entity));
