import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Button, Input } from "semantic-ui-react";
import { checkEntityMembership, checkVbsMembership, fetchUserPollActivity } from "../../actions/eoaActions";

class EOA extends Component {
  handleEntityAddressChanged = event => {
    this.props.dispatch({
      type: "ENTITY_ADDRESS_CHANGED",
      payload: event.target.value
    });
  };

  enterPressedEntityMembershipCheck = event => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.props.entityAddress.length > 0) {
        this.props.dispatch(checkEntityMembership(this.props.searchText, this.props.entityAddress));
      }
    }
  };

  enterPressedPollActivity = event => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.props.pollAddress.length > 0) {
        this.props.dispatch(fetchUserPollActivity(this.props.searchText, this.props.pollAddress));
      }
    }
  };

  handlePollAddressChanged = e => {
    this.props.dispatch({
      type: "POLL_ADDRESS_CHANGED",
      payload: e.target.value
    });
  };

  vbsFileChanged = e => {
    if (e.target.files[0]) {
      this.props.dispatch(checkVbsMembership(this.props.searchText, e.target.files[0]));
    }
  };

  populatePollActivities = () =>
    this.props.pollActivity.map((activity, index) => {
      if (activity.event === "CastVote") {
        return (
          <div>
            <div>Voted for:</div>
            <div>
              {activity.proposal} on {new Date(parseInt(activity.timeStamp) * 1000).toLocaleString("en-GB")}
            </div>
          </div>
        );
      }
      if (activity.event === "RevokedVote") {
        return (
          <div>
            <div>Unvoted from:</div>
            <div>
              {activity.proposal} on {new Date(parseInt(activity.timeStamp) * 1000).toLocaleString("en-GB")}
            </div>
          </div>
        );
      }
    });

  render() {
    return (
      <div>
        <Grid>
          <div className="homepage-grid">
            <Row className="innergrid">
              <Col className="copy" id="enter">
                <Row>Check for entity membership</Row>
                <Row>
                  <div className="eoa-search">
                    <input
                      className="eoa-search-input"
                      spellCheck="false"
                      value={this.props.entityAddress}
                      onChange={this.handleEntityAddressChanged}
                      onKeyPress={this.enterPressedEntityMembershipCheck}
                    />
                  </div>
                </Row>
                <Row>
                  Or{" "}
                  <span>
                    <Button>
                      <Input type="file" onChange={this.vbsFileChanged} />
                    </Button>{" "}
                  </span>
                </Row>
                <Row>{this.props.isEntityMember ? <Button>Membership Confirmed</Button> : <Button>Membership Not Confirmed</Button>}</Row>
                <Row>{this.props.isVbsMember ? <Button>VBS Membership Confirmed</Button> : <Button>VBS Membership Not Confirmed</Button>}</Row>
              </Col>
              <Col className="copy" id="enter" style={{ marginLeft: "auto" }}>
                <Row>Check for poll activity</Row>
                <Row>
                  <div className="eoa-search">
                    <input
                      className="eoa-search-input"
                      spellCheck="false"
                      value={this.props.pollAddress}
                      onChange={this.handlePollAddressChanged}
                      onKeyPress={this.enterPressedPollActivity}
                    />
                  </div>
                </Row>
                <Row className="eoa-poll-activity">{this.populatePollActivities()}</Row>
              </Col>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStatesToProps = states => ({
  searchText: states.searchBarData.searchText,
  entityAddress: states.eoaData.entityAddress,
  pollAddress: states.eoaData.pollAddress,
  isEntityMember: states.eoaData.isEntityMember,
  isVbsMember: states.eoaData.isVbsMember,
  pollActivity: states.eoaData.pollActivity
});

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(EOA));
