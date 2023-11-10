"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import GlobalNavBar from "./gnb";
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const LayoutThemeProvider = ({ children }: { children: any }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const handleToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDarkMode((val) => {
      document.documentElement.setAttribute(
        "data-theme",
        val ? "light" : "dark"
      );
      localStorage.setItem("theme", val ? "light" : "dark");

      return !val;
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    } else {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(matchMedia.matches);
      document.documentElement.setAttribute(
        "data-theme",
        matchMedia.matches ? "dark" : "light"
      );
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalNavBar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      {children}
    </ThemeProvider>
  );
};

export default LayoutThemeProvider;
