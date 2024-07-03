import React from "react";

const Reset = ({ onReset }: { onReset: () => void }) => {
  return (
    <div onClick={onReset} className="reset">
      Start Again
    </div>
  );
};

export default Reset;
