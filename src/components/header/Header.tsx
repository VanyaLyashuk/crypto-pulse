import Logo from "../logo/Logo";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="w-full py-3 mb-10 shadow-md">
      <div className="container flex items-center justify-between">
        <Logo />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
