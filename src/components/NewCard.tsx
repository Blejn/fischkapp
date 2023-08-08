import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "@images/delete.svg";
import { TextareaInput } from "./TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}
interface NewCardI {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export const NewCard = (props: NewCardI) => {
  const [nextPage, setNextPage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
    question: "",
    answer: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    nextPage
      ? setfishkappObject({ ...fishkappObject, answer: value })
      : setfishkappObject({ ...fishkappObject, question: value });
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const nextPageClick = () => {
    setNextPage(true);
    textareaRef.current?.focus();
  };
  const backPageClick = () => {
    setNextPage(false);
    textareaRef.current?.focus();
  };
  const cancelPageClick = () => {
    props.setEditMode(!props.editMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.corner_wrapper}>
        {nextPage ? (
          <button className={styles.corner_button}>
            <img src={deleteImage} alt="delete" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.text_wrapper}>
        {nextPage && (
          <p className={styles.question_text}>{fishkappObject.question}</p>
        )}

        <TextareaInput
          fishkappObject={fishkappObject}
          nextPage={nextPage}
          handleInputChange={handleInputChange}
          ref={textareaRef}
        />
      </div>
      <div className={styles.action_wrapper}>
        {nextPage ? (
          <button onClick={backPageClick} className={styles.left_button}>
            Back
          </button>
        ) : (
          <button onClick={cancelPageClick} className={styles.left_button}>
            Cancel
          </button>
        )}
        {nextPage ? (
          <button className={styles.right_button}>Save</button>
        ) : (
          <button onClick={nextPageClick} className={styles.right_button}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
