import { createContext, useContext, useState } from "react";

const PokeCardContext = createContext();

export function usePokeCard() {
  return useContext(PokeCardContext);
}

export function PokeCardProvider({ children }) {
  const [selected, setSelected] = useState({  });

  function selectPokemon(data) {
    return () => setSelected(data);
  }

  return <PokeCardContext.Provider value={{ 
    selected,
    selectPokemon
  }}>
      {children}
    </PokeCardContext.Provider>
}
