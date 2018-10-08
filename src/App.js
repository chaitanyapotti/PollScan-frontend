import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import PollScan from "./containers/pollScan";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.history.push({ pathname: "/" });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1 onClick={this.handleOnClick} className="App-title">
            Pollscan.io
          </h1>
        </header>
        <PollScan history={this.props.history} />
      </div>
    );
  }
}

export default withRouter(App);
