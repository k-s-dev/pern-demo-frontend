import { Text } from "@mantine/core";
import { Divider } from "@mantine/core";
import SignUpForm from "./form/Form";
import SignInLinkButton from "../signIn/SignInLinkButton";
import AuthCard from "../../lib/ui/components/AuthCard";
import AuthProviderIcons from "../../lib/ui/components/AuthProviderIcons";

export default function SignUpCard() {
  return (
    <AuthCard subTitle="Create an account">
      <SignUpForm />
      <Divider size="lg" label="Or sign in with other auth providers..." />
      <AuthProviderIcons />
      <Divider size="lg" label="Already have an account?" />
      <SignInLinkButton />
      <Text size="md" fs="italic" c="gray.6">
        *Using OAuth provider (e.g. GitHub or Google) automatically creates an
        account.
      </Text>
    </AuthCard>
  );
}
