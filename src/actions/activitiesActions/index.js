import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";

export const getAllActivities = (address, proposalid, proposalname) => {
  return dispatch => {
    axios
      .get(config.api_base_url + "/events", { params: { address: address } })
      .then(response => {
        if (response.status === 200 && response.data.message === "Success") {
          dispatch({
            type: actionTypes.ALL_ACTIVITIES_SUCCESS,
            payload: response.data.data.events
          });
          if (proposalid === undefined) {
            dispatch({
              type: actionTypes.PROPOSAL_SELECTED,
              payload: {}
            });
            dispatch({
              type: actionTypes.SHOW_ALL_VOTES,
              proposalname: "All"
            });
          } else {
            dispatch({
              type: actionTypes.PROPOSAL_SELECTED,
              proposalid: proposalid,
              proposalname: proposalname
            });
          }
        } else {
          dispatch({
            type: actionTypes.ALL_ACTIVITIES_LOG_FAILED,
            payload: constants.ALL_ACTIVITIES_LOG_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.ALL_ACTIVITIES_LOG_FAILED,
          payload: err.message
        });
      });
  };
};
