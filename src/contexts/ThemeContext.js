import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(["", () => {}]);

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");

  const setAppTheme = (theme) => {
    setTheme(theme);
    theme === "light"
      ? (document.body.style = "background: #ffffff")
      : (document.body.style = "background: #111111");
  };

  // toggle the current theme
  const toggleTheme = () => {
    theme === "light" ? setAppTheme("dark") : setAppTheme("light");
  };

  // on component mount, set the theme to what is found in local storage
  // if no theme is found in storage, set the theme based on the
  // user's OS preference
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme
      ? setAppTheme(localTheme)
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? setAppTheme("dark")
      : setAppTheme("light");
  }, []);

  // when theme changes, update the local storage
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
