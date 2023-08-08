import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { Card } from "./components/Card";

import "./App.css";
import React, { useState } from "react";

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const changeMode = () => {
    setEditMode(!editMode);
  };
  return (
    <AppLayout>
      <AppHeader fishkappiesLength={5} changeMode={changeMode} />
      <div className="cards_container">
        {" "}
        {editMode ? (
          <Card editMode={editMode} setEditMode={setEditMode} />
        ) : (
          <></>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
