import { combineReducers } from 'redux';
import searchBarData from './searchBarReducer';
import allActivities from './allActivitiesReducer';
import pollStats from './pollStatsReducer';

const appReducer = combineReducers({
    searchBarData: searchBarData, 
    allActivities: allActivities,
    pollStats: pollStats
  })
  
  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGGED_OUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }
  export default rootReducer;