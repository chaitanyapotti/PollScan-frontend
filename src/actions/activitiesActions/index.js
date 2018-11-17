import axios from "axios";
import config from "../../config";

export function getAllActivities(address, proposalid, proposalname) {
  return function(dispatch) {
    axios
      .get(config.api_base_url + "/events", { params: { address: address } })
      .then(response => {
        if (response.status === 200 && response.data.message === "Success") {
          dispatch({
            type: "ALL_ACTIVITIES_SUCCESS",
            payload: response.data.data.events
          });
          if (proposalid === undefined) {
            dispatch({
              type: "PROPOSAL_SELECTED",
              payload: {}
            });
            dispatch({
              type: "SHOW_ALL_VOTES",
              proposalname: "All"
            });
          } else {
            dispatch({
              type: "PROPOSAL_SELECTED",
              proposalid: proposalid,
              proposalname: proposalname
            });
          }
        } else {
          dispatch({
            type: "ALL_ACTIVITIES_LOG_FAILED",
            payload: "Logs could not be retrieved, please try reloading the page."
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "ALL_ACTIVITIES_LOG_FAILED",
          payload: err.message
        });
      });
  };
}
