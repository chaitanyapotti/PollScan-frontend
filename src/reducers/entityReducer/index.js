import actionTypes from "../../action_types";

export const initialStates = {
  memberList: [],
  memberListArray: [],
  allActivities: [],
  allActivitiesArray: [],
  attributeDetails: {},
  showActivityLoader: true,
  allActivitesRetrievedSuccessfully: false,
  currentActivityPage: 0,
  currentMemberPage: 0,
  showAllMembersLoader: true,
  memberListRetrievedSuccessfully: false,
  showActivityFilters: false,
  startDate: null,
  endDate: null,
  memberFilterStartDate: null,
  memberFilterEndDate: null,
  assignedCheckBoxStatus: false,
  approvedCheckBoxStatus: false,
  revokedCheckBoxStatus: false,
  showMemberFilters: false,
  entityMemberFilters: {}
};

export default function reducer(state = initialStates, action) {
  switch (action.type) {
    case actionTypes.ENTITY_DATA_SUCCESS: {
      const { allActivities, memberList, attributeHeaders, attributeDetails } = action.payload || [];
      const allActivitiesArray = allActivities.map(Object.values);
      const memberListArray = memberList.map(Object.values);
      return {
        ...state,
        showActivityLoader: false,
        allActivitesRetrievedSuccessfully: true,
        allActivities,
        allActivitiesArray,
        memberList,
        memberListArray,
        attributeHeaders,
        attributeDetails,
        showAllMembersLoader: false,
        memberListRetrievedSuccessfully: true
      };
    }

    case actionTypes.ENTITY_DATA_FAILED: {
      return {
        ...state,
        showActivityLoader: false,
        allActivitesRetrievedSuccessfully: false,
        showAllMembersLoader: false,
        memberListRetrievedSuccessfully: false
      };
    }

    case actionTypes.ENTITY_ACTIVITIES_START_DATE_SELECTED: {
      return { ...state, startDate: action.payload };
    }

    case actionTypes.ENTITY_ACTIVITIES_END_DATE_SELECTED: {
      return { ...state, endDate: action.payload };
    }

    case actionTypes.ENTITY_MEMBERS_START_DATE_SELECTED: {
      return { ...state, memberFilterStartDate: action.payload };
    }

    case actionTypes.ENTITY_MEMBERS_END_DATE_SELECTED: {
      return { ...state, memberFilterEndDate: action.payload };
    }

    case actionTypes.ENTITY_ACTIVITIES_PAGE_CHANGED: {
      return { ...state, currentActivityPage: action.payload };
    }

    case actionTypes.ENTITY_MEMBERS_PAGE_CHANGED: {
      return { ...state, currentMemberPage: action.payload };
    }

    case actionTypes.SHOW_ENTITY_ACTIVITY_FILTERS: {
      return { ...state, showActivityFilters: action.payload };
    }

    case actionTypes.SHOW_ENTITY_MEMBERS_FILTERS: {
      return { ...state, showMemberFilters: action.payload };
    }

    case actionTypes.ENTITY_MEMBER_FILTER_OPTIONS_SELECTED: {
      const entityMemberFilters = state.entityMemberFilters;
      entityMemberFilters[action.filterIndex] = action.filterOptions;
      return { ...state, entityMemberFilters };
    }

    case actionTypes.PROCESS_ENTITY_MEMBERS_FILTERS: {
      let memberListArray = state.memberList.map(Object.values);
      const entityMemberFilters = state.entityMemberFilters;
      if (state.memberFilterStartDate !== null && state.memberFilterEndDate !== null) {
        memberListArray = memberListArray.filter(
          row => state.memberFilterStartDate.getTime() / 1000 <= row[1] && row[1] <= state.memberFilterEndDate.getTime() / 1000
        );
      }

      memberListArray = memberListArray.filter(row => {
        for (const key in entityMemberFilters) {
          if (entityMemberFilters[key].length > 0 && entityMemberFilters[key].indexOf(row[3 + parseInt(key)]) === -1) {
            return false;
          }
        }
        return true;
      });

      // if (state.assignedCheckBoxStatus || state.approvedCheckBoxStatus || state.revokedCheckBoxStatus){
      //   allActivitiesArray = allActivitiesArray.filter((row)=>{
      //     return  ((row[2] ==="Assigned" &&  state.assignedCheckBoxStatus) ||  (row[2] ==="Approved" &&  state.approvedCheckBoxStatus) || (row[2] ==="Revoked" &&  state.revokedCheckBoxStatus) )
      //   })
      // }
      return { ...state, showMemberFilters: false, memberListArray };
    }

    case actionTypes.RESET_ENTITY_MEMBER_FILTERS: {
      return { ...state, memberFilterStartDate: null, memberFilterEndDate: null };
    }

    case actionTypes.PROCESS_ENTITY_ACTIVITIES_FILTERS: {
      let allActivitiesArray = state.allActivities.map(Object.values);
      if (state.startDate !== null && state.endDate !== null) {
        allActivitiesArray = allActivitiesArray.filter(
          row =>
            // console.log(  (state.startDate).getTime()/1000, row[1], (state.endDate).getTime()/1000,   (state.startDate).getTime()/1000 <= row[1] && row[1]<= (state.endDate).getTime()/1000)
            state.startDate.getTime() / 1000 <= row[1] && row[1] <= state.endDate.getTime() / 1000
        );
      }
      if (state.assignedCheckBoxStatus || state.approvedCheckBoxStatus || state.revokedCheckBoxStatus) {
        allActivitiesArray = allActivitiesArray.filter(
          row =>
            (row[2] === "Assigned" && state.assignedCheckBoxStatus) ||
            (row[2] === "Approved" && state.approvedCheckBoxStatus) ||
            (row[2] === "Revoked" && state.revokedCheckBoxStatus)
        );
      }

      return { ...state, showActivityFilters: false, allActivitiesArray };
    }

    case actionTypes.RESET_ENTITY_FILTERS: {
      return { ...state, startDate: null, endDate: null };
    }

    case actionTypes.ASSIGNED_CHECK_BOX_CLICKED: {
      return { ...state, assignedCheckBoxStatus: action.payload };
    }

    case actionTypes.APPROVED_CHECK_BOX_CLICKED: {
      return { ...state, approvedCheckBoxStatus: action.payload };
    }

    case actionTypes.REVOKED_CHECK_BOX_CLICKED: {
      return { ...state, revokedCheckBoxStatus: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}
