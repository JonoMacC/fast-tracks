import React from "react";
import { IconContext } from "react-icons";
import {
  MdPlayArrow,
  MdPause,
  MdCancel,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdBrightnessMedium,
  MdDone,
  MdClear,
  MdExpandMore,
  MdSkipNext,
  MdAlbum,
  MdAccountCircle,
  MdQueueMusic,
  MdSave,
  MdSettings,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

function getIcon(name) {
  switch (name) {
    case "play":
      return <MdPlayArrow />;
    case "pause":
      return <MdPause />;
    case "cancel":
      return <MdCancel />;
    case "add":
      return <MdAddCircleOutline />;
    case "remove":
      return <MdRemoveCircleOutline />;
    case "dark-mode":
      return <MdBrightnessMedium />;
    case "add-track":
      return <MdDone />;
    case "discard":
      return <MdClear />;
    case "dropdown":
      return <MdExpandMore />;
    case "get-tracks":
      return <MdSkipNext />;
    case "profile":
      return <MdAccountCircle />;
    case "album":
      return <MdAlbum />;
    case "playlist":
      return <MdQueueMusic />;
    case "save":
      return <MdSave />;
    case "settings":
      return <MdSettings />;
    case "next":
      return <MdKeyboardArrowRight />;
    case "back":
      return <MdKeyboardArrowLeft />;
    case "expand":
      return <MdKeyboardArrowDown />;
    case "collapse":
      return <MdKeyboardArrowUp />;
    default:
      return null;
  }
}

export const Icon = (props) => {
  const { name, color, size } = props;
  return (
    <IconContext.Provider
      value={{
        color: color,
        style: { width: size, height: size },
      }}
    >
      {getIcon(name)}
    </IconContext.Provider>
  );
};
