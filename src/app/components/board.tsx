import { FC, useEffect, useState } from "react";
import Cell from "./cell";
import { render } from "react-dom";

interface BoardProps {
  boardArray: number[][];
}

let count = 0;
interface DFSParams {
  arr: number[][];
  x: number;
  y: number;
  visited: boolean[][];
}
function dfs({ arr, x, y, visited }: DFSParams) {
  if (
    x < 0 ||
    x >= arr.length ||
    y < 0 ||
    y >= arr[0].length ||
    visited[x][y] ||
    arr[x][y] === 0
  ) {
    return;
  }

  visited[x][y] = true;
  count++;

  dfs({ arr, visited, x: x + 1, y });
  dfs({ arr, visited, x: x - 1, y });
  dfs({ arr, visited, x, y: y + 1 });
  dfs({ arr, visited, x, y: y - 1 });
}

function updateConnectedBalloons(arr: number[][]): number[][] {
  const rows = arr.length;
  const cols = arr[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const result: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j] && arr[i][j] === 1) {
        count = 0;
        dfs({ arr, x: i, y: j, visited });
        console.info({ count });

        fillConnectResult({
          grid: arr,
          visited,
          result,
          count,
          x: i,
          y: j,
        });
      }
    }
  }

  return result;
}

interface FillConnectResultParams {
  grid: number[][];
  x: number;
  y: number;
  visited: boolean[][];
  result: number[][];
  count: number;
}
function fillConnectResult({
  grid,
  x,
  y,
  visited,
  result,
  count,
}: FillConnectResultParams) {
  if (
    x < 0 ||
    x >= grid.length ||
    y < 0 ||
    y >= grid[0].length ||
    result[x][y] !== 0
  ) {
    return;
  }

  if (visited[x][y]) {
    result[x][y] = count;
    fillConnectResult({ grid, visited, result, count, x: x + 1, y });
    fillConnectResult({ grid, visited, result, count, x: x - 1, y });
    fillConnectResult({ grid, visited, result, count, x, y: y + 1 });
    fillConnectResult({ grid, visited, result, count, x, y: y - 1 });
  }
}

interface PopBalloonsParams {
  grid: number[][];
  x: number;
  y: number;
  targetNumber: number;
  result: number[][];
}
const popBalloons = ({
  grid,
  x,
  y,
  result,
  targetNumber,
}: PopBalloonsParams) => {
  if (
    x < 0 ||
    x >= grid.length ||
    y < 0 ||
    y >= grid[0].length ||
    result[y][x] === 0
  ) {
    return;
  }

  if (grid[y][x] === targetNumber) {
    result[y][x] = 0;
    popBalloons({ grid, result, targetNumber, x: x + 1, y });
    popBalloons({ grid, result, targetNumber, x: x - 1, y });
    popBalloons({ grid, result, targetNumber, x, y: y + 1 });
    popBalloons({ grid, result, targetNumber, x, y: y - 1 });
  }
};

const Board: FC<BoardProps> = ({ boardArray }) => {
  const [renderBoardArray, setRenderBoardArray] = useState<number[][]>([]);
  const [biggestNumber, setBiggestNumber] = useState<number>(0);

  useEffect(() => {
    const newArr = updateConnectedBalloons(boardArray);
    console.info({ newArr });
    setRenderBoardArray(newArr);
  }, [boardArray]);

  useEffect(() => {
    let biggest = 0;
    renderBoardArray.forEach((row) => {
      row.forEach((col) => {
        if (col > biggest) {
          biggest = col;
        }
      });
    });

    setBiggestNumber(biggest);
    // todo enhance for initial rending
    if (biggest === 0) {
      alert("won");
    }
  }, [renderBoardArray]);

  const handleClickCell = (
    e: React.MouseEvent<HTMLDivElement>,
    { value, x, y }: { value: number; x: number; y: number }
  ) => {
    // decide wpn or lost
    if (value < biggestNumber) {
      alert("lost");
      return;
    }

    // pop
    const newArr = [...renderBoardArray];
    popBalloons({
      grid: renderBoardArray,
      x,
      y,
      result: newArr,
      targetNumber: value,
    });
    setRenderBoardArray(newArr);
  };

  return (
    <div>
      {biggestNumber}
      {renderBoardArray.map((row, rowIndex) => (
        // row
        <div key={rowIndex} className="flex">
          {/* col */}
          {row.map((col, colIndex) => (
            <Cell
              key={colIndex}
              value={col}
              position={{ x: colIndex, y: rowIndex }}
              onClickCell={handleClickCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
