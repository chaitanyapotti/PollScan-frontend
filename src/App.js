import React, { Component } from "react";
import "./App.css";
import PollScan from "./containers/pollScan";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PollScan history={this.props.history} />
      </div>
    );
  }
}

export default App;
