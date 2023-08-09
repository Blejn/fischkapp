import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { Card } from "./components/Card";
import "./App.css";
import React, { useState } from "react";
import { NewCard } from "./components/NewCard";

interface CardI {
  id: string;
  question: string;
  answer: string;
}

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cards, setCards] = useState<CardI[]>([
    {
      id: "1",
      question: "diffrence beetwen Observable and Promise",
      answer:
        "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    },
    {
      id: "2",
      question: "diffrence beetwen Observable and Promise",
      answer: "Observable is better",
    },
  ]);
  const addNewCard = (props: CardI) => {
    setCards([...cards, props]);
  };
  const deleteCard = (id: string) => {
    setCards(cards.filter((card: CardI) => card.id !== id));
  };
  const editCard = (id: string, question: string, answer: string) => {
    setCards(
      cards.map((card: CardI) => {
        if (card.id === id) {
          return {
            ...card,
            question: question,
            answer: answer,
          };
        }
        return card;
      })
    );
  };

  const changeMode = () => {
    setEditMode(!editMode);
  };
  return (
    <AppLayout>
      <AppHeader fishkappiesLength={5} changeMode={changeMode} />
      <div className="cards_container">
        {editMode ? (
          <NewCard
            editMode={editMode}
            setEditMode={setEditMode}
            addNewCard={addNewCard}
          />
        ) : null}
        {cards.length > 0 && (
          <>
            {cards.map(card => (
              <Card
                key={card.id}
                id={card.id}
                question={card.question}
                answer={card.answer}
                deleteCard={deleteCard}
                editCard={editCard}
              />
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
