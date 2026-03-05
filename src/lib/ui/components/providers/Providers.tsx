"use client";

import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../../mantine.theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={mantineTheme}>{children}</MantineProvider>;
}
