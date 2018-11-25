import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PollScanApp from "./PollScanApp";
import store, { history } from "./store";
import { HomePage, PollStats, Voters, Activities, EntityAdminActivities, EntityMembers, EOA, Entity } from "./pages";
import "./App.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <PollScanApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/contract" component={PollStats} />
              <Route exact path="/voters" component={Voters} />
              <Route exact path="/events" component={Activities} />
              <Route exact path="/entity" component={Entity} />
              <Route exact path="/entity/adminactivities" component={EntityAdminActivities} />
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
