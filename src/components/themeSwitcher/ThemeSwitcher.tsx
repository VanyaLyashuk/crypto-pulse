import { useEffect, useState } from "react";
import { TTheme } from "../../models";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<TTheme>(() => {
    return (localStorage.getItem("theme") as TTheme) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.querySelector("html");
    html?.classList.remove("dark", "light");
    html?.classList.add(theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="" onClick={changeTheme}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeSwitcher;
