import actionTypes from "../../action_types";

export const initialState = {
  // searchText: '0xce7ab7093a056598c53b5d87082c7019eb2275db'   ,
  // searchText: '0x95d0ffea1400584d85ae2533917db058059d8046',
  showWrongAddressModal: false,
  searchText: "",
  helperModal: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_TEXT_CHANGED: {
      return { ...state, searchText: action.payload };
    }

    case actionTypes.POLL_NAME_FAILED: {
      return { ...state, showWrongAddressModal: true };
    }

    case actionTypes.CLOSE_API_ERROR_MODAL: {
      return { ...state, showWrongAddressModal: false };
    }

    case actionTypes.CLOSE_HELPER_MODAL: {
      return { ...state, helperModal: false };
    }

    default: {
      return { ...state };
    }
  }
}
