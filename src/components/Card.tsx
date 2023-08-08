import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import deleteImage from "@images/delete.svg";
import edit from "@images/edit.svg";
import { TextareaInput } from "./TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}
interface CardI {
  id: string;
  question: string;
  answer: string;
}

export const Card = (props: CardI) => {
  const [editMode, setEditMode] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(40);

  const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
    question: props.question ? props.question : "",
    answer: props.answer ? props.answer : "",
  });
  useEffect(() => {
    const lengthAnswer = props.answer.length;
    let counter = Math.floor(lengthAnswer / 38);
    counter === 1
      ? setHeight(height * 2)
      : lengthAnswer <= 38
      ? setHeight(40)
      : setHeight(height * counter);
  }, [props.answer]);

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

  return (
    <div className={styles.container}>
      <div className={styles.corner_wrapper}>
        {editMode ? (
          <></>
        ) : (
          <button className={styles.corner_button}>
            <img src={edit} alt="edit" />
          </button>
        )}
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
        {editMode ? (
          <TextareaInput
            fishkappObject={fishkappObject}
            nextPage={nextPage}
            handleInputChange={handleInputChange}
            ref={textareaRef}
          />
        ) : (
          <textarea
            readOnly
            className={styles.output}
            value={fishkappObject.answer}
            style={{ height: height + "px" }}
          ></textarea>
        )}
      </div>
      {editMode ? (
        <div className={styles.action_wrapper}>
          {nextPage ? (
            <button onClick={backPageClick} className={styles.left_button}>
              Back
            </button>
          ) : (
            <button className={styles.left_button}>Cancel</button>
          )}
          {nextPage ? (
            <button className={styles.right_button}>Save</button>
          ) : (
            <button onClick={nextPageClick} className={styles.right_button}>
              Next
            </button>
          )}
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};
