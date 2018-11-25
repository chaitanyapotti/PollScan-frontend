import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PollScanApp from "./PollScanApp";
import store, { history } from "./store";
import { HomePage, PollStats, Voters, Activities, EntityAdminActivities, EntityMembers, EOA } from "./pages";
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
              <Route path="/contract" component={PollStats} />
              <Route path="/voters" component={Voters} />
              <Route path="/events" component={Activities} />
              <Route path="/entity/adminactivities" component={EntityAdminActivities} />
              <Route path="/entity/members" component={EntityMembers} />
              <Route path="/eoa" component={EOA} />
            </Switch>
          </PollScanApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
