import AppShell from "@/lib/ui/components/layout/01/AppShell";
import styles from "./page.module.scss";
import Navbar from "@/lib/ui/components/nav/Navbar";
import { fetchBaseApiGet } from "@/lib/data/fetchConfig";
import { Text } from "@mantine/core";

export default async function Page() {
  const data = await fetchBaseApiGet({
    endpoint: "/next-demo/api/auth/list-accounts",
  });

  return (
    <AppShell nav={<Navbar />}>
      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h1>Api Test</h1>
        </header>
        <Text size="md">{JSON.stringify(data)}</Text>
      </main>
    </AppShell>
  );
}
