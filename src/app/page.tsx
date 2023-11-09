"use client";

import { useEffect, useState } from "react";

import Board, { GameStateType } from "./components/board";
import { onSaveClipboard } from "./utils/interactions";
import { convert2DArrayToHex, convertHexTo2DArray } from "./utils/number";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [boardSize, setBoardSize] = useState<number>(4);
  const [gameState, setGameState] = useState<GameStateType>(GameStateType.init);
  const [gameSeed, setGameSeed] = useState<number>(0);
  const [boardArray, setBoardArray] = useState<number[][]>([[]]);

  useEffect(() => {
    if (searchParams.has("board") && searchParams.has("size")) {
      const board = searchParams.get("board") as string;
      const size = searchParams.get("size") as string;

      const boardSeedNumber = board ? parseInt(board, 16) : 0;
      const boardSize = size ? parseInt(size, 10) : 0;
      const boardArray = convertHexTo2DArray(boardSeedNumber, boardSize);

      if (boardSeedNumber <= 0) {
        return;
      }

      setGameSeed(boardSeedNumber);
      setBoardSize(boardSize);
      setBoardArray(boardArray);
      setGameState(GameStateType.playing);
    }
  }, [searchParams.has("board"), searchParams.has("size")]);

  const handleChangeBoardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBoardSize(Number(value));
  };

  const onClickStart = () => {
    let seed = 0;

    while (seed === 0) {
      seed = Math.floor(Math.random() * Math.pow(2, boardSize * boardSize));
    }

    const array = convertHexTo2DArray(seed, boardSize);

    setGameSeed(seed);
    setBoardArray(array);
    setGameState(GameStateType.playing);
  };

  const onClickCopyUrl = (
    e: React.MouseEvent<HTMLButtonElement>,
    arr: number[][]
  ) => {
    const board = convert2DArrayToHex(arr);
    const queryObject = {
      board,
      size: boardSize.toString(),
    };

    const queryStr = new URLSearchParams(queryObject).toString();
    const url = `${window.location.origin}/?${queryStr}`;

    onSaveClipboard(e, url);
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
        <div>Game Seed - {`[${gameSeed.toString(16)}]`}</div>
        <hr />
        <Board
          boardArray={boardArray}
          gameState={gameState}
          onClickCopy={onClickCopyUrl}
        />
      </div>
    );
  }
}
