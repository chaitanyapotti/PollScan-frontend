import actionTypes from "../../action_types";

export const initialStates = {
  selectedProposalName: "All",
  selectedProposalId: 0,
  currentVoterPage: 0,
  allVoters: [],
  currentActivityPage: 0,
  allActivities: [],
  showActivityLoader: true,
  allActivitesRetrievedSuccessfully: false
};

export default function reducer(state = initialStates, action) {
  switch (action.type) {
    case actionTypes.SHOW_ALL_VOTES: {
      let tempAllVoters = [];
      let tempAllActivities = state.allActivities;
      let tempVotersDict = {};
      for (let activity of tempAllActivities) {
        if (activity.type !== "TriedToVote") {
          if (activity.address in tempVotersDict) {
          } else {
            tempVotersDict[activity.address] = {
              address: activity.address,
              datetime: activity.datetime,
              weight: activity.weight,
              type: activity.type,
              value: activity.value
            };
          }
        }
      }
      for (let key in tempVotersDict) {
        if (tempVotersDict[key].type !== "RevokedVote") {
          tempAllVoters.push(tempVotersDict[key]);
        }
      }
      return {
        ...state,
        allVoters: tempAllVoters,
        currentActivityPage: 0,
        currentVoterPage: 0,
        selectedProposalName: "All"
      };
    }

    case actionTypes.PROPOSAL_SELECTED: {
      let tempAllVoters = [];
      let tempAllActivities = state.allActivities;
      if ("proposalid" in action) {
        let tempAllVoters = [];
        tempAllActivities = state.allActivities;
        let tempVotersDict = {};
        for (let activity of tempAllActivities) {
          if (activity.type !== "TriedToVote") {
            if (activity.address in tempVotersDict) {
            } else {
              tempVotersDict[activity.address] = {
                address: activity.address,
                datetime: activity.datetime,
                weight: activity.weight,
                type: activity.type,
                value: activity.value
              };
            }
          }
        }
        for (let key in tempVotersDict) {
          if (tempVotersDict[key].type !== "RevokedVote" && tempVotersDict[key].value === action.proposalid.toString()) {
            tempAllVoters.push(tempVotersDict[key]);
          }
        }
        return {
          ...state,
          allVoters: tempAllVoters,
          selectedProposalId: action.proposalid,
          selectedProposalName: action.proposalname,
          currentActivityPage: 0,
          currentVoterPage: 0
        };
      } else {
        return { ...state, allVoters: tempAllVoters, currentActivityPage: 0, currentVoterPage: 0 };
      }
    }

    case actionTypes.PROPOSAL_NAME_SELECTED: {
      return { ...state, selectedProposalName: action.payload, currentActivityPage: 0, currentVoterPage: 0 };
    }

    case actionTypes.VOTERS_PAGE_CHANGED: {
      return { ...state, currentVoterPage: action.payload };
    }

    case actionTypes.ACTIVITIES_PAGE_CHANGED: {
      return { ...state, currentActivityPage: action.payload };
    }

    case actionTypes.ALL_ACTIVITIES_SUCCESS: {
      let allActivities = action.payload;
      allActivities = allActivities.reverse();
      return {
        ...state,
        allActivities: allActivities,
        showActivityLoader: false,
        allActivitesRetrievedSuccessfully: true
      };
    }

    case actionTypes.ALL_ACTIVITIES_LOG_FAILED: {
      return {
        ...state,
        allActivities: [],
        showActivityLoader: false,
        allActivitesRetrievedSuccessfully: false
      };
    }

    case actionTypes.SHOW_ACTIVITY_LOADER: {
      return { ...state, showActivityLoader: true };
    }

    default: {
      return { ...state };
    }
  }
}
