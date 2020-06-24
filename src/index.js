import React, { useReducer, useRef } from "react";
import ReactDOM from "react-dom";

import { v4 as uuid } from "node-uuid";

import "./styles.css";

const App = () => {
  const refInp = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    const stateChanger = {
      add: () => {
        return [
          ...state,
          {
            id: uuid(),
            name: action.name
          }
        ];
      },
      rem: () => state.filter((_, index) => index !== action.key),
      clr: () => [],
      default: () => state
    };
    return stateChanger.hasOwnProperty(action.type)
         ? stateChanger[action.type]()
         : stateChanger["default"]();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({
      type: "add",
      name: refInp.current.value
    });
    refInp.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={refInp} />
      </form>
      <br />
      <button onClick={() => dispatch({ type: "clr" })}>Clear</button>
      <ul>
        {items.map((item, indx) => (
          <li key={item.id}>
            {item.name}&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              onClick={() =>
                dispatch({
                  type: "rem",
                  key: indx
                })
              }
            >
              &nbsp;&nbsp;X&nbsp;&nbsp;
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
