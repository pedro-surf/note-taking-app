import React, { createContext, useContext, useReducer } from "react";

import todoData from "./todoData";
import authData from "./authData";

export const StateContext = createContext();

export const initialGlobalState = {
  todoData,
  authData
};

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
