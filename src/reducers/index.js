import { combineReducers } from "redux";
import searchBarData from "./searchBarReducer";
import allActivities from "./activitiesReducer";
import pollStats from "./pollStatsReducer";

const appReducer = combineReducers({
  searchBarData: searchBarData,
  allActivities: allActivities,
  pollStats: pollStats
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
