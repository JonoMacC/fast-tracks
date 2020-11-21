import React from "react";
import { Icon } from "../Icons";
import "./StepInput.css";

export const StepInput = ({ value, stepUp, stepDown, min, max }) => {
  const stepBackDisabled = value === min;
  const stepForwardDisabled = value === max;

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
