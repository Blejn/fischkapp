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
  deleteCard: (id: string) => void;
  editCard: (id: string, question: string, answer: string) => void;
}

export const Card = (props: CardI) => {
  const [editMode, setEditMode] = useState(false);
  const [flipCard, setFlipCard] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardareaRef = useRef<HTMLDivElement>(null);
  const [playAnimation, setPlayAnimation] = useState(false);

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
  }, [props.answer, setHeight]);

  useEffect(() => {
    if (editMode) {
      textareaRef.current?.focus();
    }
  }, [editMode]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    nextPage
      ? setfishkappObject({ ...fishkappObject, answer: value })
      : setfishkappObject({ ...fishkappObject, question: value });
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  const editCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setEditMode(!editMode);
  };
  const cancelCardClick = () => {
    setfishkappObject({
      ...fishkappObject,
      answer: props.answer,
      question: props.question,
    });
    setEditMode(false);
  };
  const saveCardClick = () => {
    props.editCard(props.id, fishkappObject.question, fishkappObject.answer);
    setNextPage(false);
    setEditMode(false);
  };
  const nextPageClick = () => {
    setNextPage(true);
    textareaRef.current?.focus();
  };
  const backPageClick = () => {
    setNextPage(false);
    textareaRef.current?.focus();
  };
  const flipCardClick = () => {
    setTimeout(() => {
      setFlipCard(!flipCard);
    }, 200);

    timerAnimation();
  };

  const deleteCardClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    props.deleteCard(id);
  };

  const timerAnimation = () => {
    setPlayAnimation(true);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 400);
  };
  const animationsCard = `${styles.container} ${
    playAnimation ? styles.flipToSide : ""
  }`;

  return (
    <div
      ref={cardareaRef}
      onClick={!editMode ? flipCardClick : undefined}
      className={animationsCard}
    >
      <div className={styles.corner_wrapper}>
        {editMode ? (
          <></>
        ) : (
          <button onClick={editCardClick} className={styles.corner_button}>
            <img src={edit} alt="edit" />
          </button>
        )}
        {nextPage && editMode ? (
          <button
            onClick={event => deleteCardClick(event, props.id)}
            className={styles.corner_button}
          >
            <img src={deleteImage} alt="delete" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.text_wrapper}>
        {nextPage && editMode && (
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
          <>
            {flipCard ? (
              <div className={styles.output}>{fishkappObject.question}</div>
            ) : (
              <div className={styles.output}>{fishkappObject.answer}</div>
            )}
          </>
        )}
      </div>
      {editMode ? (
        <div className={styles.action_wrapper}>
          {nextPage ? (
            <button onClick={backPageClick} className={styles.left_button}>
              Back
            </button>
          ) : (
            <button onClick={cancelCardClick} className={styles.left_button}>
              Cancel
            </button>
          )}
          {nextPage ? (
            <button onClick={saveCardClick} className={styles.right_button}>
              Save
            </button>
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
function editCard(id: string, question: string, answer: string) {
  throw new Error("Function not implemented.");
}
