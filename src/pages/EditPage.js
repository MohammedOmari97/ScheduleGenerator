import React from "react";
import FormEl from "../components/FormEl";
import SubjectsList from "../components/SubjectsList";
import useWindowSize from "../utils/useWindowSize";

import styles from "./editPage.module.css";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";
import { useEffect } from "react";

function EditPage() {
  const { width } = useWindowSize();

  return (
    <Provider theme={defaultTheme}>
      <div className={styles.container}>
        {/* <Navbar page="edit" /> */}
        <Flex
          direction={width < 1040 ? "column" : "row"}
          justifyContent="center"
        >
          <FormEl />
          <SubjectsList />
        </Flex>
      </div>
    </Provider>
  );
}

export default EditPage;
