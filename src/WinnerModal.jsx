import React from 'react';
import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const WinnerModal = ({openModal, handleClose, winner, timer, diceImages, curRoundWon}) => {
  return (
    <div>
      <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {timer === 0 && winner && <p>Winner: Dice {winner}</p>}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <img src={diceImages[winner - 1]} alt={`dice ${winner}`} />
              <div className="winner-round">
                <div>Your Bet: {curRoundWon / 2}</div>
                <div>Won this round: {curRoundWon}</div>
              </div>
            </Typography>
          </Box>
        </Modal>
    </div>
  )
}

export default WinnerModal