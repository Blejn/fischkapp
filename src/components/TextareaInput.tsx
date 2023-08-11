import React, { LegacyRef, useEffect, useState } from "react";
import styles from "./TextareaInput.module.css";

export const TextareaInput = React.forwardRef(
  (props: InputArea, ref: LegacyRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        className={styles.input_text}
        value={
          props.nextPage
            ? props.fishkappObject.back
            : props.fishkappObject.front
        }
        onChange={props.handleInputChange}
        ref={ref}
        autoFocus={true}
      />
    );
  }
);
