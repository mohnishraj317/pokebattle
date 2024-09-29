import { createContext, useContext, useState, useRef } from "react";

const PokeCardContext = createContext();

export function usePokeCard() {
  return useContext(PokeCardContext);
}

export function PokeCardProvider({ children }) {
  const [selected, setSelected] = useState({  });
  const [picked, setPicked] = useState([]);
  
  function isPicked(name) {
    return picked.findIndex(poke => poke.name === name) > -1;
  }

  function selectPokemon(data) {
    return () => setSelected(data);
  }

  function pickPokemon(data) {
    return () => {
      if (picked.includes(data) || picked.length === 2) return;

      setPicked(prev => [...prev, data]);
    }
  }

  return <PokeCardContext.Provider value={{ 
    selected,
    selectPokemon,
    pickPokemon,
    isPicked,
    picked
  }}>
    {children}
  </PokeCardContext.Provider>
}
