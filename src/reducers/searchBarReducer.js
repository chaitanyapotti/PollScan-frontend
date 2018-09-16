
export default function reducer(state = {
    searchText: '0xce7ab7093a056598c53b5d87082c7019eb2275db'   
  }, action) {
     switch (action.type) {  
        case "SEARCH_TEXT_CHANGED": {
            return { ...state,  searchText: action.payload}
        }      
        default: {
             return { ...state }
         }
     }
 }
 