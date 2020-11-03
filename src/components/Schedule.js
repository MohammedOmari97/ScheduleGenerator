import React, { useState } from "react";
import styles from "./schedule.module.css";
import {
  Menu,
  Item,
  MenuTrigger,
  Provider,
  defaultTheme,
  ActionButton,
  Flex,
  ButtonGroup,
} from "@adobe/react-spectrum";
// import addIcon from "../images/add.svg";
import { scheduleCleared } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Class from "./Class";
import AddSubjectDialog from "./AddSubjectDialog";
import DeleteSubjectDialog from "./DeleteSubjectDialog";
import InstructorsLoad from "./InstructorsLoad";

export const MAX_LOAD = 20;

function Schedule() {
  const [level, setLevel] = useState(new Set(["1"]));
  const dispatch = useDispatch();
  const _subjects = useSelector((state) => state.schedule);
  const [disableAdd, setDisableAdd] = useState(false);
  const [levelLoad, setLevelLoad] = useState(0);
  const colors = useSelector((state) => state.colors);

  useEffect(() => {
    let levelSubjects = _subjects.filter(
      (subject) => subject.level === Number([...level][0])
    );
    let levelLoad = levelSubjects.reduce((acc, subject) => {
      return acc + subject.hpw;
    }, 0);
    setLevelLoad(levelLoad);
    setDisableAdd(levelLoad >= MAX_LOAD);
  }, [_subjects, level]);

  useEffect(() => {
    return () => dispatch(scheduleCleared());
  }, []);

  if (_subjects.length === 0) {
    return (
      <div>You have to add subjects before you can view the schedule!</div>
    );
  }

  return (
    <>
      <Provider theme={defaultTheme}>
        <div className={styles.level}>
          <ButtonGroup>
            <Flex direction="row" gap="size-200">
              <AddSubjectDialog disableAdd={disableAdd} levelLoad={levelLoad} />
              <DeleteSubjectDialog />
              <InstructorsLoad />
            </Flex>
          </ButtonGroup>
          <MenuTrigger>
            <ActionButton>Level: {level}</ActionButton>
            <Menu
              selectionMode="single"
              selectedKeys={level}
              onSelectionChange={setLevel}
            >
              <Item key="1">1</Item>
              <Item key="2">2</Item>
              <Item key="3">3</Item>
              <Item key="4">4</Item>
              <Item key="5">5</Item>
            </Menu>
          </MenuTrigger>
        </div>
      </Provider>
      <div className={styles.grid}>
        <div className={`${styles.time8} ${styles.time}`}>8</div>
        <div className={`${styles.time9} ${styles.time}`}>9</div>
        <div className={`${styles.time10} ${styles.time}`}>10</div>
        <div className={`${styles.time11} ${styles.time}`}>11</div>
        <div className={`${styles.time12} ${styles.time}`}>12</div>
        <div className={`${styles.time1} ${styles.time}`}>1</div>
        <div className={`${styles.time2} ${styles.time}`}>2</div>
        <div className={`${styles.time3} ${styles.time}`}>3</div>
        <div className={`${styles.time4} ${styles.time}`}>4</div>
        <div className={`${styles.daySat} ${styles.day}`}>Sat</div>
        <div className={`${styles.daySun} ${styles.day}`}>Sun</div>
        <div className={`${styles.dayMon} ${styles.day}`}>Mon</div>
        <div className={`${styles.dayTue} ${styles.day}`}>Tue</div>
        <div className={`${styles.dayWed} ${styles.day}`}>Wed</div>
        {_subjects.map((subject, index) => {
          let subjectColors = colors[index];

          return (
            <Class
              start={subject.startTime}
              end={subject.endTime}
              name={subject.name}
              instructor={subject.teacher}
              days={[...subject.days]}
              level={subject.level}
              hidden={subject.level !== Number([...level][0])}
              id={subject.id}
              colors={subjectColors}
            />
          );
        })}
        {Array(9)
          .fill(null)
          .map((i, iIndex) => {
            return Array(6)
              .fill(null)
              .map((j, jIndex) => {
                return (
                  <div
                    style={{
                      gridRow: `${jIndex + 1} / ${jIndex + 2}`,
                      gridColumn: `${iIndex + iIndex + 1} / ${
                        iIndex + iIndex + 3
                      }`,
                      border: "1px solid #e3e3e385",
                      borderTopLeftRadius:
                        iIndex === 0 && jIndex === 0 ? "10px" : "0px",
                      borderTopRightRadius:
                        iIndex === 8 && jIndex === 0 ? "10px" : "0px",
                      borderBottomLeftRadius:
                        iIndex === 0 && jIndex === 5 ? "10px" : "0px",
                      borderBottomRightRadius:
                        iIndex === 8 && jIndex === 5 ? "10px" : "0px",
                    }}
                  ></div>
                );
              });
          })}
      </div>
    </>
  );
}

export default Schedule;
