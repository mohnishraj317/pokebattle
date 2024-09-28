import { useState, useEffect } from  "react";

import PokeCard from "./components/PokeCard";
import PokeDetailsModal from "./components/PokeDetailsModal";

import { PokeCardProvider } from "./contexts/usePokeCard";

const pokemons = [
  {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  },
  {
    "name": "venusaur",
    "url": "https://pokeapi.co/api/v2/pokemon/3/"
  },
  {
    "name": "charmander",
    "url": "https://pokeapi.co/api/v2/pokemon/4/"
  },
  {
    "name": "charmeleon",
    "url": "https://pokeapi.co/api/v2/pokemon/5/"
  },
  {
    "name": "charizard",
    "url": "https://pokeapi.co/api/v2/pokemon/6/"
  },
  {
    "name": "squirtle",
    "url": "https://pokeapi.co/api/v2/pokemon/7/"
  },
  {
    "name": "wartortle",
    "url": "https://pokeapi.co/api/v2/pokemon/8/"
  },
  {
    "name": "blastoise",
    "url": "https://pokeapi.co/api/v2/pokemon/9/"
  },
  {
    "name": "caterpie",
    "url": "https://pokeapi.co/api/v2/pokemon/10/"
  },
  {
    "name": "metapod",
    "url": "https://pokeapi.co/api/v2/pokemon/11/"
  },
  {
    "name": "butterfree",
    "url": "https://pokeapi.co/api/v2/pokemon/12/"
  },
  {
    "name": "weedle",
    "url": "https://pokeapi.co/api/v2/pokemon/13/"
  },
  {
    "name": "kakuna",
    "url": "https://pokeapi.co/api/v2/pokemon/14/"
  },
  {
    "name": "beedrill",
    "url": "https://pokeapi.co/api/v2/pokemon/15/"
  },
]

export default function App() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  function openDetailModal() { setDetailModalOpen(true) }

  return <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 p-4">
    <PokeCardProvider>
      {pokemons.map(pokemon => <PokeCard onClick={openDetailModal} key={pokemon.name} {...pokemon} />)}
      <PokeDetailsModal isOpen={detailModalOpen} closeModalCallback={() => setDetailModalOpen(false)} />
    </PokeCardProvider>
  </div>;
}
