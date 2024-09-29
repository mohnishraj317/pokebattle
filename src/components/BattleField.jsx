import axios from "axios";

import { useState, useEffect } from "react";
import { usePokeCard } from "../contexts/usePokeCard";

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

  return ((2*level/5 + 2) * (attack/defense) * power * effectiveness * (accuracy/100) * speed / 100);
}

function chooseRandomMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)]?.move
}

function transformDamageRelations(dmgRels) {
  const keymaps = {
    "double_damage_to": 2,
    "half_damage_to": 1/2,
    "no_damage_to": 0
  };

  const rels = Object.entries(dmgRels)
        .filter(([k, v]) => /_to$/.test(k))
        .map(([k, v]) => {
          const key = keymaps[k];
          const value = v.map(({ name }) => name);

          return [key, value]
        });

  return Object.fromEntries(rels);
}

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

  return Math.max(...effectiveness);
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

  useEffect(() => {
    const movesEndpoints = [
      poke1Stats.move.url,
      poke2Stats.move.url,
      //...(poke1Stats.types.map(({ url }) => url)),
      //...(poke2Stats.types.map(({ url }) => url)),
    ];

    axios.all(movesEndpoints.map(endpoint => axios.get(endpoint)))
      .then(([ ...res ]) => {
        poke1Stats.accuracy = res[0].data.accuracy ?? 0;
        poke2Stats.accuracy = res[1].data.accuracy ?? 0;

        poke1Stats.power = res[0].data.power ?? 0;
        poke2Stats.power = res[1].data.power ?? 0;
      }).catch(console.error);

    const typesEndpoints = [...(poke1Stats.types.map(({ url }) => url)), ...(poke2Stats.types.map(({ url }) => url))];

    axios.all(typesEndpoints.map(endpoint => axios.get(endpoint)))
      .then(res => {
        const dmgrel1 = res[0].data.damage_relations;
        const dmgrel2 = res[1].data.damage_relations;

        const eff1 = getEffectiveness(poke2Stats.types, dmgrel1);
        const eff2 = getEffectiveness(poke1Stats.types, dmgrel2);
  
        poke1Stats.effectiveness = eff1;
        poke2Stats.effectiveness = eff2;

        console.log(calculateDamage({ ...poke1Stats }))
      });

    return () => {
      poke1Stats.effectiveness = 0;
      poke2Stats.effectiveness = 0;
      poke1Stats.damage_relations = [];
      poke2Stats.damage_relations = [];
    }
  }, []);

  poke1Stats.damage = calculateDamage({ ...poke1Stats });
  poke2Stats.damage = calculateDamage({ ...poke2Stats });
  
  return <div className="bg-red-300 p-4">
    Hello
  </div>
}
