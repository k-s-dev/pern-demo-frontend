"use client";

import SignInLinkButton from "@/features/auth/features/signIn/SignInLinkButton";
import SignOut from "@/features/auth/features/signOut/SignOut";
import SignUpLinkButton from "@/features/auth/features/signUp/SignUpLinkButton";
import { authClient } from "@/features/auth/lib/auth.client";
import UserAvatar from "@/features/auth/lib/ui/components/UserAvatar";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";
import { routes } from "@/lib/routes";
import { Flex, Menu, MenuDropdown, MenuItem, MenuTarget } from "@mantine/core";
import Link from "next/link";

export default function NavUser() {
  const sessionCtx = authClient.useSession();

  if (!sessionCtx.data) {
    return (
      <Flex gap={"xs"} justify={"space-between"} wrap={"wrap"}>
        <SignInLinkButton />
        <SignUpLinkButton />
      </Flex>
    );
  }

  return <NavUserAvatar session={sessionCtx.data} />;
}

export function NavUserAvatar({ session }: { session: TSessionData }) {
  const user = session.user;

  return (
    <>
      <Menu trigger="click-hover" shadow="md">
        <MenuTarget>
          {/* div needed for click/hover trigger to work */}
          <div data-test-cy="nav-user-avatar">
            <UserAvatar src={user?.image || undefined} userName={user?.name} />
          </div>
        </MenuTarget>
        <MenuDropdown mx="md">
          <MenuItem component={Link} href={routes.auth.profile} fz={"xl"}>
            Profile
          </MenuItem>
          <MenuItem fz="lg" color="red">
            <SignOut>Sign Out</SignOut>
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </>
  );
}
