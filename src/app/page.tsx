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
  const [boardSize, setBoardSize] = useState<number>(4);
  const [gameState, setGameState] = useState<GameStateType>(GameStateType.init);
  const [gameSeed, setGameSeed] = useState<number>(0);
  const [boardArray, setBoardArray] = useState<number[][]>([[]]);

  const handleChangeBoardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBoardSize(Number(value));
  };

  const onClickStart = () => {
    let seed = 0;

    while (seed === 0) {
      seed = Math.floor(Math.random() * Math.pow(2, boardSize * boardSize));
    }
    const string = seed.toString(2);

    let array = new Array(boardSize)
      .fill(null)
      .map(() => new Array(boardSize).fill(0));

    let binaryIndex = string.length - 1;
    for (let i = boardSize - 1; i >= 0; i--) {
      for (let j = boardSize - 1; j >= 0; j--) {
        if (binaryIndex >= 0) {
          array[i][j] = parseInt(string[binaryIndex--], 10);
        }
      }
    }
    setGameSeed(seed);
    setBoardArray(array);
    setGameState(GameStateType.playing);
  };

  if (gameState === GameStateType.init) {
    const mockArray: number[][] = Array.from({ length: boardSize }, () =>
      Array(boardSize).fill(0)
    );
    return (
      <div>
        <div>
          <label>Board Size {boardSize}</label>
          <input
            type="range"
            min="2"
            max="7"
            onChange={handleChangeBoardSize}
          />
        </div>
        <button
          className="bg-slate-500 hover:bg-slate-300 text-white p-2 rounded"
          onClick={onClickStart}
        >
          start
        </button>
        <hr />
        <Board boardArray={mockArray} />
      </div>
    );
  }

  if (gameState === GameStateType.playing) {
    return (
      <div>
        <div>
          {gameSeed}:{gameSeed.toString(16)}
        </div>
        <Board boardArray={boardArray} />
      </div>
    );
  }
}
