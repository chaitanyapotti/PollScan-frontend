import axios from 'axios';
import config from '../config';

export function getAllActivities(address) {
    return function (dispatch) {
        axios.get(config.api_base_url + "/events", { params: { address: address } })
            .then((response) => {
                console.log(response.data)
                if (response.data.message === 'Success') {
                    dispatch({
                        type: "ALL_ACTIVITIES_SUCCESS", payload: response.data.data.events
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: "ALL_ACTIVITIES_FAILED", payload: err
                })
            })
    }
}