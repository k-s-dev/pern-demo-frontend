"use client";

import { Box, Checkbox, CheckboxProps } from "@mantine/core";
import styles from "../Table.module.scss";
import { HeaderCell } from "../generic/HeaderCell";
import { columnWidths } from "../definitions";

export function ColumnHeaderRow({
  toggleAllAction,
  ...checkboxProps
}: {
  toggleAllAction: () => void;
} & CheckboxProps) {
  return (
    <Box
      className={styles.headerContainer}
      style={{ gridTemplateColumns: columnWidths }}
    >
      <HeaderCell>
        <Checkbox onClick={toggleAllAction} {...checkboxProps} />
      </HeaderCell>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>{""}</HeaderCell>
      <HeaderCell>{""}</HeaderCell>
      <HeaderCell>{""}</HeaderCell>
      <HeaderCell>{""}</HeaderCell>
    </Box>
  );
}
