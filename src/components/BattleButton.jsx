import { usePokeCard } from "../contexts/usePokeCard";

function BattleButtonElem({ onClick }) {
  return <button onClick={onClick} className="rounded span-4 block p-4 text-center bg-yellow-400">Battle!</button>
}

export default function BattleButton({ changeMode }) {
  const { picked } = usePokeCard();

  return <div className="p-2">
    {picked.length === 2 ? <BattleButtonElem onClick={changeMode} /> : "Choose two pokemons to battle!"}
  </div>
}
