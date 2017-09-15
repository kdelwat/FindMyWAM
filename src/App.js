import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examMark: 0,
      examWeighting: 0,
      examHurdle: 0,
      assessments: []
    };

    this.examMarkChanged = this.examMarkChanged.bind(this);
    this.examWeightingChanged = this.examWeightingChanged.bind(this);
    this.examHurdleChanged = this.examHurdleChanged.bind(this);
  }

  examMarkChanged(value) {
    this.setState({ examMark: value });
  }

  examWeightingChanged(value) {
    this.setState({ examWeighting: value });
  }

  examHurdleChanged(value) {
    this.setState({ examHurdle: value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.state.examMark},{this.state.examWeighting},
          {this.state.examHurdle}
        </p>
        <PercentageInput handler={this.examMarkChanged} />
        <PercentageInput handler={this.examWeightingChanged} />
        <PercentageInput handler={this.examHurdleChanged} />
      </div>
    );
  }
}

class PercentageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      valid: true
    };

    this.edited = this.edited.bind(this);
  }

  render() {
    return (
      <input
        onChange={this.edited}
        className={this.state.valid ? "" : "error"}
      />
    );
  }

  edited(event) {
    console.log("edited");
    let value = parseInt(event.target.value);

    if (isNaN(value) | (value > 100) | (value < 0)) {
      this.setState({ valid: false });
    } else {
      this.setState({ value: value, valid: true });
      this.props.handler(value);
    }
  }
}

export default App;
