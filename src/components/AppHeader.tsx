import styles from "./AppHeader.module.css";
import fishLogo from "@images/fishLogo.svg";
import add_new from "@images/add_new.svg";
import React from "react";
export interface Header {
  fishkappiesLength: number;
}

export const AppHeader = (props: Header) => (
  <header className={styles.header}>
    <div className={styles.left_wrapper}>
      <img className={styles.logo} src={fishLogo} alt="logo" />
      <span className={styles.amount}>Cards: {props.fishkappiesLength}</span>
    </div>
    <div className={styles.right_wrapper}>
      <button className={styles.button_add}>
        <img src={add_new} />
      </button>
    </div>
  </header>
);
