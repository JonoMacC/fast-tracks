import React from "react";
import { Icon } from "../Icons";
import "./StepInput.css";

export const StepInput = ({ value, setValue, min, max }) => {
  const stepBackDisabled = value === min;
  const stepForwardDisabled = value === max;

  const stepUp = () => {
    return value < max ? setValue((prevState) => prevState + 1) : null;
  };

  const stepDown = () => {
    return value > min ? setValue((prevState) => prevState - 1) : null;
  };

  return (
    <div className="StepInput">
      <button
        className="TapItem"
        onClick={stepDown}
        disabled={stepBackDisabled}
        aria-label="Decrement"
      >
        <Icon name="remove" color="var(--text)" size={24} />
      </button>
      <span style={{ width: "44px", opacity: "0.8" }}>{value}</span>
      <button
        className="TapItem"
        onClick={stepUp}
        disabled={stepForwardDisabled}
        aria-label="Increment"
      >
        <Icon name="add" color="var(--text)" size={24} />
      </button>
    </div>
  );
};
