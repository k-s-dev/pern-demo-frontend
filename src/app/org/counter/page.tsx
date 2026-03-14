import AddCounter from "@/features/org/counter/AddCounter";
import { CountersProvider } from "@/features/org/counter/CountersContext";
import LoadedCounters from "@/features/org/counter/LoadedCounters";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";
import { Flex, Text, Title } from "@mantine/core";

export default function page() {
  return (
    <Layout03>
      <CountersProvider>
        <Flex
          direction="column"
          gap={"md"}
          mx="auto"
          px={"xs"}
          pb={"xl"}
          mb={"xl"}
          maw={1000}
        >
          <header>
            <h1>Counter</h1>
            <Text mb={"lg"} fz={"h2"} c={"gray"}>
              A simple counter to keep track of [ anything ]
            </Text>
          </header>
          <Title order={2}>Add Counter</Title>
          <AddCounter />
          <Title order={2}>Loaded Counters</Title>
          <LoadedCounters />
        </Flex>
      </CountersProvider>
    </Layout03>
  );
}
