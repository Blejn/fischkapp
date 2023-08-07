import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";

import "./App.css";
import React from "react";

function App() {
  return (
    <AppLayout>
      <AppHeader fishkappiesLength={5} />
    </AppLayout>
  );
}

export default App;
