import { useEffect, useState } from "react";
import axios from "axios";

import { usePokeCard } from "../contexts/usePokeCard.jsx";

import { cn } from "../utils.js"

export default function PokeCard({
  url, name, onClick
}) {
  const [cardData, setCardData] = useState({});

  const { selected, selectPokemon } = usePokeCard();

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      console.log(data)
      setCardData(data);
    }).catch(console.error);
  }, []);

  function clickHandler() {
    selectPokemon(cardData)();
    onClick();
  }

  if (!cardData.sprites) return "Loading...";

  return <div onClick={clickHandler} className={cn(selected.name === name && "border-blue-400", "cursor-pointer border rounded p-4")}>
    <img src={cardData.sprites.front_default} />
    <span>{name}</span>
  </div>
}
