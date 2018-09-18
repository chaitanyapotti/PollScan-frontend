import { stat } from "fs";

export default function reducer(state = {
    // searchText: '0xce7ab7093a056598c53b5d87082c7019eb2275db'   
    showWrongAddressModal: false,
    searchText: ''   
  }, action) {
     switch (action.type) {  
        case "SEARCH_TEXT_CHANGED": {
            return { ...state,  searchText: action.payload}
        }      
        case "POLL_NAME_FAILED": {
            return { ...state, showWrongAddressModal: true}
        }
        case "CLOSE_API_ERROR_MODAL": {
            return { ...state, showWrongAddressModal: false}
        }
        
        default: {
             return { ...state }
         }
     }
 }
 