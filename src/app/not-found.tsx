"use client";

import styles from "./not-found.module.scss";
import { useRouter } from "next/navigation";
import { Blockquote } from "@mantine/core";
import HtmlLayout from "@/lib/ui/components/layout/HtmlLayout";

export default function NotFound() {
  const router = useRouter();

  return (
    <HtmlLayout>
      <section className={styles.rootContainer}>
        <Blockquote color="orange">
          <b>Page</b>/<b>Resource</b> you were looking for, was <b>not found</b>
          .
        </Blockquote>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
      </section>
    </HtmlLayout>
  );
}
