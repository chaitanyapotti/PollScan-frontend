import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, persistedState, middleware);

const store = createStore(rootReducer, persistedState, composeEnhancers(middleware));
// use throttle from iodash if you feel that state is getting stored too frequently
store.subscribe(() => {
  saveState({
    signinData: store.getState().signinData,
    tabData: store.getState().tabData
  });
});

export const history = createHistory();

export default store;
