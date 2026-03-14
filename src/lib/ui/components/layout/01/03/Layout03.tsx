"use client";

import { Box } from "@mantine/core";
import { ReactNode } from "react";

/**
 * Generic container for main section with responsive width for phone and
 * phone-up screens.
 */
export default function Layout03({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      h={"100%"}
      pb={"xl"}
      style={{ overflow: "auto" }}
      mx={"auto"}
    >
      {children}
    </Box>
  );
}
