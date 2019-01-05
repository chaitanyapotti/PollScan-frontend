import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Progress, Popup, Loader } from "semantic-ui-react";
import { getAllActivities } from "../../actions/activitiesActions";
import {
  getName,
  getPollType,
  getVoterBaseLogic,
  getProposalsWithVotes,
  getStartTime,
  getEndTime,
  getVoterBaseDenominator,
  getVoteTalliesWeighted
} from "../../actions/searchBarActions";

const style = {
  width: "221px",
  height: "40px",
  color: "#32cbf2",
  backgroundColor: "#ffffff",
  borderRadius: "32px",
  textAlign: "center",
  paddingTop: "6px"
};

class PollStats extends Component {
  handleAllActivities = () => {
    this.props.dispatch(getAllActivities(this.props.searchText));
    this.props.dispatch({
      type: "SHOW_ACTIVITY_LOADER",
      payload: ""
    });
    this.props.history.push({
      pathname: `/poll/logs`,
      search: `?contract=${this.props.searchText}`
    });
  };

  // handleAllActivities() {
  //   this.props.dispatch(getAllActivities(this.props.searchText))
  //   this.props.history.push({ pathname: `/poll/logs`, search: '?contract=' + this.props.searchText })
  // }

  componentDidMount() {
    const queryUrl = queryString.parseUrl(window.location.href);
    if ("contract" in queryUrl.query) {
      this.props.dispatch(getName(queryUrl.query.contract));
      this.props.dispatch(getPollType(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract));
      this.props.dispatch(getStartTime(queryUrl.query.contract));
      this.props.dispatch(getEndTime(queryUrl.query.contract));
      this.props.dispatch(getVoteTalliesWeighted(queryUrl.query.contract));
      this.props.dispatch(getVoterBaseDenominator(queryUrl.query.contract));
      this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract));
      this.props.dispatch({
        type: "SEARCH_TEXT_CHANGED",
        payload: queryUrl.query.contract
      });
    }
  }
  // componentWillMount() {

  // }

  handleDetailedVoters = proposalId => {
    this.props.dispatch({
      type: "PROPOSAL_SELECTED",
      proposalid: proposalId,
      proposalname: this.props.proposals[proposalId].name
    });
    // this.props.dispatch(getAllActivities(this.props.searchText));
    this.props.history.push({
      pathname: `/poll/voters`,
      search: `?contract=${this.props.searchText}&id=${proposalId.toString()}&name=${this.props.proposals[proposalId].name}`
    });
  };

  handleAllDetailedVoters = () => {
    this.props.dispatch({
      type: "SHOW_ALL_VOTES",
      proposalname: "All"
    });
    // this.props.dispatch(getAllActivities(this.props.searchText));
    this.props.history.push({
      pathname: `/poll/voters`,
      search: `?contract=${this.props.searchText}`
    });
  };

  populateProposals() {
    if (this.props.proposals.length > 0) {
      return this.props.proposals.map((proposal, index) => (
        <div key={1000 + index} className="proposal-total-data">
          <div className="proposal-data">
            <div className="proposal-name">{proposal.name}</div>
            <Popup
              hoverable
              on={["hover", "click"]}
              style={style}
              trigger={
                <div
                  onClick={() => {
                    this.handleDetailedVoters(index);
                  }}
                  className="percent-voters"
                >
                  <div className="proposal-percent">{proposal.percent}%</div>
                  <div className="voters-count">({proposal.votes} Voters)</div>
                </div>
              }
              position="top center"
              content={<h1 className="large">View All Voters</h1>}
            />
          </div>
          <Progress percent={proposal.percent} size="small" />
        </div>
      ));
    }
  }

  // Need to change days counter to hr,min,ss
  render() {
    return !this.props.showPollStatsLoader && !this.props.showWrongAddressModal ? (
      <Grid>
        <div className="pollstats-grid">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="poll-started-text">Poll started at</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={8} lg={8}>
              <div className="voter-logic">{this.props.voterBaseLogic}</div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <div className="poll-start-time">{new Date(parseInt(this.props.startTime) * 1000).toDateString()}</div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Popup
                hoverable
                on={["hover", "click"]}
                style={style}
                trigger={
                  <div onClick={this.handleAllActivities} className="poll-name">
                    {this.props.pollName}
                  </div>
                }
                content={<h1 className="large">View Activiy Log</h1>}
                position="top center"
              />
            </Col>
            <Col lg={6} />
          </Row>
          <Row className="poll-type-end">
            <Col xs={12} sm={6} md={6} lg={6}>
              <div className="poll-type">{this.props.pollType}</div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <div className="poll-end">
                {new Date().getTime() > new Date(parseInt(this.props.endTime) * 1000).getTime() ? (
                  <div>Ended on {new Date(parseInt(this.props.endTime) * 1000).toDateString()}</div>
                ) : (
                  <div className="poll-ends-in">
                    Poll ends in: {Math.ceil((new Date(parseInt(this.props.endTime) * 1000).getTime() - new Date().getTime()) / (1000 * 3600 * 24))}{" "}
                    days
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="proposals">{this.populateProposals()}</div>
          <Row>
            <Col lg={9} />
            <Col lg={3}>
              <div>
                <Popup
                  hoverable
                  on={["hover", "click"]}
                  style={style}
                  position="top center"
                  trigger={
                    <div onClick={this.handleAllDetailedVoters} className="total-voters">
                      Total Voters: {this.props.totalVoteCast}
                    </div>
                  }
                  content={<h1 className="large">View All Voters</h1>}
                />
              </div>
            </Col>
          </Row>

          {this.props.proposals.length > 1 ? (
            <div>
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
          ) : (
            <div>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="poll-leader-text">Status</div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="poll-leader-vote-share">
                    <div className="poll-leader-name">
                      Consensus in favour of {this.props.pollLeader.name} is {this.props.pollLeader.percent}%
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Grid>
    ) : (
      <Loader active={this.props.showPollStatsLoader} />
    );
  }
}

const mapStatesToProps = globalData => ({
  startTime: globalData.pollStats.startTime,
  pollName: globalData.pollStats.pollName,
  pollType: globalData.pollStats.pollType,
  endTime: globalData.pollStats.endTime,
  denominator: globalData.pollStats.denominator,
  proposals: globalData.pollStats.proposals,
  voterBaseLogic: globalData.pollStats.voterBaseLogic,
  totalVoteCast: globalData.pollStats.totalVoteCast,
  pollLeader: globalData.pollStats.pollLeader,
  searchText: globalData.searchBarData.searchText,
  showPollStatsLoader: globalData.pollStats.showPollStatsLoader,
  showWrongAddressModal: globalData.searchBarData.showWrongAddressModals
});

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(PollStats));
