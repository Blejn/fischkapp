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
    {
      id: "3",
      question: "diffrence beetwen Observable and Promise",
      answer: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      id: "4",
      question: "diffrence beetwen Observable and Promise",
      answer:
        "Observable is better,lorffffffffssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    },
    {
      id: "5",
      question: "diffrence beetwen Observable and Promise",
      answer: "elo",
    },
  ]);
  const changeMode = () => {
    setEditMode(!editMode);
  };
  const addNewCard = (props: CardI) => {
    setCards([...cards, props]);
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
              />
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
