import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import dice1 from "./assets/cubes_gambling_n_02.jpg";
import dice2 from "./assets/cubes_gambling_n_02 2.jpg";
import dice3 from "./assets/cubes_gambling_n_02 3.jpg";
import dice4 from "./assets/cubes_gambling_n_02 4.jpg";
import dice5 from "./assets/cubes_gambling_n_02 5.jpg";
import dice6 from "./assets/cubes_gambling_n_02 6.jpg";
import WinnerModal from "./WinnerModal";
import "./BettingGame.css";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const initialBets = [0, 0, 0, 0, 0, 0];

const BettingGame = () => {
  const [balance, setBalance] = useState(100);
  const [bets, setBets] = useState(initialBets);
  const [timer, setTimer] = useState(10);
  const [winner, setWinner] = useState(null);
  const [curRoundWon, setCurRoundWon] = useState(0);
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      disableBetting();
      setTimeout(() => {
        const randomDice = Math.floor(Math.random() * 6) + 1;
        const wonAmount = bets[randomDice - 1] * 2; //2
        const lostAmount =
          bets.reduce((acc, cur) => acc + cur, 0) - bets[randomDice - 1];
        setWinner(randomDice);
        setCurRoundWon(wonAmount);
        setBalance((prevBalance) => prevBalance + wonAmount - lostAmount);
        setWon((prevWonAmount) => prevWonAmount + wonAmount);
        setLost((prevLostAmount) => prevLostAmount + lostAmount);
        setOpenModal(true);
        setTimeout(() => {
          resetGame();
        }, 5000);
      }, 2000);
    }

    return () => clearInterval(countdown);
    // eslint-disable-next-line
  }, [timer]);

  const handleClose = () => setOpenModal(false);

  const disableBetting = () => {
    setBets((prevBets) => prevBets.map(() => 0));
  };

  const resetGame = () => {
    setBets(initialBets);
    setTimer(10);
    setWinner(null);
    setOpenModal(false);
  };

  const handleBet = (position) => {
    if (timer > 0) {
      setBets((prevBets) =>
        prevBets.map((bet, index) => (index === position ? bet + 1 : bet))
      );
    }
  };

  const renderDice = () => {
    return [1, 2, 3, 4, 5, 6].map((dice, id) => (
      <div key={dice} className="dice">
        <img src={diceImages[id]} alt={`dice ${id + 1}`} />
        <div className="bet-container">
          <p>Bet: ${bets[dice - 1]}</p>
          <Button
            sx={{ color: "black" }}
            variant="outlined"
            size="small"
            onClick={() => handleBet(id)}
            disabled={timer === 0}
          >
            Bet
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1 className="title">Betting Game</h1>
      <div className="content">
        <p className="balance">Balance: ${balance}</p>
        <p className="time-left">Time left: {timer}s</p>
        <div className="won-lost">
          <p className="won">Won: {won}</p>
          <p className="lost">Lost: {lost}</p>
        </div>
      </div>
      <div className={`dice-board ${timer === 0 && "disable"}`}>
        {renderDice()}
      </div>
      {winner && (
        <WinnerModal
          openModal={openModal}
          handleClose={handleClose}
          winner={winner}
          timer={timer}
          diceImages={diceImages}
          curRoundWon={curRoundWon}
        />
      )}
    </div>
  );
};

export default BettingGame;
