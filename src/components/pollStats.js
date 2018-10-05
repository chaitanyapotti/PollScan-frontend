import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Progress } from "semantic-ui-react";
import { getAllActivities } from "../actions/allActivitiesActions";
import { getName, getPollType, getVoterBaseLogic, getProposalsWithVotes } from "../actions/searchBarActions";

class PollStats extends Component {
  handleAllActivities = () => {
    this.props.dispatch(getAllActivities(this.props.searchText));
    this.props.history.push({
      pathname: `/events`,
      search: "?contract=" + this.props.searchText
    });
  };

  // handleAllActivities() {
  //   this.props.dispatch(getAllActivities(this.props.searchText))
  //   this.props.history.push({ pathname: `/events`, search: '?contract=' + this.props.searchText })
  // }

  componentWillMount() {
    console.log(window.location.href);
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query && this.props.searchText === "") {
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
    }
  }

  handleDetailedVoters(proposalId) {
    this.props.dispatch({
      type: "PROPOSAL_SELECTED",
      proposalid: proposalId,
      proposalname: this.props.proposals[proposalId].name
    });
    this.props.dispatch(getAllActivities(this.props.searchText));
    this.props.history.push({
      pathname: `/voters`,
      search: "?contract=" + this.props.searchText + "&id=" + proposalId.toString() + "&name=" + this.props.proposals[proposalId].name
    });
  }

  populateProposals() {
    if (this.props.proposals.length > 0) {
      return this.props.proposals.map((proposal, index) => {
        return (
          <div key={1000 + index} className="proposal-total-data">
            <div className="proposal-data">
              <div className="proposal-name">{proposal.name}</div>
              <div className="percent-voters">
                <div className="proposal-percent">{proposal.percent}%</div>
                <div className="voters-count">({proposal.votes} Voters)</div>
              </div>
            </div>
            <Progress percent={proposal.percent} size="small" />
          </div>
        );
      });
    }
  }
  //Need to change days counter to hr,min,ss
  render() {
    return (
      <Grid>
        <div className="pollstats-grid">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} order-xs-1>
              <div className="poll-started-text">Poll started at</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={8} lg={8} order-xs-2>
              <div className="voter-logic">{this.props.voterBaseLogic}</div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} order-xs-1>
              <div className="poll-start-time">{this.props.startTime}</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="poll-name">{this.props.pollName}</div>
            </Col>
          </Row>
          <Row className="poll-type-end">
            <Col xs={12} sm={6} md={6} lg={6}>
              <div className="poll-type">{this.props.pollType}</div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <div className="poll-end">
                Poll ends in: {Math.ceil(Math.abs(new Date().getTime() - new Date(this.props.endTime).getTime()) / (1000 * 3600 * 24))} days
              </div>
            </Col>
          </Row>
          <div className="proposals">{this.populateProposals()}</div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="total-voters">Total Voters: {this.props.totalVoteCast}</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="poll-leader-text">Poll Leader</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="poll-leader-vote-share">
                <div className="poll-leader-name">{this.props.pollLeader.name}</div>
                <div className="vote-share">({this.props.pollLeader.percent}% Vote Share)</div>
              </div>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    startTime: globalData.pollStats.startTime,
    pollName: globalData.pollStats.pollName,
    pollType: globalData.pollStats.pollType,
    endTime: globalData.pollStats.endTime,
    proposals: globalData.pollStats.proposals,
    voterBaseLogic: globalData.pollStats.voterBaseLogic,
    totalVoteCast: globalData.pollStats.totalVoteCast,
    pollLeader: globalData.pollStats.pollLeader,
    searchText: globalData.searchBarData.searchText
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(PollStats));
