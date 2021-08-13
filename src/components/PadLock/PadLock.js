import React from "react";
import lockedsvg from "../../padlock.svg";
import unlockedsvg from "../../padunlocked.svg";

const PadLock = ({ locked, onClick }) => {
  return (
    <img
      width="25"
      height="25"
      style={{ cursor: "pointer" }}
      src={locked ? lockedsvg : unlockedsvg}
      alt={locked ? "locked" : "unlocked"}
      onClick={() => onClick(!locked)}
    />
  );
};

export default PadLock;
