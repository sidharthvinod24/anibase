import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useFetchSearch } from "../Hooks/search";
import useDebounce from "../Hooks/debounce";
const NavSearchBar = () => {
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 50);

  const { status, error, data } = useFetchSearch(debouncedSearchTerm);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current && searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className=" relative flex flex-col">
        <label className="input input-bordered flex  items-center gap-2">
          <input
            ref={searchInputRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow w-15 lg:w-auto xl:w-96"
            placeholder="Search"
          />
          <kbd className="hidden lg:block kbd kbd-sm ">ctrl</kbd>
          <kbd className="hidden lg:block kbd kbd-sm">k</kbd>
        </label>
        {data && data.length > 0 ? (
          <div className=" absolute z-10 top-12 w-full bg-base-300 text-white shadow-lg max-h-70 overflow-y-scroll rounded-md">
            {status === "pending" && (
              <div className="text-white">Loading....</div>
            )}
            {data.map((item) => (
              <div
                key={item?.id}
                className="px-4 py-2 flex mt-5 flex-row hover:bg-gray-700"
              >
                <img src={item?.image} className="w-[60px] h-[82.3px]"></img>
                <p className="ml-2 font-body">{item?.title?.romaji}</p>
              </div>
            ))}
          </div>
        ) : (
          debouncedSearchTerm &&
          search && (
            <div className="absolute z-10 top-12 w-full bg-base-300 text-white shadow-lg max-h-70 overflow-y-auto">
              No result found
            </div>
          )
        )}
      </div>
    </>
  );
};

export default NavSearchBar;
