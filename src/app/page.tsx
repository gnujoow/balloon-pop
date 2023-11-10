"use client";

import { useEffect, useState } from "react";

import Board, { GameStateType } from "./components/board";
import { onSaveClipboard } from "./utils/interactions";
import { convert2DArrayToHex, convertHexTo2DArray } from "./utils/number";
import { useSearchParams } from "next/navigation";
import { Button, Divider, Slider, Stack, Typography } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";

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

  const handleChangeBoardSize = (event: Event, newValue: number | number[]) => {
    setBoardSize(newValue as number);
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
      <>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Grid3x3Icon />
          <Slider
            aria-label="Volume"
            value={boardSize}
            onChange={handleChangeBoardSize}
            min={2}
            max={7}
            step={1}
          />
          <Grid4x4Icon />
        </Stack>

        <Button variant="contained" onClick={onClickStart}>
          start
        </Button>

        <Board boardArray={mockArray} />
      </>
    );
  }

  if (gameState === GameStateType.playing) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Game Seed - {`[${gameSeed.toString(16)}]`}
        </Typography>

        <Board
          boardArray={boardArray}
          gameState={gameState}
          onClickCopy={onClickCopyUrl}
        />
      </>
    );
  }
}
