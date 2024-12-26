import Logo from "./logo";
import { Link } from "@remix-run/react";
import Hamburger from "./hamburger";
import { useAtom } from "jotai";
import { global_session } from "~/store";
import Search from "../Search";

const Menu = () => {
  const session = useAtom(global_session)[0];
  return (
    <>
      <div
        className={`absolute top-0 left-0 backdrop-blur-sm w-full h-[10%] `}
      ></div>
      <nav
        className={` z-10 w-full flex items-center   p-2 px-8 row-span-1 col-span-12 justify-center    sm:justify-between ${
          session && "justify-between"
        }`}
      >
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden col-span-12 row-span-1 sm:grid grid-rows-1 grid-cols-12">
            <Search />
          </div>
          <Hamburger />
        </div>
      </nav>
    </>
  );
};

export default Menu;
