import { FC } from "react";

interface CellProps {
  value: number;
  onClick?: () => void;
}
const Cell: FC<CellProps> = ({ value, onClick }) => {
  const classname =
    "flex justify-center items-center border-solid border-2 border-sky-500 w-12 h-12";
  if (value === 0) {
    return <div className={`${classname}`} />;
  }
  return (
    <div className={`${classname}`}>
      {/* todo: 나중에 value영역 지울것 */}
      {value}
      🎈
    </div>
  );
};

export default Cell;
