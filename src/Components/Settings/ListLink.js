import React from "react";
import { TableCell } from "../TableCell/TableCell";
import { Icon } from "../Icons/Icons";

export const ListLink = ({ url, ...props }) => (
  <TableCell>
    <a className="Header" target="_blank" rel="noreferrer noopener" href={url}>
      {props.children}
      <Icon name="next" color="var(--icon)" size="var(--icon-size)" />
    </a>
  </TableCell>
);
