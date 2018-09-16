import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Divider, Progress, Modal } from 'semantic-ui-react';

import { getAllActivities } from '../actions/allActivitiesActions';

class PollStats extends Component {
    constructor(props) {
        super(props)
        this.handleAllActivities = this.handleAllActivities.bind(this)
        this.handleDetailedVoters = this.handleDetailedVoters.bind(this)
    }

    handleAllActivities() {
        this.props.dispatch(getAllActivities(this.props.searchText))
    }

    handleDetailedVoters(proposalId) {
        this.props.dispatch({ type: 'PROPOSAL_SELECTED', proposalid: proposalId, proposalname: this.props.proposals[proposalId].name })
    }

    populateProposals() {
        if (this.props.proposals.length > 0) {
            return this.props.proposals.map((proposal, index) => {
                return (
                    <div key={100 + index}>
                        {proposal.name}  {proposal.percent}%  <a onClick={this.handleDetailedVoters.bind(this, index)}>({proposal.votes} Votes)</a>
                        <Progress percent={proposal.percent} size='small' color='teal' />
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <Modal
                    trigger={<Button>Show Modal</Button>}
                    header='Incompatible address!'
                    content='The address you provided is either invalid, or belongs to a non-compliant smart contract.'
                    actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
                />
                <span>
                    <h3>{this.props.voterBaseLogic}</h3>
                    Poll started at {this.props.startTime}
                </span>
                <span>
                    <h3><a onClick={this.handleAllActivities}>{this.props.pollName}</a></h3>
                    <h4>{this.props.pollType}</h4>
                </span>
                Poll ends in: {Math.ceil(Math.abs(new Date().getTime() - new Date(this.props.endTime).getTime()) / (1000 * 3600 * 24))} days

                <Divider />
                {this.populateProposals()}
                <Divider />
                Total Votes: {this.props.totalVoteCast} <br />
                Poll Leader <br />
                {this.props.pollLeader.name} ({this.props.pollLeader.percent}% Vote Share)
            </div>
        )
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
        searchText: globalData.searchBarData.searchText,
        showModal: globalData.pollStats.showModal
    };
}

const myConnector = connect(mapStatesToProps);

export default myConnector(PollStats)

