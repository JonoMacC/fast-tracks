export const Toggle = ({ state, onToggle, ...props }) => (
  <button className="TapItem" onClick={onToggle} aria-label={props.name}>
    {props.children}
  </button>
);
