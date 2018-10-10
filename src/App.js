import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import PollScan from "./containers/pollScan";
import "./index.css";
import { connect } from "react-redux";
import logo from "./assets/logo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.history.push({ pathname: "/" });
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: ""
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="App-title"> <img src={logo} onClick={this.handleOnClick} /> </div>
        </header>
        <PollScan history={this.props.history} />
      </div>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    searchText: globalData.searchBarData.searchText
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(App));
