import {
  configureStore,
  createSlice,
  nanoid,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

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
  },
});

export const {
  subjectAdded,
  subjectUpdated,
  subjectDeleted,
} = subjects.actions;

export const { scheduleGenerated } = schedule.actions;

export default configureStore({
  reducer: {
    subjects: subjects.reducer,
    schedule: schedule.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["schedule/scheduleGenerated"],
    },
  }),
});
