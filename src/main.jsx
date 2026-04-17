import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DeckProvider } from "./contexts/deckContext.jsx";
import "./index.css";
import "./components/Tokens/Tokens.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DeckProvider>
        <App />
      </DeckProvider>
    </BrowserRouter>
  </StrictMode>,
);
