import { TableCell } from "./TableCell";
import { Icon } from "../Icons";

export const ListItemLink = ({ url, ...props }) => (
  <TableCell>
    <a className="Header" target="_blank" rel="noreferrer noopener" href={url}>
      {props.children}
      <Icon name="next" color="var(--icon)" size="var(--icon-size)" />
    </a>
  </TableCell>
);
