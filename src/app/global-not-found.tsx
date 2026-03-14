"use client";

import HtmlLayout from "@/lib/ui/components/layout/HtmlLayout";
import NotFound404 from "@/lib/ui/components/errors/NotFound404";

export default function GlobalNotFound() {
  return (
    <HtmlLayout>
      <NotFound404 />
    </HtmlLayout>
  );
}
