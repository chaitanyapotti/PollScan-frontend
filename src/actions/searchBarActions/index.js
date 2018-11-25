import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";

export const getName = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/name`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.POLL_NAME_SUCCESS,
            payload: response.data.data.name
          });
        } else {
          dispatch({
            type: actionTypes.POLL_NAME_FAILED,
            payload: constants.POLL_NAME_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.POLL_NAME_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getStartTime = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/starttime`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.POLL_START_TIME_SUCCESS,
            payload: response.data.data.starttime
          });
        } else {
          dispatch({
            type: actionTypes.POLL_START_TIME_FAILED,
            payload: constants.POLL_START_TIME_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.POLL_START_TIME_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getEndTime = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/endtime`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.POLL_END_TIME_SUCCESS,
            payload: response.data.data.endtime
          });
        } else {
          dispatch({
            type: actionTypes.POLL_END_TIME_FAILED,
            payload: constants.POLL_END_TIME_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.POLL_END_TIME_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getVoterBaseDenominator = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/totalvotes`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.TOTAL_VOTES_SUCCESS,
            payload: response.data.data.totalvotes
          });
        } else {
          dispatch({
            type: actionTypes.TOTAL_VOTES_FAILED,
            payload: constants.TOTAL_VOTES_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.TOTAL_VOTES_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getPollType = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/polltype`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.POLL_TYPE_SUCCESS,
            payload: response.data.data.polltype
          });
        } else {
          dispatch({
            type: actionTypes.POLL_TYPE_FAILED,
            payload: constants.POLL_TYPE_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.POLL_TYPE_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getVoterBaseLogic = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/voterbaselogic`, {
        params: { address: address }
      })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.VOTER_BASE_LOGIC_SUCCESS,
            payload: response.data.data.voterbaselogic
          });
        } else {
          dispatch({
            type: actionTypes.VOTER_BASE_LOGIC_FAILED,
            payload: constants.VOTER_BASE_LOGIC_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.VOTER_BASE_LOGIC_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getProposalsWithVotes = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/proposalswithvotes`, {
        params: { address: address }
      })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.PROPOSALS_WITH_VOTES_SUCCESS,
            proposals: response.data.data.proposalswithvotes,
            totalvotescasted: response.data.data.totalvotescasted
          });
        } else {
          dispatch({
            type: actionTypes.PROPOSALS_WITH_VOTES_FAILED,
            payload: constants.PROPOSALS_WITH_VOTES_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.PROPOSALS_WITH_VOTES_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const getVoteTalliesWeighted = address => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/pollscan/votetallies`, { params: { address: address } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.PROPOSAL_TALLIES_SUCCESS,
            payload: response.data.data.votetallies
          });
        } else {
          dispatch({
            type: actionTypes.PROPOSAL_TALLIES_FAILED,
            payload: constants.PROPOSAL_TALLIES_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.PROPOSAL_TALLIES_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};
