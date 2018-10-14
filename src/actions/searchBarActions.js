import axios from "axios";
import config from "../config";

export function getName(address) {
  console.log("get name called");
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/name", { params: { address: address } })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "POLL_NAME_SUCCESS",
            payload: response.data.data.name
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "POLL_NAME_FAILED",
          payload: err
        });
        dispatch({
          type: "API_ERROR",
          payload: err
        });
      });
  };
}

export function getStartTime(address) {
  console.log("get starttimr called");
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/starttime", { params: { address: address } })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "POLL_START_TIME_SUCCESS",
            payload: response.data.data.starttime
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "POLL_START_TIME_FAILED",
          payload: err
        });
        dispatch({
          type: "API_ERROR",
          payload: err
        });
      });
  };
}

export function getEndTime(address) {
  console.log("get endtime called");
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/endtime", { params: { address: address } })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "POLL_END_TIME_SUCCESS",
            payload: response.data.data.endtime
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "POLL_END_TIME_FAILED",
          payload: err
        });
        dispatch({
          type: "API_ERROR",
          payload: err
        });
      });
  };
}

export function getVoterBaseDenominator(address) {
  console.log("get total votes called");
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/totalvotes", { params: { address: address } })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "TOTAL_VOTES_SUCCESS",
            payload: response.data.data.totalvotes
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "TOTAL_VOTES_FAILED",
          payload: err
        });
        dispatch({
          type: "API_ERROR",
          payload: err
        });
      });
  };
}

export function getPollType(address) {
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/polltype", { params: { address: address } })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "POLL_TYPE_SUCCESS",
            payload: response.data.data.polltype
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "POLL_TYPE_FAILED",
          payload: err
        });
      });
  };
}

export function getVoterBaseLogic(address) {
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/voterbaselogic", {
        params: { address: address }
      })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "VOTER_BASE_LOGIC_SUCCESS",
            payload: response.data.data.voterbaselogic
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "VOTER_BASE_LOGIC_FAILED",
          payload: err
        });
      });
  };
}

export function getProposalsWithVotes(address) {
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/proposalswithvotes", {
        params: { address: address }
      })
      .then(response => {
        if (response.data.message === "Success") {
          console.log("proposals", response.data);
          dispatch({
            type: "PROPOSALS_WITH_VOTES_SUCCESS",
            proposals: response.data.data.proposalswithvotes,
            totalvotescasted: response.data.data.totalvotescasted
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "PROPOSALS_WITH_VOTES_FAILED",
          payload: err
        });
      });
  };
}

export function getVoteTalliesWeighted(address) {
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/votetallies", {
        params: { address: address }
      })
      .then(response => {
        if (response.data.message === "Success") {
          dispatch({
            type: "PROPOSAL_TALLIES_SUCCESS",
            payload: response.data.data.votetallies
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "PROPOSAL_TALLIES_FAILED",
          payload: err
        });
      });
  };
}
