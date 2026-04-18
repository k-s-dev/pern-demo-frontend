import { Text } from "@mantine/core";
import { ReactNode } from "react";

export function HeaderCell({ children }: { children: ReactNode }) {
  return (
    <Text component="span" fz={"xl"} fw={"bold"} c={"gray"}>
      {children}
    </Text>
  );
}
