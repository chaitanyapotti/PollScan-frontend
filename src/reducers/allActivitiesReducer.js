export default function reducer(
  state = {
    selectedProposalName: "All",
    selectedProposalId: 0,
    currentVoterPage: 0,
    allVoters: [
      // { 'address': '0x908OBjsVGduUI2645o2134sd390453fgH0897', 'datetime': '4th Aug 2018 | 23:14', 'weight': 0.8 },
    ],
    currentActivityPage: 0,
    allActivities: [],
    showActivityLoader: true,
    allActivitiesTemp: [
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      },
      {
        address: "0x908OBjsVGduUI2645o2134sd390453fgH0897",
        datetime: "4th Aug 2018 | 23:14",
        weight: 0.6,
        type: "Failed Vote",
        value: 0
      }
    ]
  },
  action
) {
  switch (action.type) {
    case "SHOW_ALL_VOTES": {
      let tempAllVoters = [];
      let tempAllActivities = state.allActivities;
      let tempAllUnVoters = [];
      for (let activity of tempAllActivities) {
        if (activity.type === "CastVote") {
          tempAllVoters.push({
            address: activity.address,
            datetime: activity.datetime,
            weight: activity.weight
          });
        } else if (activity.type === "RevokedVote") {
          tempAllUnVoters.push({
            address: activity.address,
            datetime: activity.datetime,
            weight: activity.weight
          });
        }
      }
      return {
        ...state,
        allVoters: tempAllVoters
      };
    }
    case "PROPOSAL_SELECTED": {
      let tempAllVoters = [];
      let tempAllActivities = state.allActivities;
      let tempAllUnVoters = [];
      for (let activity of tempAllActivities) {
        if (parseInt(activity.value) === parseInt(state.selectedProposalId)) {
          if (activity.type === "CastVote") {
            tempAllVoters.push({
              address: activity.address,
              datetime: activity.datetime,
              weight: activity.weight
            });
          } else if (activity.type === "RevokedVote") {
            tempAllUnVoters.push({
              address: activity.address,
              datetime: activity.datetime,
              weight: activity.weight
            });
          }
        }
      }
      // for (let unvote of tempAllUnVoters){
      //     for(let vote of tempAllVoters){

      //     }
      // }
      if ("proposalid" in action) {
        return {
          ...state,
          allVoters: tempAllVoters,
          selectedProposalId: action.proposalid,
          selectedProposalName: action.proposalname
        };
      } else {
        return { ...state, allVoters: tempAllVoters };
      }
    }
    case "PROPOSAL_NAME_SELECTED": {
      return { ...state, selectedProposalName: action.payload };
    }
    case "VOTERS_PAGE_CHANGED": {
      return { ...state, currentVoterPage: action.payload };
    }
    case "ACTIVITIES_PAGE_CHANGED": {
      return { ...state, currentActivityPage: action.payload };
    }
    case "ALL_ACTIVITIES_SUCCESS": {
      return {
        ...state,
        allActivities: action.payload,
        showActivityLoader: false
      };
    }

    case "ALL_ACTIVITIES_LOG_FAILED": {
      return { ...state, allActivities: [], showActivityLoader: false };
    }

    default: {
      return { ...state };
    }
  }
}
