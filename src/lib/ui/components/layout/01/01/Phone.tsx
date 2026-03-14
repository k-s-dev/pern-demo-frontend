"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { useLayoutContext } from "./Layout";
import styles from "./Phone.module.scss";
import { Flex, Text } from "@mantine/core";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";

export function Phone({ children }: { children?: ReactNode }) {
  const state = useLayoutContext();

  return (
    <div className={clsx(styles.root)}>
      <section className={clsx(styles.sidebarsToggleContainer)}>
        <Flex justify={"space-between"}>
          <Text
            component={!state.left.isOpen ? FaAnglesDown : FaAnglesUp}
            c={"gray"}
            onClick={() => {
              state.left.toggle();
            }}
            className={clsx(styles.toggle)}
          />
        </Flex>
      </section>
      {children}
    </div>
  );
}

export function MainPhone({ children }: { children?: ReactNode }) {
  return <main className={clsx(styles.main)}>{children}</main>;
}

export function LeftPhone({ children }: { children?: ReactNode }) {
  const state = useLayoutContext();

  return (
    <aside className={clsx(styles.left, !state.left.isOpen && styles.hide)}>
      {children}
    </aside>
  );
}
