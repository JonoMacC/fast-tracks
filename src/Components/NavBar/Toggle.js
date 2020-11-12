import React from "react";

export const Toggle = ({ state, onToggle, ...props }) => (
  <button className="TapItem" onClick={onToggle}>
    {props.children}
  </button>
);
