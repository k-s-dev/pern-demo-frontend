import Intro from "@/features/org/lib/ui/components/homePage/Intro";
import styles from "./page.module.scss";
import Features from "@/features/org/lib/ui/components/homePage/Features";

export default function Page() {
  return (
    <main className={styles.main}>
      <Intro />
      <Features />
    </main>
  );
}
