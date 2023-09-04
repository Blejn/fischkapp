import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import deleteImage from "@images/delete.svg";
import edit from "@images/edit.svg";
import { TextareaInput } from "./TextareaInput";
import { EditTextareaInput } from "./EditTextareaInput";

interface FishkappCard {
  front: string;
  back: string;
}
interface CardI {
  _id: string;
  front: string;
  back: string;
  deleteCard: (_id: string) => void;
  editCard: (_id: string, front: string, back: string) => void;
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
    front: props.front ? props.front : "",
    back: props.back ? props.back : "",
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "39px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [nextPage, editMode]);

  useEffect(() => {
    if (editMode) {
      textareaRef.current?.focus();
      const length = textareaRef.current?.value.length as number;
      textareaRef.current?.setSelectionRange(length, length);
      const height = textareaRef.current?.scrollHeight as number;
      setHeight(height);
    }
  }, [editMode, nextPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    flipCard
      ? setfishkappObject({ ...fishkappObject, back: value })
      : setfishkappObject({ ...fishkappObject, front: value });
    event.target.style.height = "0px";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  const editCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setEditMode(!editMode);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const cancelCardClick = () => {
    setfishkappObject({
      ...fishkappObject,
      back: props.back,
      front: props.front,
    });
    setEditMode(false);
  };
  const saveCardClick = () => {
    props.editCard(props._id, fishkappObject.front, fishkappObject.back);
    setNextPage(false);
    setEditMode(false);
  };

  const flipCardClick = () => {
    setTimeout(() => {
      setFlipCard(!flipCard);
    }, 200);

    timerAnimation();
  };

  const deleteCardClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    _id: string
  ) => {
    event.stopPropagation();
    props.deleteCard(_id);
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
      data-testid="card"
    >
      <div className={styles.corner_wrapper}>
        {editMode ? (
          <button
            data-testid="delete-button"
            onClick={event => deleteCardClick(event, props._id)}
            className={styles.corner_button}
          >
            <img src={deleteImage} alt="delete" />
          </button>
        ) : (
          <button
            data-testid="edit-button"
            onClick={editCardClick}
            className={styles.corner_button}
          >
            <img src={edit} alt="edit" />
          </button>
        )}
      </div>
      <div className={styles.text_wrapper}>
        {nextPage && editMode && (
          <div className={styles.question_wrapper}>
            <p className={styles.question_text}>{fishkappObject.front}</p>
          </div>
        )}
        {editMode ? (
          <EditTextareaInput
            fishkappObject={fishkappObject}
            nextPage={flipCard}
            handleInputChange={handleInputChange}
            ref={textareaRef}
          />
        ) : (
          <>
            {!flipCard ? (
              <div className={styles.output}>
                <div>{fishkappObject.front}</div>
              </div>
            ) : (
              <div className={styles.output}>
                {" "}
                <div>{fishkappObject.back}</div>
              </div>
            )}
          </>
        )}
      </div>
      {!editMode && <div className={styles.empty_wrapper}></div>}
      {editMode ? (
        <div className={styles.action_wrapper}>
          <button
            data-testid="cancel-button"
            onClick={cancelCardClick}
            className={styles.left_button}
          >
            Cancel
          </button>

          <button
            data-testid="save-button"
            disabled={
              fishkappObject.front == "" || fishkappObject.back == ""
                ? true
                : false
            }
            onClick={saveCardClick}
            className={styles.right_button}
          >
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
};
