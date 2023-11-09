import { FC, useEffect, useState } from "react";

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

const Board: FC<BoardProps> = ({ boardArray }) => {
  const [renderBoardArray, setRenderBoardArray] = useState<number[][]>([]);

  useEffect(() => {
    const newArr = updateConnectedBalloons(boardArray);
    console.info({ newArr });
    setRenderBoardArray(newArr);
  }, [boardArray]);

  return (
    <div>
      {renderBoardArray.map((row, rowIndex) => (
        // row
        <div key={rowIndex} className="flex">
          {/* col */}
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className="flex justify-center items-center border-solid border-2 border-sky-500 w-12 h-12"
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
