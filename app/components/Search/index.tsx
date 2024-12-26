import { useAtom } from "jotai";
import React from "react";
import { global_search } from "~/store";
import Button from "../Editor/button";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useAtom(global_search);
  return (
    <>
      <div className="col-span-12 row-span-1 grid grid-cols-7 grid-rows-1 p-1 gap-2  bg-white bg-opacity-70 sm:rounded-lg ">
        <input
          className="col-span-6 p-2 bg-transparent "
          value={search}
          placeholder="search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="col-span-1">
          <Button onClick={() => {}} active={true}>
            <FaSearch size={0} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Search;
