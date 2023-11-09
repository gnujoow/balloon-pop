import { FC } from "react";

interface CellProps {
  value: number;
  position: { x: number; y: number };
  onClickCell: (
    e: React.MouseEvent<HTMLDivElement>,
    { value, x, y }: { value: number; x: number; y: number }
  ) => void;
}
const Cell: FC<CellProps> = ({ value, position, onClickCell }) => {
  const classname =
    "flex justify-center items-center border-solid border-2 border-sky-500 w-12 h-12";
  if (value === 0) {
    return <div className={`${classname}`} />;
  }
  return (
    <div
      className={`${classname}`}
      onClick={(e) => onClickCell(e, { value, ...position })}
    >
      {/* todo: 나중에 value영역 지울것 */}
      {value}
      🎈
    </div>
  );
};

export default Cell;
