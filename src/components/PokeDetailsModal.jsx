import { useEffect, useState } from "react"

import { cn } from "../utils.js";

import { usePokeCard } from "../contexts/usePokeCard";

function KeyValue({
  k, v
}) {
  return <span className="flex gap-2">
    <span className="font-bold">{k}</span>
    <span>{v}</span>
  </span>
}

function Abilities({ abilities }) {
  return <span className="flex gap-2">
    <span className="font-bold">Abilities</span>
    {abilities.map(({ ability }) => <span key={ability.name}>{ability.name}</span>)}
  </span>
}

function BaseStatKV({ k, v }) {
  return <li><span className="font-bold">{k}</span> <span>{v}</span></li>
}

function BaseStats({ stats }) {
  return <span className="flex gap-2">
    <span className="font-bold">Base Stats</span>
    <ul className="px-2">
      {stats.map(stat => <BaseStatKV key={stat.stat.name} k={stat.stat.name} v={stat.base_stat} />)}
    </ul>
  </span>;
}

function Type({ types }) {
  return <span className="flex gap-2">
    <span className="font-bold">Type</span>
    {types.join("/")}
  </span>;
}

export default function PokeDetailsModal({ isOpen, closeModalCallback }) {
  const { selected, pickPokemon, isPicked } = usePokeCard();

  if (!selected.name) return "";

  return <div className={cn("rounded p-2 flex flex-col gap-2 border border-black bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", !isOpen && "hidden")}>
    <div>
      <button className="border rounded p-2" onClick={closeModalCallback}>&times;</button>
    </div>
    <hr className="border-b" />
    <div className="flex flex-col gap-1">
      <KeyValue k="Name" v={selected.name} />
      <KeyValue k="Height" v={selected.height} />
      <KeyValue k="Weight" v={selected.weight} />
      <Type types={selected.types.map(type => type.type.name)} />
      <Abilities abilities={selected.abilities} />
      <BaseStats stats={selected.stats} />
    </div>
    <button onClick={pickPokemon(selected)} className="block text-center bg-yellow-300 p-4 rounded">{isPicked(selected.name) ? "Picked" : "Pick!"}</button>
  </div>
}
