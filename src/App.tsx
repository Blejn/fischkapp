import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { Card } from "./components/Card";
import "./App.css";
import React, { useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";
import { getFishCards } from "./services/ApiService";

interface CardI {
  _id: string;
  front: string;
  back: string;
}
interface UploadCardI {
  front: string;
  back: string;
}

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cards, setCards] = useState<CardI[]>([]);

  useEffect(() => {
    getCards()
      .then(cardsArray => {
        console.log(cardsArray);
        setCards(cardsArray);
      })
      .catch(error => {
        console.error("Error", error);
      });
  }, []);

  const addNewCard = (props: CardI) => {
    setCards([...cards, props]);
  };
  const deleteCard = (id: string) => {
    setCards(cards.filter((card: CardI) => card._id !== id));
  };

  const getCards = async () => {
    try {
      const response = await getFishCards();
      return response;
    } catch (error) {
      console.error("Error while fetching cards:", error);
      return []; // Zwracamy pustą tablicę w przypadku błędu
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
            addNewCard={addNewCard}
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
