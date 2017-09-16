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

        <AssessmentEditor />
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

class AssessmentEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assessments: [{ name: "test", mark: 0, weighting: 0 }]
    };

    this.markChanged = this.markChanged.bind(this);
    this.weightingChanged = this.weightingChanged.bind(this);
    this.renderAssessment = this.renderAssessment.bind(this);
  }

  markChanged(id, mark) {
    let assessments = this.state.assessments;

    assessments[id].mark = mark;
    this.setState({ assessments: assessments });
  }

  weightingChanged(id, weighting) {
    let assessments = this.state.assessments;

    assessments[id].weighting = weighting;
    this.setState({ assessments: assessments });
  }

  nameChanged = (id, event) => {
    let assessments = this.state.assessments;

    assessments[id].name = event.target.value;
    this.setState({ assessments: assessments });
  };

  addAssessment = () => {
    let assessments = this.state.assessments;
    assessments.push({
      name: "",
      mark: 0,
      weighting: 0
    });
    this.setState({ assessments: assessments });
  };

  removeAssessment = id => {
    let assessments = this.state.assessments;
    assessments.splice(id, 1);
    this.setState({ assessments: assessments });
  };

  render() {
    return (
      <div>
        <ul>{this.state.assessments.map(this.renderAssessment)}</ul>
        <button onClick={this.addAssessment}>Add assessment</button>
      </div>
    );
  }

  renderAssessment(item, id) {
    return (
      <li key={id}>
        <p>
          {item.name} {item.mark} {item.weighting}
        </p>
        <input onChange={event => this.nameChanged(id, event)} />
        <PercentageInput handler={mark => this.markChanged(id, mark)} />
        <PercentageInput
          handler={weighting => this.weightingChanged(id, weighting)}
        />
        <button onClick={() => this.removeAssessment(id)}>Delete</button>
      </li>
    );
  }
}
export default App;
