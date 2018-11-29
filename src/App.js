import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PollScanApp from "./PollScanApp";
import store from "./store";
import history from "./history";
import { HomePage, PollStats, Voters, Activities, EntityActivities, EntityMembers, EOA, Entity } from "./pages";
import "./App.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <PollScanApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/poll" component={PollStats} />
              <Route exact path="/poll/voters" component={Voters} />
              <Route exact path="/poll/logs" component={Activities} />
              <Route exact path="/entity" component={Entity} />
              <Route exact path="/entity/logs" component={EntityActivities} />
              <Route exact path="/entity/members" component={EntityMembers} />
              <Route exact path="/eoa" component={EOA} />
            </Switch>
          </PollScanApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
