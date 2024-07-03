import React from "react";

const Tile = ({
  className,
  value,
  onChange,
  playerTurn
}: {
  className: string;
  value: string;
  onChange: () => void;
  playerTurn: string;
}) => {
  let hoverClass = null;
  if (value == null && playerTurn !== null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }

  return (
    <div className={`tile ${className} ${hoverClass}`} onClick={onChange}>
      {value}
    </div>
  );
};

export default Tile;
