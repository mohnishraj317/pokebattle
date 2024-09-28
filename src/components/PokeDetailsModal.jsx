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

export default function PokeDetailsModal({ isOpen, closeModalCallback }) {
  const { selected } = usePokeCard();

  if (!selected.name) return "";

  return <div className={cn(!isOpen && "hidden", "border border-black bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
    <div className="p-2 border-b">
      <button className="border rounded p-2" onClick={closeModalCallback}>&times;</button>
    </div>
    <div className="flex flex-col gap-1 p-2">
      <KeyValue k="Name" v={selected.name} />
      <KeyValue k="Height" v={selected.height} />
      <KeyValue k="Weight" v={selected.weight} />
      <Abilities abilities={selected.abilities} />
      <BaseStats stats={selected.stats} />
    </div>
  </div>
}
//
//weight
//stats.base_stats
//abilities.ability [.name, .url]
//moves [.name]
