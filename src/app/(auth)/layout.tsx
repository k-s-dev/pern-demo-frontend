import AppShell from "@/lib/ui/components/layout/01/AppShell";
import Navbar from "@/lib/ui/components/nav/Navbar";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell nav={<Navbar />}>
      <Layout03>{children}</Layout03>
    </AppShell>
  );
}
