import { combineReducers } from "redux";
import searchBarData from "./searchBarReducer";
import allActivities from "./activitiesReducer";
import pollStats from "./pollStatsReducer";
import entityData from "./entityReducer";
import eoaData from "./eoaReducer";

const appReducer = combineReducers({
  searchBarData: searchBarData,
  allActivities: allActivities,
  pollStats: pollStats,
  entityData: entityData,
  eoaData: eoaData
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
