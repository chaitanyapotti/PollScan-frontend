import actionTypes from "../../action_types";

export const initialStates = {
  vbsFile: {},
  vbsFileMembershipChecked: false,
  isVbsMember: false,
  pollAddress: "",
  pollActivityFetched: false,
  pollActivity: [],
  entityAddress: "",
  entityMembershipChecked: false,
  isEntityMember: false
};

//http://localhost:2018/eoa/poll/activity?useraddress=0x276A65355CeBCe5F26550b42dcce14C61b111069&polladdress=0x2dA1438388b723B84D8BE82E898443906D728201
export default function reducer(state = initialStates, action) {
  switch (action.type) {
    case actionTypes.ENTITY_ADDRESS_CHANGED: {
      return { ...state, entityAddress: action.payload };
    }

    case actionTypes.POLL_ADDRESS_CHANGED: {
      return { ...state, pollAddress: action.payload };
    }

    case actionTypes.ENTITY_MEMBERSHIP_CHECK_SUCCESS: {
      return { ...state, entityMembershipChecked: true, isEntityMember: action.payload, vbsFileMembershipChecked: false, isVbsMember: false };
    }

    case actionTypes.ENTITY_MEMBERSHIP_CHECK_FAILED: {
      return { ...state, entityMembershipChecked: true, isEntityMember: false, vbsFileMembershipChecked: false, isVbsMember: false };
    }

    case actionTypes.VBS_FILE_CHECK_SUCCESS: {
      return { ...state, entityMembershipChecked: false, isEntityMember: false, vbsFileMembershipChecked: true, isVbsMember: action.payload };
    }

    case actionTypes.VBS_FILE_CHECK_FAILED: {
      return { ...state, entityMembershipChecked: false, isEntityMember: false, vbsFileMembershipChecked: true, isVbsMember: false };
    }

    case actionTypes.USER_POLL_ACTIVITY_SUCCESS: {
      return { ...state, pollActivity: action.payload, pollActivityFetched: true };
    }

    case actionTypes.USER_POLL_ACTIVITY_FAILED: {
      return { ...state, pollActivity: [], pollActivityFetched: false };
    }

    default: {
      return { ...state };
    }
  }
}
