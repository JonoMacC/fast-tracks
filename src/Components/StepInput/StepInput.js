import React from "react";
import { Icon } from "../Icons/Icons";
import "./StepInput.css";

export const StepInput = (props) => {
  const stepBackDisabled = props.value === props.minStep;
  const stepForwardDisabled = props.value === props.maxStep;

  return (
    <div className="StepInput">
      <button
        className="TapItem"
        onClick={props.stepBack}
        disabled={stepBackDisabled}
      >
        <Icon name="remove" color="var(--text)" size={24} />
      </button>
      <span style={{ width: "44px", opacity: "0.8" }}>{props.value}</span>
      <button
        className="TapItem"
        onClick={props.stepForward}
        disabled={stepForwardDisabled}
      >
        <Icon name="add" color="var(--text)" size={24} />
      </button>
    </div>
  );
};
