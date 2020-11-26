import { IconContext } from "react-icons";
import {
  MdPlayArrow,
  MdPause,
  MdCancel,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdBrightnessMedium,
  MdAccountCircle,
  MdQueueMusic,
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
    case "profile":
      return <MdAccountCircle />;
    case "playlist":
      return <MdQueueMusic />;
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
