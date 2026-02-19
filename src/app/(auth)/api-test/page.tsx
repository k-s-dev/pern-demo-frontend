import { TUser } from "@/features/auth/lib/definitions";
import { betterFetch } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/utils";
import { CardHeader } from "@/lib/ui/components/card";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";
import { Card, Center, Text } from "@mantine/core";
import { ReactNode } from "react";

export default async function page() {
  const response = await betterFetch<{ message: string; user: TUser }>(
    "next-demo/api/test-auth",
    {
      headers: await prepareHeaders(),
    },
  );

  if (response.error) {
    return (
      <Layout>
        <Text size="md">Unauthorized access.</Text>
      </Layout>
    );
  }
  return (
    <Layout>
      <Text component="pre" size="md" style={{ overflow: "auto" }}>
        {JSON.stringify(response, null, 2)}
      </Text>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <Layout03>
      <Center my="md">
        <Card withBorder shadow="md" w={{ base: "99%", sm: "50%" }}>
          <main>
            <header>
              <CardHeader>
                <h1>Api Test</h1>
              </CardHeader>
            </header>
            {children}
          </main>
        </Card>
      </Center>
    </Layout03>
  );
}
