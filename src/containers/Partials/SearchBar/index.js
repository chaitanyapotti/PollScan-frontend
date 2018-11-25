import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid } from "react-flexbox-grid";
import { Modal, Button, Grid as SGrid } from "semantic-ui-react";
import {
  getName,
  getPollType,
  getVoterBaseLogic,
  getProposalsWithVotes,
  getStartTime,
  getEndTime,
  getVoterBaseDenominator,
  getVoteTalliesWeighted
} from "../../../actions/searchBarActions";
import logo from "../../../assets/logo.png";
import "../../../styles/modalStyle.css";

class SearchBar extends Component {
  handleSearchTextChange = event => {
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: event.target.value
    });
  };

  handleOnClick = () => {
    this.props.history.push({ pathname: "/" });
    this.props.dispatch({
      type: "SEARCH_TEXT_CHANGED",
      payload: ""
    });
  };

  fetchData = () => {
    this.props.dispatch({
      type: "SHOW_POLLSTAT_LOADER",
      payload: null
    });
    this.props.dispatch(getName(this.props.searchText));
    this.props.dispatch(getPollType(this.props.searchText));
    this.props.dispatch(getVoterBaseLogic(this.props.searchText));
    this.props.dispatch(getStartTime(this.props.searchText));
    this.props.dispatch(getEndTime(this.props.searchText));
    this.props.dispatch(getVoteTalliesWeighted(this.props.searchText));
    this.props.dispatch(getVoterBaseDenominator(this.props.searchText));
    this.props.dispatch(getProposalsWithVotes(this.props.searchText));
    this.props.history.push({
      pathname: `/contract`,
      search: "?contract=" + this.props.searchText
    });
  };

  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.fetchData();
    }
  };

  fetchEntityData = () => {
    this.props.history.push({
      pathname: `/entity/adminactivities`,
      search: "?contract=" + this.props.searchText
    });
  };

  handleSearchClick = () => {
    this.fetchEntityData();
    // this.fetchData()
  };

  handleModalDoneAction = () => {
    this.props.dispatch({ type: "CLOSE_HELPER_MODAL" });
  };

  handleCopyButtonClicked = (e, data) => {
    var textField = document.createElement("textarea");
    textField.contentEditable = true;
    textField.readOnly = false;
    textField.setSelectionRange(0, 9999999);
    textField.innerText = data.children;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  render() {
    return (
      <Grid>
        {false ? (
          <Modal
            open={this.props.helperModal === true}
            header="Hello, welcome to PollScan test version on Rinkeby!"
            content={
              <div>
                <h3 className="helperModalText">
                  Please click on any of the sample poll addresses below in order to copy them, so that you can search for them on PollScan:
                </h3>

                <ul className="flex">
                  <li>
                    <Button className="address" onClick={this.handleCopyButtonClicked.bind("0x95d0fFEa1400584d85ae2533917DB058059D8046")}>
                      0x95d0fFEa1400584d85ae2533917DB058059D8046
                    </Button>
                  </li>
                  <li>
                    <Button className="address" onClick={this.handleCopyButtonClicked.bind("0x9FFaFa2618b92c68E38BaED7668E73484fda2E4d")}>
                      0x9FFaFa2618b92c68E38BaED7668E73484fda2E4d
                    </Button>
                  </li>
                  <li>
                    <Button className="address" onClick={this.handleCopyButtonClicked.bind("0x0073db1d47047d2d0DbbbE7c2CeaFd059C3fde62")}>
                      0x0073db1d47047d2d0DbbbE7c2CeaFd059C3fde62
                    </Button>
                  </li>
                  <li>
                    <Button className="address" onClick={this.handleCopyButtonClicked.bind("0xC1064Bc2Ed078A17dE2CdE99499B49C8343CaE0b")}>
                      0xC1064Bc2Ed078A17dE2CdE99499B49C8343CaE0b
                    </Button>
                  </li>
                  <li>
                    <Button className="address" onClick={this.handleCopyButtonClicked.bind("0xbe67e58cd38081f42ccfd4e22452873ceb24d5d9")}>
                      0xbe67e58cd38081f42ccfd4e22452873ceb24d5d9
                    </Button>
                  </li>
                </ul>
              </div>
            }
            actions={[{ key: "done", content: "Done", positive: true }]}
            onActionClick={this.handleModalDoneAction}
          />
        ) : null}
        <div className="App-title">
          {" "}
          <img src={logo} onClick={this.handleOnClick} />{" "}
        </div>
        <div className="search">
          <input
            className="search-input"
            spellCheck="false"
            value={this.props.searchText}
            placeholder="Search for any Poll, Entity or externally owned addresses"
            onChange={this.handleSearchTextChange}
            onKeyPress={this.enterPressed}
          />
          <button className="search-button" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
      </Grid>
    );
  }
}

function mapStatesToProps(globalData) {
  return {
    searchText: globalData.searchBarData.searchText,
    helperModal: globalData.searchBarData.helperModal
  };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(SearchBar));
