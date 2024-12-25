import { useAtom } from "jotai";
import { global_session } from "~/store";
import Button from "../Editor/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";

const Hamburger = () => {
  const session = useAtom(global_session)[0];
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  return session ? (
    <>
      <div className="relative">
        <div className="w-10 h-10">
          <Button
            active={true}
            onClick={() => {
              setMenu((st) => !st);
            }}
          >
            {menu ? <FaTimes size={50} /> : <GiHamburgerMenu size={50} />}
          </Button>
        </div>
      </div>
      <div
        className={`z-20 grid grid-rows-12 col-span-12 row-span-8 w-full absolute bottom-0 left-0 bg-gray-950 p-2 gap-2 h-[90%] duration-500 ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          active={true}
          onClick={() => {
            setMenu(false);
            navigate("/create");
          }}
        >
          Create
        </Button>
        <Button active={true} onClick={() => {}}>
          Manage User
        </Button>
        <Button active={true} onClick={() => {}}>
          Logout
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Hamburger;
