import actionTypes from "../../action_types";

export const initialStates = {
  memberList: [],
  allActivities: [],
  showActivityLoader: true,
  allActivitesRetrievedSuccessfully: false,
  currentActivityPage: 0,
  currentMemberPage: 0,
  showAllMembersLoader: true,
  memberListRetrievedSuccessfully: false
};

export default function reducer(state = initialStates, action) {
  switch (action.type) {
    case actionTypes.ENTITY_DATA_SUCCESS: {
      console.log(action.payload);
      const { allActivities, memberList, attributeHeaders } = action.payload || [];
      return {
        ...state,
        showActivityLoader: false,
        allActivitesRetrievedSuccessfully: true,
        allActivities,
        memberList,
        attributeHeaders,
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

    case actionTypes.ENTITY_ACTIVITIES_PAGE_CHANGED: {
      return { ...state, currentActivityPage: action.payload };
    }

    case actionTypes.ENTITY_MEMBERS_PAGE_CHANGED: {
      return { ...state, currentMemberPage: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}
