import React, { LegacyRef, useEffect, useState } from "react";
import styles from "./TextareaInput.module.css";

export const EditTextareaInput = React.forwardRef(
  (props: EditInputArea, ref: LegacyRef<HTMLTextAreaElement>) => {
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
