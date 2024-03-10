import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
  const initialMessage = ''
  const initialEmail = ''
  const initialSteps = 0
  const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [ data, setData ] = useState({
    index: 4,
    steps: 0,
    message: "",
    email: ""
  });

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY(arg) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let string, x, y;
    const grid = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === data.index) {
          x = j + 1;
          y = i + 1;
          string = `(${j + 1}, ${i + 1})`;
        }
      };
    };
    if (arg === "x") return x;
    if (arg === "y") return y;
    return string;
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setData({ index: 4, steps: 0, message: "", email: "" });
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // const { id } = direction.target;
    if (direction === "left") {
      if (data.index - 1 >= 0 && data.index !== 3 && data.index !== 6) {
        setData({ ...data, steps: data.steps + 1, index: data.index - 1, message: "" });       
      } else {
        setData({ ...data, message: "You can't go left" });       
      };
    };
    if (direction === "up") {
      if (data.index - 3 >= 0) {
        setData({ ...data, steps: data.steps + 1, index: data.index - 3, message: "" });
      } else {
        setData({ ...data, message: "You can't go up" });
      };
    };
    if (direction === "down") {
      if (data.index + 3 <= 8) {
        setData({ ...data, steps: data.steps + 1, index: data.index + 3, message: "" });
      } else {
        setData({ ...data, message: "You can't go down" });
      };
    };
    if (direction === "right") {
      if (data.index + 1 <= 8 && data.index !== 2 && data.index !== 5) {
        setData({ ...data, steps: data.steps + 1, index: data.index + 1, message: "" });       
      } else {
        setData({ ...data, message: "You can't go right" });       
      };
    };
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    // console.log(value);
    setData({ ...data, email: value })
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const post = { x: getXY("x"), y: getXY("y"), steps: data.steps, email: data.email };
    console.log(post);
    axios.post(`http://localhost:9000/api/result`, post)
    .then((response) => {
      setData({ ...data, email: "", message: response.data.message });
      console.log(response.data.message);
    })
    .catch((error) => {
      if (data.email === "") setData({ ...data, message: "Ouch: email is required" });
      else if (data.email === "foo@bar.baz") setData({ ...data, message: "foo@bar.baz failure #71" });
      else setData({ ...data, message: "Ouch: email must be a valid email" });
    })
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="steps">You moved {data.steps} time{data.steps !== 1 ? "s" : ""}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === data.index ? ' active' : ''}`}>
              {idx === data.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => getNextIndex("left")}>LEFT</button>
        <button id="up" onClick={() => getNextIndex("up")}>UP</button>
        <button id="right" onClick={() => getNextIndex("right")}>RIGHT</button>
        <button id="down" onClick={() => getNextIndex("down")}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" value={data.email} onChange={onChange}></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
