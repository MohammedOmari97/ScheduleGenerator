import React, { useState } from "react";
import { TextField, ActionButton } from "@adobe/react-spectrum";
import { useDispatch } from "react-redux";
import { subjectUpdated, subjectDeleted } from "../app/store";
import { motion } from "framer-motion";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import saveIcon from "../images/save.svg";
import styles from "./subjectItem.module.css";

function SubjectItem({ subject }) {
  const [editMode, setEditMode] = useState(false);
  const [nameEdit, setNameEdit] = useState(subject.subjectName);
  const [instructorEdit, setInstructorEdit] = useState(
    subject.subjectInstructor
  );
  const [hpwEdit, setHpwEdit] = useState(subject.hoursPerWeek);
  const [levelEdit, setLevelEdit] = useState(subject.level);
  const dispatch = useDispatch();

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
    >
      <div className={styles.content}>
        <div className={styles.edit} hidden={!editMode}>
          <TextField
            isHidden={!editMode}
            value={nameEdit}
            onChange={setNameEdit}
            label="Subject's name"
          />
          <TextField
            isHidden={!editMode}
            value={instructorEdit}
            onChange={setInstructorEdit}
            label="Subject's instructor"
          />
          <TextField
            isHidden={!editMode}
            value={hpwEdit}
            onChange={setHpwEdit}
            label="Hours per week"
          />
          <TextField
            isHidden={!editMode}
            value={levelEdit}
            onChange={setLevelEdit}
            label="Subject's level"
          />
        </div>
        <div className={styles.view} hidden={editMode}>
          <div className={styles.text} hidden={editMode}>
            Subject: <span>{subject.subjectName}</span>
          </div>
          <div className={styles.text} hidden={editMode}>
            Instructor: <span>{subject.subjectInstructor}</span>
          </div>
          <div className={styles.text} hidden={editMode}>
            Hours per week: <span>{subject.hoursPerWeek}</span>
          </div>
          <div className={styles.text} hidden={editMode}>
            Level <span>{subject.level}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        {!editMode ? (
          <ActionButton
            variant="cta"
            marginEnd="size-25"
            onPress={() => {
              setEditMode(true);
            }}
          >
            <img src={editIcon} alt="edit icon" />
          </ActionButton>
        ) : (
          <ActionButton
            variant="cta"
            marginEnd="size-25"
            onPress={() => {
              setEditMode(false);
              dispatch(
                subjectUpdated(
                  subject.subjectId,
                  nameEdit,
                  instructorEdit,
                  hpwEdit,
                  levelEdit
                )
              );
            }}
          >
            <img src={saveIcon} alt="save icon" />
          </ActionButton>
        )}
        <ActionButton
          variant="cta"
          width="size-10"
          onPress={() => {
            dispatch(subjectDeleted(subject.subjectId));
          }}
        >
          <img src={deleteIcon} alt="delete icon" />
        </ActionButton>
      </div>
    </motion.div>
  );
}

export default SubjectItem;
