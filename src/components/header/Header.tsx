import Logo from "../logo/Logo";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full py-3 shadow-sm bg-primary-bg dark:shadow-md">
      <div className="container flex items-center justify-between">
        <Logo />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
