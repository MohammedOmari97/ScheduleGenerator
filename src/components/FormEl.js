import React, { useState } from "react";
import {
  Form,
  TextField,
  defaultTheme,
  Provider,
  Button,
} from "@adobe/react-spectrum";
import { subjectAdded, scheduleGenerated } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./formEl.module.css";
import { Subject, Population } from "../utils/generateSchedule";
import { Redirect } from "react-router-dom";

function FormEl() {
  const [subject, setSubject] = useState("");
  const [instructor, setInstructor] = useState("");
  const [hpw, setHpw] = useState("");
  const [level, setLevel] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  let subjects = useSelector((state) => state.subjects);
  let scheduleSubjects = useSelector((state) => state.schedule);

  if (redirect) {
    return (
      <Redirect
        push
        to={{ pathname: "/schedule", state: { subjects: scheduleSubjects } }}
      />
    );
  }

  return (
    <Provider theme={defaultTheme}>
      <Form
        className={styles.subjectsForm}
        width="size-6000"
        margin="auto"
        styles={{ background: "#fff" }}
        backgroundColor="#fff"
      >
        <TextField
          label="Subject's name"
          placeholder="Data structures"
          onChange={setSubject}
          value={subject}
        />
        <TextField
          label="Subject's instructor"
          placeholder="Mohamed Mekky"
          onChange={setInstructor}
          value={instructor}
        />
        <TextField
          label="Subject's hours per week"
          placeholder="3"
          onChange={setHpw}
          value={hpw}
        />
        <TextField
          label="Subject's level"
          placeholder="3"
          onChange={setLevel}
          value={level}
        />
        <Button
          width="size-160"
          variant="cta"
          margin="auto"
          marginTop="size-160"
          onPress={() => {
            dispatch(subjectAdded(subject, instructor, hpw, level));
            setSubject("");
            setInstructor("");
            setHpw("");
            setLevel("");
          }}
        >
          Add
        </Button>
        <Button
          variant="cta"
          onPress={() => {
            let subjectsArr = subjects.map((subject) => {
              return new Subject(
                subject.subjectName,
                subject.subjectInstructor,
                Number(subject.hoursPerWeek),
                Number(subject.level)
              );
            });
            let pop = new Population(subjectsArr, 5);
            pop.result.subjects.map((subject) => {
              subject.days = Array.from(subject.days);
              return subject;
            });
            dispatch(scheduleGenerated(pop.result.subjects));
            setRedirect(true);
          }}
        >
          Generate Schedule
        </Button>
      </Form>
    </Provider>
  );
}

export default FormEl;
