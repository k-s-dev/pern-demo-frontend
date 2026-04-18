"use client";

import { NavLink, Text } from "@mantine/core";
import { useState } from "react";

export default function SidebarNavLinks() {
  const [active, setActive] = useState("");

  return (
    <>
      <NavLink
        component="div"
        color="blue"
        label={
          <a
            href={`#${links[0]}`}
            onClick={(e) => {
              setActive(links[0]);
              e.stopPropagation();
            }}
          >
            <Text component="span" fz={"h3"}>
              {`${links[0][0].toUpperCase()}${links[0].slice(1)}`}
            </Text>
          </a>
        }
        active={active === links[0]}
        onClick={() => setActive(links[0])}
        defaultOpened
      >
        {links.slice(1).map((link, idx) => (
          <NavLink
            key={idx}
            color="blue"
            href={`#${link}`}
            label={
              <Text component="span" fz={"h4"}>
                {`${link[0].toUpperCase()}${link.slice(1)}`}
              </Text>
            }
            active={active === link}
            onClick={() => setActive(link)}
          />
        ))}
      </NavLink>
    </>
  );
}

const links = ["workspace", "categories", "priorities", "statuses"];
