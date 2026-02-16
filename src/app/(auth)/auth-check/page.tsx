import { authEndpoints } from "@/features/auth/lib/authEndpoints";
import { authFetch } from "@/lib/data/fetchFactory";

export default async function page() {
  const response = await authFetch(authEndpoints["/ok"]);
  console.log(response);

  return <div>{JSON.stringify(response)}</div>;
}
