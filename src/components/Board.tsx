import Strike from "./Strike";
import Tile from "./Tile";
import GameResult from "./GameResult";
import Reset from "./Reset";
import { useEffect, useState } from "react";

const PlayerX = "X";
const PlayerO = "O";

const winingCombinations = [
  //row
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //column
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //diagonal
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" }
];

export const GAME_STATUS_0 = "X won";
export const GAME_STATUS_1 = "O won";
export const GAME_STATUS_2 = "Draw";
export const GAME_STATUS_3 = "In progress";

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState(PlayerX);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [strikeClass, setStrikeClass] = useState("");
  const [gameStatus, setGameStatus] = useState(GAME_STATUS_3);

  const handleTileValueChange = (idx: number) => {
    if (tiles[idx] !== null || gameStatus !== GAME_STATUS_3) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[idx] = currentPlayer;
    setTiles(newTiles);
    currentPlayer === PlayerX
      ? setCurrentPlayer(PlayerO)
      : setCurrentPlayer(PlayerX);
  };
  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setGameStatus(GAME_STATUS_3);
    setCurrentPlayer(PlayerX);
    setStrikeClass("");
  };
  useEffect(() => {
    for (const { combo, strikeClass } of winingCombinations) {
      const tile1 = combo[0];
      const tile2 = combo[1];
      const tile3 = combo[2];

      if (
        tiles[tile1] !== null &&
        tiles[tile1] === tiles[tile2] &&
        tiles[tile1] === tiles[tile3]
      ) {
        setStrikeClass(strikeClass);
        const gs = tiles[tile1] === PlayerX ? GAME_STATUS_0 : GAME_STATUS_1;
        setGameStatus(gs);
      }
    }
    const allTilesFilledIn = tiles.every((tile) => tile !== null);
    if (allTilesFilledIn) {
      setGameStatus(GAME_STATUS_2);
    }
  }, [tiles]);

  return (
    <>
      <h4>Tic Tac Toe</h4>
      <div className="board">
        <Tile
          value={tiles[0]}
          playerTurn={currentPlayer}
          onChange={() => handleTileValueChange(0)}
          className="tile-right-border tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[1]}
          onChange={() => handleTileValueChange(1)}
          className="tile-right-border tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[2]}
          onChange={() => handleTileValueChange(2)}
          className="tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[3]}
          onChange={() => handleTileValueChange(3)}
          className="tile-right-border tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[4]}
          onChange={() => handleTileValueChange(4)}
          className="tile-right-border tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[5]}
          onChange={() => handleTileValueChange(5)}
          className="tile-bottom-border"
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[6]}
          onChange={() => handleTileValueChange(6)}
          className="tile-right-border "
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[7]}
          onChange={() => handleTileValueChange(7)}
          className="tile-right-border "
        />
        <Tile
          playerTurn={currentPlayer}
          value={tiles[8]}
          onChange={() => handleTileValueChange(8)}
          className=""
        />
        <Strike className={strikeClass} />
      </div>
      {gameStatus !== GAME_STATUS_3 && (
        <>
          <GameResult gameStatus={gameStatus} />
          <Reset onReset={handleReset} />
        </>
      )}
    </>
  );
};

export default Board;
