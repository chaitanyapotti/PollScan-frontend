import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";
const httpClient = axios.create();

export const checkVbsMembership = (userAddress, vbsFile) => {
  const form = new FormData();
  form.append("file", vbsFile);
  const name = vbsFile.name || "";
  return dispatch => {
    // dispatch({
    //   type: actionTypes.UPLOADING_PASSPORT_DOC,
    //   payload: name
    // });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/eoa/check/vbsmembership?useraddress=${userAddress}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.VBS_FILE_CHECK_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.VBS_FILE_CHECK_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.VBS_FILE_CHECK_FAILED,
          payload: err.message
        });
      });
  };
};

export const checkEntityMembership = (userAddress, entityAddress) => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/eoa/check/membership`, { params: { useraddress: userAddress, entityaddress: entityAddress } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.ENTITY_MEMBERSHIP_CHECK_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.ENTITY_MEMBERSHIP_CHECK_FAILED,
            payload: constants.ENTITY_MEMBERSHIP_CHECK_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.ENTITY_MEMBERSHIP_CHECK_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};

export const fetchUserPollActivity = (userAddress, pollAddress) => {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/eoa/poll/activity`, { params: { useraddress: userAddress, polladdress: pollAddress } })
      .then(response => {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.USER_POLL_ACTIVITY_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.USER_POLL_ACTIVITY_FAILED,
            payload: constants.USER_POLL_ACTIVITY_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.USER_POLL_ACTIVITY_FAILED,
          payload: err.message
        });
        dispatch({
          type: actionTypes.API_ERROR,
          payload: err.message
        });
      });
  };
};
