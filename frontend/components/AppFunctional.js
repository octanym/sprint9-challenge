import React, { useState, useEffect } from "react";
import axios from "axios";

// Suggested initial states
const initialCoordinates = "";
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [state, setState] = useState({
    initialCoordinates: initialCoordinates,
    initialMessage: initialMessage,
    initialEmail: initialEmail,
    initialSteps: initialSteps,
    initialIndex: initialIndex,
  });

  function getXY() {
    let x;
    let y;

    if (state.initialIndex >= 6) {
      x = (state.initialIndex % 6) + 1;
      y = 3;
    }

    if (state.initialIndex > 2 && state.initialIndex < 6) {
      x = state.initialIndex - 2;
      y = 2;
    }

    if (state.initialIndex <= 2) {
      x = state.initialIndex + 1;
      y = 1;
    }
    return [x, y];
  }

  function getXYMessage() {
    const coords = getXY();
    return `Coordinates (${coords[0]}, ${coords[1]})`;
  }

  function reset() {
    setState({
      initialCoordinates: initialCoordinates,
      initialMessage: initialMessage,
      initialEmail: initialEmail,
      initialSteps: initialSteps,
      initialIndex: initialIndex,
    });
  }

  function getNextIndex(direction) {
    if (direction === "left") {
      if (state.initialIndex % 3 === 0) {
        return state.initialIndex;
      } else {
        return state.initialIndex--;
      }
    }

    if (direction === "right") {
      if ((state.initialIndex + 1) % 3 === 0 || state.initialIndex === 8) {
        return state.initialIndex;
      } else {
        return state.initialIndex++;
      }
    }

    if (direction === "up") {
      if (state.initialIndex < 3) {
        return state.initialIndex;
      } else {
        return state.initialIndex - 3;
      }
    }

    if (direction === "down") {
      if (state.initialIndex >= 6) {
        return state.initialIndex;
      } else {
        return state.initialIndex + 3;
      }
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    const {
      target: { name },
    } = evt;

    if (getNextIndex(name) === state.initialIndex) {
      return setState({ ...state, initialMessage: `You can't go ${name}` });
    }
    // and change any states accordingly
    return setState({
      ...state,
      initialCoordinates: getXYMessage(),
      initialMessage: "",
      initialSteps: (state.initialSteps += 1),
      initialIndex: getNextIndex(name),
    });
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const {
      target: { name, value },
    } = evt;

    setState({ ...state, [name]: [value] });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const [x, y] = getXY();

    const [email] = state.initialEmail;

    const payload = {
      email: email,
      x: x,
      y: y,
      steps: state.initialSteps,
    };

    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        console.log(res.data);
        setState({ ...state, initialMessage: res.data.message });
      })
      .catch((err) => {
        console.log(err.message);
        setState({ ...state, initialMessage: err.message });
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {state.initialSteps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === state.initialIndex ? " active" : ""}`}
          >
            {idx === state.initialIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.initialMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left" name="left">
          LEFT
        </button>
        <button onClick={move} id="up" name="up">
          UP
        </button>
        <button onClick={move} id="right" name="right">
          RIGHT
        </button>
        <button onClick={move} id="down" name="down">
          DOWN
        </button>
        <button onClick={reset} id="reset" name="reset">
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          name="initialEmail"
          value={state.initialEmail}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
