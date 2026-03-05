import { betterFetch } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import { Text } from "@mantine/core";

export default async function Page() {
  const response = await betterFetch("next-demo/api/test-auth", {
    headers: await prepareHeaders(),
  });

  return (
    <>
      <Text component="pre">{JSON.stringify(response, null, 2)}</Text>
    </>
  );
}
