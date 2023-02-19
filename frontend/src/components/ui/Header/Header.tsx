import { useEffect, useState } from "react";
import HeaderItem from "./HeaderItem";
import MobileHeaderItem from "./MobileHeaderItem";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

export type Props = {};

const Header = ({}: Props) => {
  const [navOpen, setNavOpen] = useState(false);
  // const { isAuthenticated, user, signin, signout } = useAuth();

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [navOpen]);

  return (
    <nav className="flex relative z-20 bg-black text-white justify-between py-3 px-4 md:px-8 xl:px-24">
      <div className="text-3xl self-center">
        <Link to="/">
          <h1>{"Image Gest".toUpperCase()}</h1>
        </Link>
      </div>

      <div className="z-30 self-center">
        <div className="md:hidden">
          <Hamburger isOpen={navOpen} setIsOpen={setNavOpen} />
        </div>

        <div className="hidden md:flex space-x-5">
          <HeaderItem href="/">Galeria</HeaderItem>
          <HeaderItem href="/upload">Subir</HeaderItem>
          <HeaderItem href="/me">Perfil</HeaderItem>
        </div>
      </div>

      <div
        className={`${
          navOpen ? "-translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } py-5 top-0 right-0 bg-black h-screen absolute w-screen z-10 flex flex-col text-4xl justify-center px-7 space-y-10 transition-all ease-out duration-700`}>
        <div className="flex flex-col space-y-5">
          <MobileHeaderItem setNavOpen={setNavOpen} href="/">
            Images
          </MobileHeaderItem>
          <MobileHeaderItem setNavOpen={setNavOpen} href="/upload">
            Upload
          </MobileHeaderItem>
          <MobileHeaderItem setNavOpen={setNavOpen} href="/me">
            Profile
          </MobileHeaderItem>
        </div>

        {/* <MobileHeaderItem setNavOpen={setNavOpen} href="/auth/signup">
          Signup
        </MobileHeaderItem>
        <MobileHeaderItem setNavOpen={setNavOpen} href="/auth/signin">
          Signin
        </MobileHeaderItem> */}
      </div>
    </nav>
  );
};

export default Header;
