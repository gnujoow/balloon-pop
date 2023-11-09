import { FC, useEffect, useState } from "react";

interface BoardProps {
  boardArray: number[][];
}
const Board: FC<BoardProps> = ({ boardArray }) => {
  const [renderBoardArray, setRenderBoardArray] = useState<number[][]>([]);

  useEffect(() => {
    // todo: initialize renderBoardArray with algorithm
    setRenderBoardArray(boardArray);
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
