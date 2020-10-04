import {
  configureStore,
  createSlice,
  nanoid,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import generateTimes from "../utils/generateTimes";
///////////////////////////////////////////////////////////////////

const times1 = [8, 9, 10, 11, 12, 1, 2, 3, 4];
const times2 = [8, 9.5, 11, 12.5, 2, 3, 4];
const days1 = ["sat", "mon", "wed"];
const days2 = ["sun", "tue"];

function generateTimes(hours) {
  // for 1 hour
  if (hours === 1) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let randomDay = days1[Math.floor(Math.random() * days1.length)];
      let { startTime, endTime } = pickRandom1(hours);
      return { days: [randomDay], startTime, endTime };
    } else if (randomPack === 1) {
      let randomDay = days2[Math.floor(Math.random() * days2.length)];
      let { startTime, endTime } = pickRandom2(hours);
      return { days: [randomDay], startTime, endTime };
    }
  }

  // for 2 hours
  if (hours === 2) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let random1day = days1[Math.floor(Math.random() * days1.length)];
      let random2day = days1[Math.floor(Math.random() * days1.length)];
      while (random1day === random2day) {
        random1day = days1[Math.floor(Math.random() * days1.length)];
        random2day = days1[Math.floor(Math.random() * days1.length)];
      }
      let { startTime, endTime } = pickRandom1(1);
      return { days: [random1day, random2day], startTime, endTime };
    } else if (randomPack === 1) {
      let day1 = days2[0];
      let day2 = days2[1];
      let { startTime, endTime } = pickRandom2(1);
      return { days: [day1, day2], startTime, endTime };
    }
  }

  // for 3 hours
  if (hours === 3) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let day1 = days1[0];
      let day2 = days1[1];
      let day3 = days1[2];
      let { startTime, endTime } = pickRandom1(1);
      return { days: [day1, day2, day3], startTime, endTime };
    } else if (randomPack === 1) {
      let day1 = days2[0];
      let day2 = days2[1];
      let { startTime, endTime } = pickRandom2(3);
      return { days: [day1, day2], startTime, endTime };
    }
  }

  // for 4 hours
  if (hours === 4) {
    let days = [];
    while (days.length < 2) {
      let random = days1[Math.floor(Math.random() * days1.length)];
      if (!days.includes(random)) {
        days.push(random);
      }
    }

    console.log(days);

    let { startTime, endTime } = pickRandom1(2);

    return { days, startTime, endTime };
  }
}

// picks random start time from times1
const pickRandom1 = function (hours) {
  let startTime = times1[Math.floor(Math.random() * (times1.length - hours))];
  let endTime = times1[times1.indexOf(startTime) + hours];
  return { startTime, endTime };
};

const pickRandom2 = function (hours) {
  if (hours === 1) {
    let times1range = times2.slice(4);
    let startTime =
      times1range[Math.floor(Math.random() * (times1range.length - hours))];
    let endTime = times1range[times1range.indexOf(startTime) + hours];
    return { startTime, endTime };
  } else if (hours === 3) {
    let times3range = times2.slice(0, 5);
    let startTime =
      times3range[Math.floor(Math.random() * (times3range.length - 1))];
    let endTime = times3range[times3range.indexOf(startTime) + 1];
    return { startTime, endTime };
  }
};

// module.exports = { generateTimes };
// export default generateTimes;

///////////////////////////////////////////////////////////////////

const subjects = createSlice({
  name: "subjects",
  initialState: [],
  reducers: {
    subjectAdded: {
      reducer(state, action) {
        state.push({
          subjectName: action.payload.subjectName,
          subjectId: action.payload.subjectId,
          subjectInstructor: action.payload.subjectInstructor,
          instructorId: action.payload.instructorId,
          hoursPerWeek: action.payload.hoursPerWeek,
          level: action.payload.level,
        });
      },
      prepare(subjectName, subjectInstructor, hoursPerWeek, level) {
        return {
          payload: {
            subjectName,
            subjectId: nanoid(),
            subjectInstructor,
            instructorId: nanoid(),
            hoursPerWeek,
            level,
          },
        };
      },
    },
    subjectUpdated: {
      reducer(state, action) {
        const subject = state.find(
          (subject) => subject.subjectId === action.payload.id
        );
        if (subject) {
          subject.subjectName = action.payload.subject;
          subject.subjectInstructor = action.payload.instructor;
          subject.hoursPerWeek = action.payload.hpw;
          subject.level = action.payload.level;
        }
      },
      prepare(id, subject, instructor, hpw, level) {
        return {
          payload: {
            id,
            subject,
            instructor,
            hpw,
            level,
          },
        };
      },
    },
    subjectDeleted: {
      reducer(state, action) {
        return state.filter(
          (subject) => subject.subjectId !== action.payload.id
        );
      },
      prepare(id) {
        return {
          payload: { id },
        };
      },
    },
  },
});

const schedule = createSlice({
  name: "schedule",
  initialState: [],
  reducers: {
    scheduleGenerated: {
      reducer(state, action) {
        return state.concat(action.payload.subjects);
      },
      prepare(subjects) {
        return {
          payload: { subjects },
        };
      },
    },
    subjectAddedToSchedule: {
      reducer(state, action) {
        let found = true;
        let tries = 0;

        while (tries++ < 1000) {
          found = true;
          for (let i = 0; i < state.length; i++) {
            if (state[i].overlap(action.payload.subject)) {
              found = false;
              break;
            }
          }
          if (found) break;
          let { days, startTime, endTime } = generateTimes(
            action.payload.subject.hpw
          );
          action.payload.subject.days = [...days];
          action.payload.subject.startTime = startTime;
          action.payload.subject.endTime = endTime;
        }

        if (!found) {
          throw Error("there is no time slots for this subject!");
        }

        state.push(action.payload.subject);
        return state;
      },
      prepare(subject) {
        return {
          payload: { subject },
        };
      },
    },
    subjectRemovedFromSchedule: {
      reducer(state, action) {
        return state.filter(
          (subject) => subject.name !== action.payload.subjectName
        );
      },
      prepare(subjectName) {
        return {
          payload: { subjectName },
        };
      },
    },
    scheduleCleared: {
      reducer() {
        return [];
      },
    },
  },
});

const colors = createSlice({
  name: "colors",
  initialState: [
    {
      level0: "#FFCAB7",
      level1: "#FFA693",
      level2: "#ff4c4c",
      level3: "#DB3745",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#97EEFC",
      level1: "#62D9F7",
      level2: "#0099e5",
      level3: "#0076C4",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#B9F8B0",
      level1: "#88EB84",
      level2: "#34bf49",
      level3: "#26A444",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#FDDEA7",
      level1: "#FBC67A",
      level2: "#f48924",
      level3: "#D16A1A",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#ADF9D0",
      level1: "#81ECBD",
      level2: "#30c39e",
      level3: "#23A793",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#E2E8EE",
      level1: "#BEC5CE",
      level2: "#52565e",
      level3: "#3B4250",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#FECCBD",
      level1: "#FEAA9D",
      level2: "#fd5c63",
      level3: "#D94357",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#FFB9B8",
      level1: "#FF959E",
      level2: "#ff4f81",
      level3: "#DB3977",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#DFB4FC",
      level: "#C88EF7",
      level2: "#8e43e7",
      level3: "#6E30C6",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#ABFBC4",
      level1: "#7FF5AF",
      level2: "#2dde98",
      level3: "#20BE90",
      taken: false,
      id: nanoid(),
    },
    {
      level0: "#BBF8E2",
      level1: "#94ECD4",
      level2: "#49c0b6",
      level3: "#35A4A5",
      taken: false,
      id: nanoid(),
    },
  ],
  reducers: {
    colorTaken: {
      reducer(state, action) {
        return state.map((color) => {
          if (color.id === action.payload.id) {
            // color.taken = true;
            // return color;
            return { ...color, taken: true };
          }
          return color;
        });
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
  },
});

export const {
  subjectAdded,
  subjectUpdated,
  subjectDeleted,
} = subjects.actions;

export const {
  scheduleGenerated,
  subjectAddedToSchedule,
  subjectRemovedFromSchedule,
  scheduleCleared,
} = schedule.actions;

export const { colorTaken } = colors.actions;

export default configureStore({
  reducer: {
    subjects: subjects.reducer,
    schedule: schedule.reducer,
    colors: colors.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        "schedule/scheduleGenerated",
        "schedule/subjectAddedToSchedule",
        "schedule/subjectRemovedFromSchedule",
      ],
    },
  }),
});
