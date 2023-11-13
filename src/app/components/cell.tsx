import { Paper, SxProps } from "@mui/material";
import { FC } from "react";

interface CellProps {
  value: number;
  position: { x: number; y: number };
  onClickCell: (
    e: React.MouseEvent<HTMLDivElement>,
    { value, x, y }: { value: number; x: number; y: number },
  ) => void;
}
const Cell: FC<CellProps> = ({ value, position, onClickCell }) => {
  const sxStyle: SxProps = {
    width: "4rem",
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
  };
  if (value === 0) {
    return <Paper sx={{ ...sxStyle, cursor: "not-allowed" }} />;
  }
  return (
    <Paper
      // todo add hover style
      sx={{ ...sxStyle, cursor: "pointer" }}
      onClick={(e) => onClickCell(e, { value, ...position })}
    >
      🎈
    </Paper>
  );
};

export default Cell;
