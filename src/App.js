import React, { Component } from "react";
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
  }

  examMarkChanged = value => {
    this.setState({ examMark: value });
  };

  examWeightingChanged = value => {
    this.setState({ examWeighting: value });
  };

  examHurdleChanged = value => {
    this.setState({ examHurdle: value });
  };

  assessmentsChanged = assessments => {
    this.setState({ assessments: assessments });
  };

  calculateWAM = () => {
    let mark = 0;

    this.state.assessments.map(assessment => {
      mark += assessment.mark * (assessment.weighting / 100);
    });

    mark += this.state.examMark * (this.state.examWeighting / 100);

    if (mark > 100) {
      return 100;
    } else {
      return mark;
    }
  };

  calculateLetterGrade = () => {
    let wam = this.calculateWAM();

    if (wam < 55) {
      return "F";
    } else if (this.state.examMark < this.state.examHurdle) {
      return "F (hurdle)";
    } else if (wam >= 55 && wam < 70) {
      return "PS";
    } else if (wam >= 70 && wam < 80) {
      return "CR";
    } else if (wam >= 80 && wam < 90) {
      return "DN";
    } else {
      return "HD";
    }
  };

  calculateExamMarkNeeded = target => {
    let examlessWAM =
      this.calculateWAM() -
      this.state.examMark * (this.state.examWeighting / 100);

    let mark = Math.ceil(
      100 * (target - examlessWAM) / this.state.examWeighting
    );

    if (mark >= 0 && mark <= 100) {
      return Math.max(mark, this.state.examHurdle);
    } else {
      return "impossible";
    }
  };

  shouldShowTarget = target => {
    return this.calculateExamMarkNeeded(target) <= 100;
  };

  render() {
    return (
      <div className="App">
        <div className="columns">
          <div className="column">
            <p className="info">
              Fill in as much information as possible to most accurately
              estimate your WAM. Entering a weighting for the final exam will
              give a target score for each academic award.
            </p>

            <h2 className="wam subtitle has-text-centered">
              {this.calculateWAM()} {this.calculateLetterGrade()}
            </h2>
            {this.shouldShowTarget(55) && (
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Final exam requirements</p>
                </div>
                <div className="card-content">
                  <p>
                    <strong>{this.calculateExamMarkNeeded(55)}%</strong> to pass
                  </p>
                  {this.shouldShowTarget(70) && (
                    <p>
                      <strong>{this.calculateExamMarkNeeded(70)}%</strong> for a
                      credit
                    </p>
                  )}
                  {this.shouldShowTarget(80) && (
                    <p>
                      <strong>{this.calculateExamMarkNeeded(80)}%</strong> for a
                      distinction
                    </p>
                  )}
                  {this.shouldShowTarget(90) && (
                    <p>
                      <strong>{this.calculateExamMarkNeeded(90)}%</strong> for a
                      high distinction
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="column">
            <h2 className="subtitle">Exam</h2>
            <div className="columns is-mobile">
              <div className="column">
                <label className="label">Mark</label>

                <PercentageInput value={0} handler={this.examMarkChanged} />
              </div>
              <div className="column">
                <label className="label">Weighting</label>

                <PercentageInput
                  value={50}
                  handler={this.examWeightingChanged}
                />
              </div>
              <div className="column">
                <label className="label">Hurdle</label>

                <PercentageInput value={60} handler={this.examHurdleChanged} />
              </div>
            </div>

            <h2 className="subtitle">Assessments</h2>

            <AssessmentEditor assessmentsChanged={this.assessmentsChanged} />
          </div>
        </div>
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
  }

  render() {
    return (
      <input
        onChange={this.edited}
        type="number"
        placeholder={this.props.value}
        className={"input " + (this.state.valid ? "" : "is-danger")}
      />
    );
  }

  edited = event => {
    console.log("edited");
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) | (value > 100) | (value < 0)) {
      this.setState({ valid: false });
    } else {
      this.setState({ value: value, valid: true });
      this.props.handler(value);
    }
  };
}

class AssessmentEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assessments: [{ name: "test", mark: 0, weighting: 0 }]
    };
  }

  markChanged = (id, mark) => {
    let assessments = this.state.assessments;

    assessments[id].mark = mark;
    this.setState({ assessments: assessments });

    this.props.assessmentsChanged(this.state.assessments);
  };

  weightingChanged = (id, weighting) => {
    let assessments = this.state.assessments;

    assessments[id].weighting = weighting;
    this.setState({ assessments: assessments });

    this.props.assessmentsChanged(this.state.assessments);
  };

  nameChanged = (id, event) => {
    let assessments = this.state.assessments;

    assessments[id].name = event.target.value;
    this.setState({ assessments: assessments });

    this.props.assessmentsChanged(this.state.assessments);
  };

  addAssessment = () => {
    let assessments = this.state.assessments;
    assessments.push({
      name: "",
      mark: 0,
      weighting: 0
    });
    this.setState({ assessments: assessments });

    this.props.assessmentsChanged(this.state.assessments);
  };

  removeAssessment = id => {
    let assessments = this.state.assessments;
    assessments.splice(id, 1);
    this.setState({ assessments: assessments });

    this.props.assessmentsChanged(this.state.assessments);
  };

  render() {
    return (
      <div>
        <div className="columns is-mobile">
          <div className="column is-5">
            <label className="label">Name</label>
          </div>
          <div className="column is-3">
            <label className="label">Mark</label>
          </div>
          <div className="column is-3">
            <label className="label">Weighting</label>
          </div>
          <div className="column is-1" />
        </div>
        <ul>{this.state.assessments.map(this.renderAssessment)}</ul>
        <div className="has-text-centered">
          <a
            className="button button-padded is-primary"
            onClick={this.addAssessment}
          >
            Add
          </a>
        </div>
      </div>
    );
  }

  renderAssessment = (item, id) => {
    return (
      <li key={id}>
        <div className="columns is-mobile">
          <div className="column is-5">
            <input
              className="input"
              placeholder="Midsemester exam"
              onChange={event => this.nameChanged(id, event)}
            />
          </div>
          <div className="column is-3">
            <PercentageInput
              value={25}
              handler={mark => this.markChanged(id, mark)}
            />
          </div>
          <div className="column is-3">
            <PercentageInput
              value={50}
              handler={weighting => this.weightingChanged(id, weighting)}
            />
          </div>

          <div className="column is-1 is-vcentered">
            <a
              className="delete vcenter"
              onClick={() => this.removeAssessment(id)}
            />
          </div>
        </div>
      </li>
    );
  };
}
export default App;
