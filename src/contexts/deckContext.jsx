import { createContext, useState } from "react";

export const DeckContext = createContext();

export function DeckProvider({ children }) {
  const [currentDeck, setCurrentDeck] = useState(null);

  return (
    <DeckContext.Provider value={{ currentDeck, setCurrentDeck }}>
      {children}
    </DeckContext.Provider>
  );
}
