import React, { useState, useEffect } from "react";

// Suggested initial states
const initialMessage = "Coordinates (2, 2)";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    initialMessage: initialMessage,
    initialEmail: initialEmail,
    initialSteps: initialSteps,
    initialIndex: initialIndex,
  });

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x;
    let y;

    if (state.initialIndex >= 6) {
      x = (state.initialIndex % 6) + 1;
      y = 3;
    }

    if (3 <= state.initialIndex && state.initialIndex <= 5) {
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
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = getXY();
    return `Coordinates (${coords[0]}, ${coords[1]})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({
      initialMessage: initialMessage,
      initialEmail: initialEmail,
      initialSteps: initialSteps,
      initialIndex: initialIndex,
    });
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left") {
      if (state.initialIndex % 3 === 0) {
        //setState({ ...state, initialMessage: "You can't go left" });
        return state.initialIndex;
      } else {
        return state.initialIndex--;
      }
    }

    if (direction === "right") {
      if ((state.initialIndex + 1) % 3 === 0 || state.initialIndex === 8) {
        //setState({ ...state, initialMessage: "You can't go right" });
        return state.initialIndex;
      } else {
        return state.initialIndex++;
      }
    }

    if (direction === "up") {
      if (state.initialIndex < 3) {
        //setState({ ...state, initialMessage: "You can't go up" });
        return state.initialIndex;
      } else {
        return state.initialIndex - 3;
      }
    }

    if (direction === "down") {
      if (state.initialIndex > 6) {
        //setState({ ...state, initialMessage: "You can't go down" });
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
    console.log(getNextIndex(name));
    // and change any states accordingly
    setState({
      ...state,
      initialIndex: getNextIndex(name),
      initialSteps: (state.initialSteps += 1),
    });
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  useEffect(() => {
    setState({ ...state, initialMessage: getXYMessage() });
  }, [state.initialIndex]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{state.initialMessage}</h3>
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
        <h3 id="message"></h3>
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
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
