import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { Card } from "./components/Card";
import "./App.css";
import React, { useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";
import {
  getFishCards,
  addFishCard,
  deleteFishCard,
} from "./services/ApiService";

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cards, setCards] = useState<CardI[]>([]);

  useEffect(() => {
    getCards()
      .then(cardsArray => {
        setCards(cardsArray);
      })
      .catch(error => {
        console.error("Error", error);
      });
  }, []);

  const deleteCard = async (id: string) => {
    try {
      await deleteFishCard(id);

      setCards(cards.filter((card: CardI) => card._id !== id));
    } catch (error) {
      console.error("Error while deleting card:", error);
    }
  };

  const getCards = async () => {
    try {
      const response = await getFishCards();
      return response;
    } catch (error) {
      console.error("Error while fetching cards:", error);
      return [];
    }
  };

  const uploadCard = async (front: string, back: string) => {
    try {
      const res = await addFishCard(front, back);
      const newCard = res.flashcard;
      setCards([
        ...cards,
        { _id: newCard._id, front: newCard.front, back: newCard.back },
      ]);
    } catch (error) {
      console.error("Error while adding fish Card:", error);
      throw error;
    }
  };
  const editCard = (id: string, front: string, back: string) => {
    setCards(
      cards.map((card: CardI) => {
        if (card._id === id) {
          return {
            ...card,
            front: front,
            back: back,
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
      <AppHeader fishkappiesLength={cards.length} changeMode={changeMode} />
      <div className="cards_container">
        {editMode ? (
          <NewCard
            editMode={editMode}
            setEditMode={setEditMode}
            addNewCard={uploadCard}
          />
        ) : null}
        {cards && (
          <>
            {cards.map(card => (
              <Card
                key={card._id}
                _id={card._id}
                front={card.front}
                back={card.back}
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
