import React, { Component } from "react";
import axios from "axios";

const initialCoordinates = "";
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCoordinates: initialCoordinates,
      initialMessage: initialMessage,
      initialEmail: initialEmail,
      initialSteps: initialSteps,
      initialIndex: initialIndex,
    };
  }

  getXY() {
    let x;
    let y;

    if (this.state.initialIndex >= 6) {
      x = (this.state.initialIndex % 6) + 1;
      y = 3;
    }

    if (this.state.initialIndex > 2 && this.state.initialIndex < 6) {
      x = this.state.initialIndex - 2;
      y = 2;
    }

    if (this.state.initialIndex <= 2) {
      x = this.state.initialIndex + 1;
      y = 1;
    }
    return [x, y];
  }

  getXYMessage() {
    const coords = this.getXY();
    return `Coordinates (${coords[0]}, ${coords[1]})`;
  }

  reset() {
    this.setState({
      initialCoordinates: initialCoordinates,
      initialMessage: initialMessage,
      initialEmail: initialEmail,
      initialSteps: initialSteps,
      initialIndex: initialIndex,
    });
  }

  getNextIndex(direction) {
    if (direction === "left") {
      if (this.state.initialIndex % 3 === 0) {
        return this.state.initialIndex;
      } else {
        return this.state.initialIndex - 1;
      }
    }

    if (direction === "right") {
      if (
        (this.state.initialIndex + 1) % 3 === 0 ||
        this.state.initialIndex === 8
      ) {
        return this.state.initialIndex;
      } else {
        return this.state.initialIndex + 1;
      }
    }

    if (direction === "up") {
      if (this.state.initialIndex < 3) {
        return this.state.initialIndex;
      } else {
        return this.state.initialIndex - 3;
      }
    }

    if (direction === "down") {
      if (this.state.initialIndex >= 6) {
        return this.state.initialIndex;
      } else {
        return this.state.initialIndex + 3;
      }
    }
  }

  move(evt) {
    const {
      target: { name },
    } = evt;

    if (this.getNextIndex(name) === this.state.initialIndex) {
      return this.setState({ initialMessage: `You can't go ${name}` });
    }

    return this.setState((prevState) => ({
      initialCoordinates: this.getXYMessage(),
      initialMessage: "",
      initialSteps: prevState.initialSteps + 1,
      initialIndex: this.getNextIndex(name),
    }));
  }

  onChange(evt) {
    const {
      target: { name, value },
    } = evt;

    this.setState({ [name]: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const [x, y] = this.getXY();

    const { initialEmail, initialSteps } = this.state;
    const email = initialEmail;

    const payload = {
      email: email,
      x: x,
      y: y,
      steps: initialSteps,
    };

    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        this.setState({
          initialEmail: "",
          initialMessage: res.data.message,
        });
      })
      .catch((err) => {
        this.setState({
          initialEmail: "",
          initialMessage: err.response.data.message,
        });
      });
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.initialSteps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${
                idx === this.state.initialIndex ? " active" : ""
              }`}
            >
              {idx === this.state.initialIndex ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.initialMessage}</h3>
        </div>
        <div id="keypad">
          <button onClick={(evt) => this.move(evt)} id="left" name="left">
            LEFT
          </button>
          <button onClick={(evt) => this.move(evt)} id="up" name="up">
            UP
          </button>
          <button onClick={(evt) => this.move(evt)} id="right" name="right">
            RIGHT
          </button>
          <button onClick={(evt) => this.move(evt)} id="down" name="down">
            DOWN
          </button>
          <button onClick={() => this.reset()} id="reset" name="reset">
            reset
          </button>
        </div>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <input
            onChange={(evt) => this.onChange(evt)}
            name="initialEmail"
            value={this.state.initialEmail}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

export default AppClass;
