import { useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import useThemeStore from "../../store/theme.store";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.remove("dark", "light");
    html?.classList.add(theme);
  }, [theme]);

  return (
    <button
      className="p-2 rounded-full shadow-md bg-primary-bg dark:shadow-md focus-visible-outline focus-visible-rounded"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <IoSunny className="w-5 h-5" />
      ) : (
        <MdOutlineDarkMode className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
