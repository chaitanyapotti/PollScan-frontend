import React from "react";
import { withRouter } from "react-router-dom";
import { SearchBar } from "./containers/Partials";

class PollScanApp extends React.PureComponent {
  render() {
    return (
      <div className="main-container">
        <SearchBar />
        <div style={{ marginBottom: "50px" }} className="main-content push-top--35">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(PollScanApp);
