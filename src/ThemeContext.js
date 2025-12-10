import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(!dark);

  const theme = {
    dark,
    background: dark ? "#121212" : "#F5F8F6",
    card: dark ? "#1E1E1E" : "white",
    text: dark ? "#f2f2f2" : "#1a1a1a",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
