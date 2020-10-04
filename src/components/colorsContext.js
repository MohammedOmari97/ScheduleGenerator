import React, { createContext, useReducer, useContext } from "react";
import { nanoid } from "@reduxjs/toolkit";

const ColorsDispatchContext = createContext();
const ColorsStateContext = createContext();

const colors = [
  {
    level0: "#FFCAB7",
    level1: "#ff4c4c",
    level2: "#DB3745",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#97EEFC",
    level1: "#0099e5",
    level2: "#0076C4",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#B9F8B0",
    level1: "#34bf49",
    level2: "#26A444",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#FDDEA7",
    level1: "#f48924",
    level2: "#D16A1A",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#ADF9D0",
    level1: "#30c39e",
    level2: "#23A793",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#E2E8EE",
    level1: "#52565e",
    level2: "#3B4250",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#FECCBD",
    level1: "#fd5c63",
    level2: "#D94357",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#FFB9B8",
    level1: "#ff4f81",
    level2: "#DB3977",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#DFB4FC",
    level1: "#8e43e7",
    level2: "#6E30C6",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#ABFBC4",
    level1: "#2dde98",
    level2: "#20BE90",
    taken: false,
    id: nanoid(),
  },
  {
    level0: "#BBF8E2",
    level1: "#49c0b6",
    level2: "#35A4A5",
    taken: false,
    id: nanoid(),
  },
];

function reducer(state, action) {
  if (action.type === "COLOR_TAKEN") {
    return state.map((color) => {
      if (color.id === action.payload.id) {
        return { ...color, taken: true };
      }
      return color;
    });
  } else return state;
}

function ColorsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, colors);

  return (
    <ColorsStateContext.Provider value={state}>
      <ColorsDispatchContext.Provider value={dispatch}>
        {children}
      </ColorsDispatchContext.Provider>
    </ColorsStateContext.Provider>
  );
}

function useColorsDispatch() {
  const context = useContext(ColorsDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

function useColorsState() {
  const context = useContext(ColorsStateContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

export { ColorsProvider, useColorsState, useColorsDispatch };
