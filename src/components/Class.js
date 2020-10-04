import React, { useState, useEffect } from "react";
import styles from "./class.module.css";
import { mapTimeToSchedule } from "../utils/mapTimeToSchedule";

function Class({ start, end, name, instructor, days, hidden, colors }) {
  const [show, setShow] = useState(hidden);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setShow(hidden);
  }, [hidden]);

  return (
    <>
      {days.map((day) => {
        return (
          <div
            className={styles.class}
            style={{
              gridColumn: `${mapTimeToSchedule(start)} / ${mapTimeToSchedule(
                end
              )}`,
              gridRow: mapTimeToSchedule(day),
              background: hover ? colors.level1 : colors.level0,
              border: `1px solid ${colors.level2}55`,
              color: colors.level2,
            }}
            hidden={show}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <span>
              <b>{name}</b>
            </span>
            <span>{instructor}</span>
            <span>
              {start} / {end}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default Class;
