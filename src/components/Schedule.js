import React, { useState } from "react";
import styles from "./schedule.module.css";
import randomColor from "../utils/randomColor";
import {
  Menu,
  Item,
  MenuTrigger,
  Provider,
  defaultTheme,
  ActionButton,
} from "@adobe/react-spectrum";

const timeToSchedule = {
  time8: "3",
  time9: "5",
  time9_30: "6",
  time10: "7",
  time11: "9",
  time12: "11",
  time12_30: "12",
  time1: "13",
  time1_30: "14",
  time2: "15",
  time2_30: "16",
  time3: "17",
  time3_30: "18",
  time4: "19",
  sat: "2 / 3",
  sun: "3 / 4",
  mon: "4 / 5",
  tue: "5 / 6",
  wed: "6 / 7",
};

const mapTimeToSchedule = (time) => {
  if (time === 8) {
    return timeToSchedule.time8;
  } else if (time === 9) {
    return timeToSchedule.time9;
  } else if (time === 9.5) {
    return timeToSchedule.time9_30;
  } else if (time === 10) {
    return timeToSchedule.time10;
  } else if (time === 11) {
    return timeToSchedule.time11;
  } else if (time === 12) {
    return timeToSchedule.time12;
  } else if (time === 12.5) {
    return timeToSchedule.time12_30;
  } else if (time === 1) {
    return timeToSchedule.time1;
  } else if (time === 1.5) {
    return timeToSchedule.time1_30;
  } else if (time === 2) {
    return timeToSchedule.time2;
  } else if (time === 2.5) {
    return timeToSchedule.time2_30;
  } else if (time === 3) {
    return timeToSchedule.time3;
  } else if (time === 3.5) {
    return timeToSchedule.time3_30;
  } else if (time === 4) {
    return timeToSchedule.time4;
  } else {
    return new Error("unknown time");
  }
};

function Schedule({ subjects }) {
  const [selected, setSelected] = useState(new Set(["1"]));
  console.log(typeof subjects[0].level);
  console.log([...selected][0]);

  return (
    <>
      <Provider theme={defaultTheme}>
        <div className={styles.level}>
          <MenuTrigger>
            <ActionButton>Level: {selected}</ActionButton>
            <Menu
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
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
        {subjects.map((subject) => {
          let start = mapTimeToSchedule(subject.startTime);
          let end = mapTimeToSchedule(subject.endTime);
          let name = subject.name;
          let instructor = subject.teacher;
          let classes = [];
          let bgColor = randomColor();
          for (let i = 0; i < subject.days.length; i++) {
            classes.push(
              <div
                className={styles.class}
                style={{
                  gridColumn: `${start} / ${end}`,
                  gridRow: timeToSchedule[subject.days[i]],
                }}
                hidden={subject.level !== Number([...selected][0])}
              >
                <span>{name}</span>
                <span>{instructor}</span>
                <span>
                  {subject.startTime} / {subject.endTime}
                </span>
              </div>
            );
          }
          return <>{classes}</>;
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
                      border: "1px solid #e3e3e3",
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
