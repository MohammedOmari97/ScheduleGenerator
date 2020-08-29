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

export const mapTimeToSchedule = (time) => {
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
  } else if (time === "sat") {
    return timeToSchedule.sat;
  } else if (time === "sun") {
    return timeToSchedule.sun;
  } else if (time === "mon") {
    return timeToSchedule.mon;
  } else if (time === "tue") {
    return timeToSchedule.tue;
  } else if (time === "wed") {
    return timeToSchedule.wed;
  } else {
    return new Error("Unknown time given!");
  }
};
