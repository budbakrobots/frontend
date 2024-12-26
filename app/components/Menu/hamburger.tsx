import { useAtom } from "jotai";
import { global_session, global_supabase } from "~/store";
import Button from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";

const Hamburger = () => {
  const [session, setSession] = useAtom(global_session);
  const supabase = useAtom(global_supabase)[0];
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  return session ? (
    <>
      <div className="relative flex w-fit h-full items-center ">
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
        className={`z-20 shadow-2xl grid grid-rows-12 col-span-12 row-span-8 w-full absolute bottom-0 left-0 bg-white bg-opacity-50 backdrop-blur-md dark:bg-black dark:bg-opacity-40 dark:backdrop-blur-sm p-2 gap-2 h-[90%] duration-500 sm:grid-rows-4 sm:h-52 sm:w-52 sm:bottom-auto sm:top-[10.5%] sm:rounded-lg sm:left-auto sm:right-2 ${
          menu
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
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
        <div className="row-start-12 sm:row-start-4">
          <Button
            active={true}
            onClick={async () => {
              if (!supabase) return;
              const { error } = await supabase.auth.signOut();
              setSession(null);
              if (error) {
                console.error("Error signing out:", error);
              }
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Hamburger;
