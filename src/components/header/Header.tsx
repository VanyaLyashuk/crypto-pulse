import Logo from "../logo/Logo";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <div className="container flex items-center justify-between">
      <Logo />
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
