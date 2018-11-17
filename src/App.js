import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PollScanApp from "./PollScanApp";
import store, { history } from "./store";
import { HomePage, PollStats, Voters, Activities } from "./pages";
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
              <Route path="/contract" component={PollStats} />
              <Route path="/voters" component={Voters} />
              <Route path="/events" component={Activities} />
            </Switch>
          </PollScanApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
