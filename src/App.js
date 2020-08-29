import React from "react";
import EditPage from "./pages/EditPage";
import SchedulePage from "./pages/SchedulePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" render={() => <EditPage />} />
      <Route exact path="/schedule" component={SchedulePage} />
    </Router>
  );
}

export default App;
