import Logo from "./logo";
import { Link } from "@remix-run/react";
import Hamburger from "./hamburger";
import { useAtom } from "jotai";
import { global_session } from "~/store";

const Menu = () => {
  const session = useAtom(global_session)[0];
  return (
    <nav
      className={` w-full flex items-center  p-2 row-span-1 col-span-12 ${
        session ? "justify-between" : "justify-center"
      }`}
    >
      <Link to="/">
        <p className="w-28 [&>svg]:w-full">
          <Logo />
        </p>
      </Link>
      <Hamburger />
    </nav>
  );
};

export default Menu;
