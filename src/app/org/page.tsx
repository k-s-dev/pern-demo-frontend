import Intro from "@/features/org/lib/ui/components/homePage/Intro";
import Features from "@/features/org/lib/ui/components/homePage/Features";
import { Flex } from "@mantine/core";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";

export default function Page() {
  return (
    <Layout03>
      <Flex direction="column" align="center" gap="md">
        <Intro />
        <Features />
      </Flex>
    </Layout03>
  );
}
