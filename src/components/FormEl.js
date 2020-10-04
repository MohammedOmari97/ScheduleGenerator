import React, { useState, useMemo } from "react";
import {
  Form,
  TextField,
  defaultTheme,
  Provider,
  Button,
  Flex,
  Picker,
  Item,
  Text,
  StatusLight,
} from "@adobe/react-spectrum";
import { subjectAdded, scheduleGenerated } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./formEl.module.css";
import { Subject, Population } from "../utils/generateSchedule";
import { Redirect } from "react-router-dom";
import { MAX_LOAD } from "./Schedule";

function FormEl() {
  const [subject, setSubject] = useState("");
  const [instructor, setInstructor] = useState("");
  const [hpw, setHpw] = useState("1");
  const [level, setLevel] = useState("1");
  const [error, setError] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  let subjects = useSelector((state) => state.subjects);
  let scheduleSubjects = useSelector((state) => state.schedule);

  let validateSubject = useMemo(() => {
    return /[a-zA-z0-9?\s]{4,}$/.test(subject.trim());
  }, [subject]);

  let validateInstructor = useMemo(() => {
    return /[a-zA-z]+\s[a-zA-z]+/.test(instructor);
  }, [instructor]);

  const [formValidation, setFormValidation] = useState(undefined);
  const [subjectValidation, setSubjectValidation] = useState();
  const [instructorValidation, setInstructorValidation] = useState();

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
      <div className={styles.container}>
        <Flex direction="column" margin="size-160">
          <h2 className={styles.title}>Add Subjects</h2>
          <Form
            className={styles.form}
            width="size-6000"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted");
              if (
                !subjects.some(
                  (_subject) => _subject.subjectName === subject.trim()
                ) &&
                validateSubject &&
                validateInstructor
              ) {
                console.log(validateInstructor);
                console.log(validateSubject);
                dispatch(
                  subjectAdded(subject.trim(), instructor.trim(), hpw, level)
                );
                setSubject("");
                setInstructor("");
                setHpw("1");
                setLevel("1");
                setError(undefined);
              } else {
                if (!validateInstructor) {
                  setInstructorValidation("invalid");
                }
                if (!validateSubject) {
                  setSubjectValidation("invalid");
                }

                if (
                  (!validateSubject && validateInstructor) ||
                  (validateSubject && !validateInstructor)
                ) {
                  if (!validateInstructor) {
                    setError("You have to enter the instructor's full name!");
                  } else {
                    setError("subject's name must be at least 4 characters!");
                  }
                } else {
                  setError(undefined);
                }
              }
            }}
            validationState={formValidation}
          >
            <TextField
              label="Subject's name"
              validationState={
                subjectValidation || (validateSubject ? "valid" : undefined)
              }
              isRequired={true}
              necessityIndicator="label"
              placeholder="Data structures"
              onChange={(value) => {
                setSubjectValidation(false);
                setSubject(value);
              }}
              value={subject}
            />
            <TextField
              label="Subject's instructor"
              validationState={
                instructorValidation ||
                (validateInstructor ? "valid" : undefined)
              }
              isRequired={true}
              necessityIndicator="label"
              placeholder="Mohamed Mekky"
              onChange={(value) => {
                setInstructorValidation(false);
                setInstructor(value);
              }}
              value={instructor}
            />
            <Flex direction="row" justifyContent="space-between">
              <Picker
                label="Subject's hours per week"
                selectedKey={hpw}
                onSelectionChange={(selected) => setHpw(selected)}
              >
                <Item key="1">1</Item>
                <Item key="2">2</Item>
                <Item key="3">3</Item>
                <Item key="4">4</Item>
              </Picker>
              <Picker
                label="Subject's level"
                selectedKey={level}
                onSelectionChange={(selected) => setLevel(selected)}
              >
                <Item key="1">1</Item>
                <Item key="2">2</Item>
                <Item key="3">3</Item>
                <Item key="4">4</Item>
                <Item key="5">5</Item>
              </Picker>
            </Flex>
            <Text marginTop="size-200">
              {error && <StatusLight variant="negative">{error}</StatusLight>}
            </Text>
            <Button
              width="size-160"
              variant="cta"
              margin="auto"
              marginTop="size-200"
              type="submit"
              isDisabled={
                subjects
                  .filter((subject) => Number(subject.level) === Number(level))
                  .reduce(
                    (acc, subject) => acc + Number(subject.hoursPerWeek),
                    0
                  ) >= MAX_LOAD
              }
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
                    Number(subject.level),
                    subject.subjectId
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
              // isDisabled={subjects.length <= 3}
            >
              Generate Schedule
            </Button>
          </Form>
        </Flex>
      </div>
    </Provider>
  );
}

export default FormEl;
