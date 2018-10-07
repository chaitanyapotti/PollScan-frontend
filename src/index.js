import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store, { history } from "./store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

const app = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </Router>
  </Provider>,
  app
);

registerServiceWorker();
