import { Box, Button, Modal, Typography } from "@mui/material";
import { GameStateType } from "./board";

interface GameResultModalProps {
  gameResultState: GameStateType;
  onClickToInit: () => void;
}
const GameResultModal = ({
  gameResultState,
  onClickToInit,
}: GameResultModalProps) => {
  return (
    <Modal
      open={true}
      onClose={onClickToInit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 4 }}
        >
          {gameResultState === GameStateType.lost ? "Game Over" : "Congrats!"}
        </Typography>
        <Button variant="contained" onClick={onClickToInit}>
          Go Back to Main
        </Button>
      </Box>
    </Modal>
  );
};

export default GameResultModal;
