import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IdeaPage from "./pages/IdeaPage";
import { StateProvider, initialGlobalState } from "./state";
import mainReducer from "./state/reducers";

function App() {
  return (
    <StateProvider initialState={initialGlobalState} reducer={mainReducer}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/ideas/:id" component={IdeaPage} />
        </div>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
