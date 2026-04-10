import { getSession } from "@/features/auth/lib/getSession";
import NavUserClient from "./NavUserClient";

export default async function NavUser() {
  const sessionData = await getSession();

  return <NavUserClient sessionData={sessionData} />;
}
