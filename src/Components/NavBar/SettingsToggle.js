import React from "react";

import { Icon } from "../Icons/Icons";

export const SettingsToggle = ({ isVisible, onToggle }) => {
  return (
    <button className="TapItem" onClick={onToggle}>
      <Icon
        name="profile"
        size="var(--icon-size)"
        color={isVisible ? "var(--brand-primary)" : "var(--icon)"}
      />
    </button>
  );
};
