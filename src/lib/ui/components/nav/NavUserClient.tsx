"use client";

import SignInLinkButton from "@/features/auth/features/signIn/SignInLinkButton";
import SignOut from "@/features/auth/features/signOut/SignOut";
import SignUpLinkButton from "@/features/auth/features/signUp/SignUpLinkButton";
import UserAvatar from "@/features/auth/lib/ui/components/UserAvatar";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";
import { routes } from "@/lib/routes";
import { Flex, Menu, MenuDropdown, MenuItem, MenuTarget } from "@mantine/core";
import Link from "next/link";
import { useSessionContext } from "../providers/SessionProvider";
import { use } from "react";

export default function NavUserClient() {
  const sessionCtx = useSessionContext();

  if (!sessionCtx.sessionDataPromise) {
    return (
      <Flex gap={"xs"} justify={"space-between"} wrap={"wrap"}>
        <SignInLinkButton />
        <SignUpLinkButton />
      </Flex>
    );
  }

  const sessionData = use(sessionCtx.sessionDataPromise);

  if (!sessionData) {
    return (
      <Flex gap={"xs"} justify={"space-between"} wrap={"wrap"}>
        <SignInLinkButton />
        <SignUpLinkButton />
      </Flex>
    );
  }

  return <NavUserAvatar sessionData={sessionData} />;
}

export function NavUserAvatar({ sessionData }: { sessionData: TSessionData }) {
  const user = sessionData.user;

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
