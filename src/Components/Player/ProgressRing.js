import React from "react";
import "./ProgressRing.css";

export const ProgressRing = ({ radius, stroke, progress, strokeColor }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};
