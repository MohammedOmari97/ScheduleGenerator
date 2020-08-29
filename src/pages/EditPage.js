import React from "react";
import FormEl from "../components/FormEl";
import Navbar from "../components/Navbar";
import SubjectsList from "../components/SubjectsList";

import styles from "./editPage.module.css";
import { Provider, defaultTheme } from "@adobe/react-spectrum";

function EditPage() {
  return (
    <Provider theme={defaultTheme}>
      <div className={styles.container}>
        <Navbar page="edit" />
        <FormEl />
        <SubjectsList />
      </div>
    </Provider>
  );
}

export default EditPage;
