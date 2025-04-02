import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import React, {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";

type ColorModeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem(
    "colorMode",
  ) as ThemeMode;
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference: ThemeMode = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState<ThemeMode>(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        //@ts-ignore
        theme={{
          ...RefineThemes.Orange,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
