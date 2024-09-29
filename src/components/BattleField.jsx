import axios from "axios";

import { useState, useEffect } from "react";
import { usePokeCard } from "../contexts/usePokeCard";

import WinnerScreen from "./WinnerScreen"

function calculateDamage({
  level, attack, defense,
  power, effectiveness, accuracy,
  speed
}) {
  console.log({
   level, attack, defense,
  power, effectiveness, accuracy,
  speed
   
  })

  accuracy ||= 0;
  power ||= 0

  return ((2*level/5 + 2) * (attack/defense) * power * effectiveness * (accuracy/10) * speed / 100);
}

function chooseRandomMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)]?.move
}
//
//function transformDamageRelations(dmgRels) {
//  const keymaps = {
//    "double_damage_to": 2,
//    "half_damage_to": 1/2,
//    "no_damage_to": 0
//  };
//
//  const rels = Object.entries(dmgRels)
//        .filter(([k, v]) => /_to$/.test(k))
//        .map(([k, v]) => {
//          const key = keymaps[k];
//          const value = v.map(({ name }) => name);
//
//          return [key, value]
//        });
//
//  return Object.fromEntries(rels);
//}
//
function getEffectiveness(types, dmgrel) {
  const effectiveness = [];
  const keys = {
    "double_damage_to": 2,
    "half_damage_to": 1/2,
    "no_damage_to": 0,
  };
  const opp_types = types.map(type => type.name);

  Object.entries(dmgrel).forEach(([ mult, types ]) => {
    types = types.map(({name}) => name);

    if (/_to$/.test(mult)) {
      const isOppTypePresent = opp_types.map(t => types.includes(t)).some(a => a);
      
      if (isOppTypePresent) effectiveness.push(keys[mult]);
    }
  })

  return effectiveness;
}

export default function BattleField() {
  const { picked } = usePokeCard();
  const poke1 = picked[0];
  const poke2 = picked[1];

  // player 1
  const poke1Stats = {
    move : chooseRandomMove(poke1.moves),
    accuracy: null,
    hp: poke1.stats.find(stat => stat.stat.name === "hp").base_stat,
    attack: poke1.stats.find(stat => stat.stat.name === "attack").base_stat,
    defense: poke1.stats.find(stat => stat.stat.name === "defense").base_stat,
    level: 50,
    effectiveness: [],
    speed: poke1.stats.find(stat => stat.stat.name === "speed").base_stat,
    power: null,
    types: poke1.types.map(type => type.type),
    damage_relations: [],
  }

  // player 2
  const poke2Stats = {
    move : chooseRandomMove(poke2.moves),
    accuracy: null,
    hp: poke2.stats.find(stat => stat.stat.name === "hp").base_stat,
    attack: poke2.stats.find(stat => stat.stat.name === "attack").base_stat,
    defense: poke2.stats.find(stat => stat.stat.name === "defense").base_stat,
    level: 50,
    effectiveness: [],
    speed: poke2.stats.find(stat => stat.stat.name === "speed").base_stat,
    power: null,
    types: poke2.types.map(type => type.type),
    damage_relations: [],
  }

  const [winner, setWinner] = useState({});

  useEffect(() => {
    const movesEndpoints = [
      poke1Stats.move.url,
      poke2Stats.move.url,
      ...(poke1Stats.types.map(({ url }) => url)),
      ...(poke2Stats.types.map(({ url }) => url)),
    ];

    axios.all(movesEndpoints.map(endpoint => axios.get(endpoint)))
      .then(([ ...res ]) => {
        poke1Stats.accuracy = res[0].data.accuracy ?? 0;
        poke2Stats.accuracy = res[1].data.accuracy ?? 0;

        poke1Stats.power = res[0].data.power ?? 0;
        poke2Stats.power = res[1].data.power ?? 0;

        const eff1 = [];
        const eff2 = [];

        for (let i = 2; i < poke1Stats.types.length + 2; i++) {
          const dmgrel = res[i].data.damage_relations;
          const eff = getEffectiveness(poke2Stats.types, dmgrel);

          eff1.push(...eff);
        }

        for (let i = poke1Stats.types.length 
          + 2; i < poke1Stats.types.length + poke2Stats.types.length + 2; i++) {
          const dmgrel = res[i].data.damage_relations;
          const eff = getEffectiveness(poke1Stats.types, dmgrel);

          eff2.push(...eff);
        }

        poke1Stats.effectiveness = Math.max(...eff1);
        poke2Stats.effectiveness = Math.max(...eff2);

        poke1Stats.damage = calculateDamage({ ...poke1Stats });
        poke2Stats.damage = calculateDamage({ ...poke2Stats });
        
        poke1Stats.name = "player 1";
        poke2Stats.name = "player 2";

        if (poke1Stats.damage > poke2Stats.damage) setWinner(poke1Stats);
        else 
          //(poke2Stats.damage > poke1Stats.damage)
        setWinner(poke2Stats);

      }).catch(console.error);

    return () => {
      poke1Stats.effectiveness = 0;
      poke2Stats.effectiveness = 0;
      poke1Stats.damage_relations = [];
      poke2Stats.damage_relations = [];
    }
  }, []);

  if (winner.name) return <WinnerScreen data={winner} looserdata={winner.name === poke2Stats.name ? poke1Stats : poke2Stats} />
  
  return <div className="bg-red-300 p-4">
    Hello
  </div>
}
