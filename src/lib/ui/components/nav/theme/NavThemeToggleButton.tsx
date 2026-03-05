"use client";

import styles from "./NavThemeToggle.module.scss";
import { PiMoonFill, PiSun } from "react-icons/pi";
import {
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  useMantineColorScheme,
} from "@mantine/core";
import { useEffect } from "react";
import { setThemeCookieAction } from "./setThemeCookie";

export default function NavThemeToggleButton({
  themeName,
}: {
  themeName: TThemes;
}) {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    setColorScheme(themeName);
  }, [setColorScheme, themeName]);

  async function handleClick(themeName: TThemes) {
    document.documentElement.setAttribute("data-theme", themeName);
    setColorScheme(themeName);
    await setThemeCookieAction(themeName, true);
  }

  const theme = themes.find((t) => t.name === themeName) || themes[0];

  return (
    <Menu trigger="click-hover">
      <MenuTarget>
        <span className={styles.triggerIcon}>{theme.icon}</span>
      </MenuTarget>
      <MenuDropdown>
        {themes.map((value) => {
          return (
            <MenuItem
              key={value.name}
              leftSection={value.icon}
              onClick={() => handleClick(value.name)}
            >
              <span className={styles.name}>{value.name}</span>
            </MenuItem>
          );
        })}
      </MenuDropdown>
    </Menu>
  );
}

const themes: IThemeToggle[] = [
  {
    name: "light",
    icon: <PiSun />,
  },
  {
    name: "dark",
    icon: <PiMoonFill />,
  },
];

export const THEMES = ["light", "dark"] as const;
export type TThemes = (typeof THEMES)[number];
export interface IThemeToggle {
  name: TThemes;
  icon: React.ReactNode;
}
