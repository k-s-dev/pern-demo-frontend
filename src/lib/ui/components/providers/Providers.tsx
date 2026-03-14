"use client";

import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../../mantine.theme";
import { Suspense } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
    </Suspense>
  );
}
