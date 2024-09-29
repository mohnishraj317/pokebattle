function showmoves({ moves }) {
  return <div>
      {moves.map(move => move.name)}
    </div>
}

function KeyValue({ k, v }) {
  return <span className="flex gap-2">
    <span className="font-bold">{k}</span>
    <span>{v}</span>
  </span>
}

export default function WinnerScreen({ data, looserdata }) {

  console.log(looserdata)
  return <div className="flex flex-col absolute -translate-x-1/2 -tarnslate-y-1/2 top-1/2 left-1/2">
    <div className="bg-yellow-300">{data.name} wins!</div>
    
    <div className="flex gap-2">
      <div className="flex gap-2 flex-col">
        <h1>Player 1 stats</h1>
        <KeyValue k={"Damage dealt"} v={data.damage} />
        <KeyValue k={"Move used"} v={data.move.name} />
      </div>

      <div className="flex gap-2 flex-col">
        <h1>Player 2 stats</h1>
        <KeyValue k={"Damage dealt"} v={looserdata.damage} />
        <KeyValue k={"Move used"} v={looserdata.move.name} />
      </div>
    </div>
  </div>
}
