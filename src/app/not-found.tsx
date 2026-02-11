import NotFound404 from "@/lib/ui/components/errors/NotFound404";
import HtmlLayout from "@/lib/ui/components/layout/HtmlLayout";

export default async function NotFound() {
  return (
    <HtmlLayout>
      <NotFound404 />
    </HtmlLayout>
  );
}
