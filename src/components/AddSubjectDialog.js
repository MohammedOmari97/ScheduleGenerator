import React, { useState, useMemo } from "react";
import {
  DialogTrigger,
  ActionButton,
  Dialog,
  Heading,
  Flex,
  Divider,
  Content,
  Form,
  TextField,
  ButtonGroup,
  Button,
  Text,
  Picker,
  Item,
  StatusLight,
} from "@adobe/react-spectrum";
import { subjectAddedToSchedule } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "../utils/generateSchedule";
import { useEffect } from "react";
import { MAX_LOAD } from "./Schedule";

function AddSubjectDialog({ levelLoad, disableAdd }) {
  const [subjectName, setSubjectName] = useState("");
  const [subjectInstructor, setSubjectInstructor] = useState("");
  const [hpw, setHpw] = useState();
  const [level, setLevel] = useState();
  const [disable, setDisable] = useState(disableAdd);
  const [currentLoad, setCurrentLoad] = useState();
  const [subjectValidation, setSubjectValidation] = useState();
  const [instructorValidation, setInstructorValidation] = useState();
  const [error, setError] = useState(undefined);

  const subjects = useSelector((state) => state.schedule);

  let validateSubject = useMemo(() => {
    return /[a-zA-z0-9?\s]{4,}$/.test(subjectName.trim());
  }, [subjectName]);

  let validateInstructor = useMemo(() => {
    return /[a-zA-z]+\s[a-zA-z]+/.test(subjectInstructor);
  }, [subjectInstructor]);

  useEffect(() => {
    setCurrentLoad(levelLoad);
    setDisable(disableAdd);
    setHpw();
  }, [disableAdd, levelLoad]);

  const dispatch = useDispatch();

  return (
    <>
      <DialogTrigger>
        <ActionButton isDisabled={disable}>
          <Text>Add new subject</Text>
          {/* <img src={addIcon} alt="add subject icon" /> */}
        </ActionButton>
        {(close) => (
          <Dialog>
            <Heading>
              <Flex alignItems="center" gap="size-100">
                <Text>Add new subject to the schedule</Text>
              </Flex>
            </Heading>
            <Divider />
            <Content>
              <Form>
                <TextField
                  label="Subject's name"
                  placeholder="Digital Design"
                  autoFocus
                  // onChange={setSubjectName}
                  onChange={(value) => {
                    setSubjectValidation(false);
                    setSubjectName(value);
                  }}
                  // validationState={validateSubject ? "valid" : undefined}
                  validationState={
                    subjectValidation || (validateSubject ? "valid" : undefined)
                  }
                />
                <TextField
                  label="Subject's instructor"
                  placeholder="Mohamed Mekky"
                  // onChange={setSubjectInstructor}
                  onChange={(value) => {
                    setInstructorValidation(false);
                    setSubjectInstructor(value);
                  }}
                  // validationState={validateInstructor ? "valid" : undefined}
                  validationState={
                    instructorValidation ||
                    (validateInstructor ? "valid" : undefined)
                  }
                />
                <Flex direction="row" justifyContent="space-between" wrap>
                  <Picker
                    label="Subject's hours per week"
                    selectedKey={hpw}
                    onSelectionChange={(selected) => setHpw(selected)}
                    disabledKeys={Array(4)
                      .fill(0)
                      .map((i, index) => index + 1)
                      .filter((i) => i + currentLoad > MAX_LOAD)
                      .map((i) => i.toString())}
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
              </Form>
              <Text marginTop="size-200">
                {error && (
                  <StatusLight marginTop="size-200" variant="negative">
                    {error}
                  </StatusLight>
                )}
              </Text>
            </Content>
            <ButtonGroup>
              <Button
                variant="secondary"
                onPress={() => {
                  setInstructorValidation(false);
                  setSubjectValidation(false);
                  setSubjectName("");
                  setSubjectInstructor("");
                  setError(undefined);
                  close();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="cta"
                onPress={() => {
                  if (
                    !subjects.some((subject) => subject.name === subjectName) &&
                    validateSubject &&
                    validateInstructor &&
                    hpw &&
                    level
                  ) {
                    let subject = new Subject(
                      subjectName,
                      subjectInstructor,
                      Number(hpw),
                      Number(level)
                    );
                    try {
                      dispatch(subjectAddedToSchedule(subject));
                      setError(undefined);
                    } catch (error) {
                      alert("There is no time slots for this subject");
                      setError(undefined);
                    }
                    setInstructorValidation(false);
                    setSubjectValidation(false);
                    setSubjectName("");
                    setSubjectInstructor("");
                    close();
                  } else if (
                    !validateInstructor ||
                    !validateSubject ||
                    !hpw ||
                    !level
                  ) {
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
                        setError(
                          "You have to enter the instructor's full name!"
                        );
                      } else {
                        setError(
                          "subject's name must be at least 4 characters!"
                        );
                      }
                    } else if (!hpw || !level) {
                      setError(
                        "Please enter all the fields to add the subject"
                      );
                    } else {
                      setError(undefined);
                    }
                  } else {
                    alert("This subject is already added!");
                  }
                }}
              >
                Add
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
    </>
  );
}

export default AddSubjectDialog;
