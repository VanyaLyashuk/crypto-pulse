import { useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
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
      <button className="p-2 rounded-full shadow-md bg-primary-bg" onClick={changeTheme}>
        {theme === "dark" ? (
          <IoSunny className="w-5 h-5 text-primary-logo" />
        ) : (
          <MdOutlineDarkMode className="w-5 h-5" />
        )}
      </button>
  );
};

export default ThemeSwitcher;
