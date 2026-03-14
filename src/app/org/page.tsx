import Intro from "@/features/org/components/homePage/Intro";
import Features from "@/features/org/components/homePage/Features";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      <Intro />
      <Features />
    </main>
  );
}
