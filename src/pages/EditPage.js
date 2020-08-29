import React from "react";
import FormEl from "../components/FormEl";
import Navbar from "../components/Navbar";
import SubjectsList from "../components/SubjectsList";

import styles from "./editPage.module.css";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";

function EditPage() {
  return (
    <Provider theme={defaultTheme}>
      <div className={styles.container}>
        {/* <Navbar page="edit" /> */}
        <Flex direction="row" justifyContent="space-between">
          <FormEl />
          <SubjectsList />
        </Flex>
      </div>
    </Provider>
  );
}

export default EditPage;
