import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";

export const getEntityData = address => dispatch => {
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/entity/events`, { params: { address, network } })
    .then(response => {
      if (response.data.message === constants.SUCCESS) {
        dispatch({
          type: actionTypes.ENTITY_DATA_SUCCESS,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: actionTypes.ENTITY_DATA_FAILED,
          payload: constants.ENTITY_DATA_FAILED_MESSAGE
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: actionTypes.ENTITY_DATA_FAILED,
        payload: err.message
      });
      dispatch({
        type: actionTypes.API_ERROR,
        payload: err.message
      });
    });
};
