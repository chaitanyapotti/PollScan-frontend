import React, { Component } from 'react';
import './App.css';
import PollScan from './containers/pollScan'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Pollscan.io</h1>
        </header>
        <PollScan />
      </div>
    );
  }
}

export default App;
