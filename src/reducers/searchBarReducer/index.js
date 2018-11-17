export default function reducer(
  state = {
    // searchText: '0xce7ab7093a056598c53b5d87082c7019eb2275db'   ,
    // searchText: '0x95d0ffea1400584d85ae2533917db058059d8046',
    showWrongAddressModal: false,
    searchText: "",
    helperModal: true
  },
  action
) {
  switch (action.type) {
    case "SEARCH_TEXT_CHANGED": {
      return { ...state, searchText: action.payload };
    }
    case "POLL_NAME_FAILED": {
      return { ...state, showWrongAddressModal: true };
    }
    case "CLOSE_API_ERROR_MODAL": {
      return { ...state, showWrongAddressModal: false };
    }
    case "CLOSE_HELPER_MODAL": {
      return { ...state, helperModal: false };
    }

    default: {
      return { ...state };
    }
  }
}
