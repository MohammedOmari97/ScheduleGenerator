import React from "react";
import { Heading, Header } from "@adobe/react-spectrum";
import styles from "./navbar.module.css";

function Navbar({ page }) {
  return (
    <Header>
      <h2 className={styles.title}>
        {page === "edit" ? "Add subjects" : "Schedule"}
      </h2>
    </Header>
  );
}

export default Navbar;
