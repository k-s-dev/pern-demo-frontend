import Timers from "@/features/org/timer/Timers";
import { TimersProvider } from "@/features/org/timer/TimersContext";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";
import { Flex } from "@mantine/core";

export default function page() {
  return (
    <Layout03>
      <TimersProvider>
        <Flex direction="column" px={"xs"} mx="auto" maw={1000}>
          <h1>Timer</h1>
          <Timers />
        </Flex>
      </TimersProvider>
    </Layout03>
  );
}
