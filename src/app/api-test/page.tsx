import AppShell from "@/lib/ui/components/layout/01/AppShell";
import styles from "./page.module.scss";
import Navbar from "@/lib/ui/components/nav/Navbar";
import { Text } from "@mantine/core";
import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { authEndpoints } from "@/features/auth/lib/authEndpoints";
import { prepareHeaders } from "@/lib/data/utils";

export default async function Page() {
  const response = await betterAuthFetch(authEndpoints["/list-accounts"], {
    headers: await prepareHeaders(),
  });

  return (
    <AppShell nav={<Navbar />}>
      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h1>Api Test</h1>
        </header>
        <Text size="md">{JSON.stringify(response)}</Text>
      </main>
    </AppShell>
  );
}
