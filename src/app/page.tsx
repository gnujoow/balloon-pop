"use client";

import Image from "next/image";
import Board from "./components/board";
import { useState } from "react";

enum GameStateType {
  init,
  playing,
  won,
  lost,
}
export default function Home() {
  const [gameState, setGameState] = useState<GameStateType>(
    GameStateType.playing
  );

  const array = [
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 1, 0, 1],
  ];

  return <Board boardArray={array} />;
}
