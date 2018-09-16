import axios from 'axios';
import config from '../config';

export function getName(address) {
    return function (dispatch) {
        axios.get(config.api_base_url + "/name", { params: { address: address } })
            .then((response) => {
                console.log('name received', response.data)
                if (response.data.message === 'Success') {
                    dispatch({
                        type: "POLL_NAME_SUCCESS", payload: response.data.data.name
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "POLL_NAME_FAILED", payload: err
                })
            })
    }
}

export function getPollType(address) {
    return function (dispatch) {
        axios.get(config.api_base_url + "/polltype", { params: { address: address } })
            .then((response) => {
                if (response.data.message === 'Success') {
                    dispatch({
                        type: "POLL_TYPE_SUCCESS", payload: response.data.data.polltype
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "POLL_TYPE_FAILED", payload: err
                })
            })
    }
}

export function getVoterBaseLogic(address) {
    return function (dispatch) {
        axios.get(config.api_base_url + "/voterbaselogic", { params: { address: address } })
            .then((response) => {
                if (response.data.message === 'Success') {
                    dispatch({
                        type: "VOTER_BASE_LOGIC_SUCCESS", payload: response.data.data.voterbaselogic
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "VOTER_BASE_LOGIC_FAILED", payload: err
                })
            })
    }
}

export function getProposalsWithVotes(address) {
    return function (dispatch) {
        axios.get(config.api_base_url + "/proposalswithvotes", { params: { address: address } })
            .then((response) => {
                if (response.data.message === 'Success') {
                    console.log("proposals", response.data)
                    let lastHigh = 0
                    let pollLeader = {}
                    for (let proposal of response.data.data.proposalswithvotes){
                        if (proposal.votes> lastHigh){
                            lastHigh = proposal.votes
                            pollLeader = proposal
                        }
                    }
                    dispatch({
                        type: "PROPOSALS_WITH_VOTES_SUCCESS", proposals: response.data.data.proposalswithvotes, totalvotescasted: response.data.data.totalvotescasted, pollleader: pollLeader
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "PROPOSALS_WITH_VOTES_FAILED", payload: err
                })
            })
    }
}
