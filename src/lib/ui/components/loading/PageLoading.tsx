import { ReactNode } from "react";
import Layout03 from "../layout/01/03/Layout03";
import Spinner from "./Spinner";
import { Flex } from "@mantine/core";

export default function PageLoading({ children }: { children?: ReactNode }) {
  return (
    <Layout03>
      <Flex justify="center" align="center" my={"25vh"}>
        {children}
        <Spinner />
      </Flex>
    </Layout03>
  );
}
