import React from "react";
import { useSelector } from "react-redux";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";
import SubjectItem from "./SubjectItem";
import { AnimatePresence } from "framer-motion";
import styles from "./subjectsList.module.css";

function SubjectsList() {
  const subjects = useSelector((state) => state.subjects);

  return (
    <Provider theme={defaultTheme}>
      <div className={styles.container}>
        <Flex direction="column" margin="size-160" width="size-6000">
          <h2 className={styles.title}>Subjects</h2>
          {subjects.length > 0 && (
            <>
              <Flex
                direction="column"
                width="size-6000"
                gap="size-160"
                margin="auto"
                marginStart="size-160"
              >
                <AnimatePresence>
                  {subjects.map((subject) => (
                    <SubjectItem subject={subject} key={subject.subjectId} />
                  ))}
                </AnimatePresence>
              </Flex>
            </>
          )}
        </Flex>
      </div>
    </Provider>
  );
}

export default SubjectsList;
