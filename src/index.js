import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./pages/overrideSpectrum.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODOS:
// - 🟢 clear store subjects after leaving the schedule page
// - 🟢 be able to delete subjects in the schedule page
// - 🟢 prevent adding subjects of the same name
// - 🟢 running flash animation after saving a subject OR adding a subject to the schedule
// - 🟢 prevent navigating to the schedule page before adding subjects (display some kind of 404 image)
// - 🟢 prevent navigating to the schedule page without clicking the "Generate Schedule button"
// - 🟢 convert the textfield inputs in the "add subject" moadl to a picker inputs
// - 🟢 adding hover animation to every class of the same subject when hovering over one of them
// - 🟢 refactor the Schedule Component to use ClassSlot component
// - 🟢 remove the propmpt message when there is no schedule shown
// - 🟢 add teachers load modal
// - 🟢 fix the webpack generateSchedule import issue after adding a subject in the schedule page
// - 🟢 adding different colors to every individual subject in the schedule page
// - 🟢 figure out a way to determine if a subject can't be added to the schedule because of lack of time slots
// - add loading animation after clicking "Generate Schedule" button OR adding new subject in the schedule page
// - prevent showing "no subjects added" message when deleting all subjects in the schedule
// - add error message if the user tries to delete subject that doesn't exist
// - fix addSubjectDialog form, when hitting "enter" the all subjects are removed
// - prevent adding subjects of the same name in AddSubjectDialog
// - diasable the add button when the load exceeds the limit in FormEl

// - optional: implement the search subjects feature in the scheule page

// Others:
// Redux: check the store then take a piece of data
