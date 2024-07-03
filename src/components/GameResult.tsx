import React from "react";

const GameResult = ({ gameStatus }: { gameStatus: string }) => {
  return <div className="game-result">{gameStatus}</div>;
};

export default GameResult;
