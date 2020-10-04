import React from "react";
import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule";
import { Prompt } from "react-router";
import { useSelector } from "react-redux";

function SchedulePage({ location }) {
  // console.log(location.state.subjects); // passing subjects using the location prop
  const subjects = useSelector((state) => state.schedule);

  return (
    <div>
      {subjects.length > 0 && (
        <Prompt message="All schedule data will be lost after leaving this page, Do you want to continue?" />
      )}
      <Navbar page="schedule" />
      <Schedule />
    </div>
  );
}

export default SchedulePage;
