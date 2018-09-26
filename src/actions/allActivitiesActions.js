import axios from 'axios';
import config from '../config';

export function getAllActivities(address, proposalid, proposalname) {
    console.log("getting all activities", address, proposalid, proposalname)
    return function (dispatch) {
        axios.get(config.api_base_url + "/events", { params: { address: address } })
            .then((response) => {
                console.log(response.data)
                if (response.data.message === 'Success') {
                    dispatch({
                        type: "ALL_ACTIVITIES_SUCCESS", payload: response.data.data.events
                    })
                    if (proposalid === undefined){
                        dispatch({ 
                            type: 'PROPOSAL_SELECTED', payload: {}
                        })
                    }else{
                        console.log("dispatching", proposalid, proposalname)
                        dispatch({ 
                            type: 'PROPOSAL_SELECTED', proposalid: proposalid, proposalname: proposalname
                        })
                    }
                    
                }else{
                    dispatch({
                        type: "ALL_ACTIVITIES_LOG_FAILED", payload: 'Logs could not be retrieved, please try reloading the page.'
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