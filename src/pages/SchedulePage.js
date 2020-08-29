import React from "react";
import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule";
import { Provider, defaultTheme } from "@adobe/react-spectrum";

function SchedulePage({ location }) {
  console.log(location.state.subjects);
  return (
    <div>
      <Navbar page="schedule" />
      <Schedule subjects={location.state.subjects} />
    </div>
  );
}

export default SchedulePage;
