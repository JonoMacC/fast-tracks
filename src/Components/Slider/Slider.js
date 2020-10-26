import React from "react";
import { motion } from "framer-motion";

import "./Slider.css";

export const Slider = (props) => {
  // props.setValue.length;
  return (
    <div className="SliderContainer TableCell">
      <div className="Slider">
        <div className="SliderFill"></div>
      </div>
      <button className="ThumbControl">
        <div className="Thumb"></div>
      </button>
    </div>
  );
};
