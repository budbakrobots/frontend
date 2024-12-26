import { useAtom } from "jotai";
import React, { useRef } from "react";
import { global_search } from "~/store";
import Button from "../button";
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useAtom(global_search);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      import Button from "./button";
      <div className="col-span-12 row-span-1 grid grid-cols-7 grid-rows-1 p-1 px-4 sm:px-1 gap-2  bg-white bg-opacity-10 backdrop-blur-md">
        <input
          ref={inputRef}
          className="col-span-6 p-2 bg-transparent "
          value={search}
          placeholder="search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="col-span-1">
          <Button
            onClick={() => {
              if (search) {
                setSearch("");
              } else {
                inputRef.current?.focus();
              }
            }}
            active={true}
            icon={true}
          >
            {search ? <FaTimes /> : <FaSearch size={0} />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Search;
