import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useFetchSearch } from "../Hooks/search";
import useDebounce from "../Hooks/debounce";
import { FaSearch, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavSearchBar = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ANIME");
  const debouncedSearchTerm = useDebounce(search, 25);

  const { status, error, data } = useFetchSearch(debouncedSearchTerm, type);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();

        searchInputRef.current && searchInputRef.current.click();
        inputRef.current && inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col font-body">
        <button
          ref={searchInputRef}
          className="btn btn-ghost btn-circle"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <FaSearch />
        </button>
        <dialog ref={modalRef} id="my_modal_2" className="modal modal-top">
          <div className="modal-box bg-opacity-25 max-h-[100vh] ">
            <div className="flex flex-row justify-between">
              <p className="invisible lg:visible py-4    ">
                For Quick Access:
                <kbd className=" invisible lg:visible ml-1 kbd kbd-sm ">
                  ctrl
                </kbd>
                +<kbd className=" invisible lg:visible kbd kbd-sm"> k</kbd>
              </p>
              <select
                className="select  select-bordered"
                onClick={(e) => setType(e.target.value.toUpperCase())}
              >
                <option>Anime</option>
                <option>Manga</option>
              </select>
            </div>

            <div className="flex flex-row">
              <label
                ref={inputRef}
                className="input input-primary input-bordered flex w-full items-center"
              >
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="grow ml-5 "
                  placeholder="Search"
                />
              </label>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn ml-2">Cancel</button>
              </form>
            </div>

            {data && data.length > 0 ? (
              <div className=" w-full max-h-[300vh] bg-base-300 text-white shadow-lg mr-1 overflow-y-scroll rounded-md">
                {status === "pending" && (
                  <div className="text-white">Loading....</div>
                )}
                {data.map((item) => (
                  <>
                    <Link
                      to={`/${type}/${item.id}`}
                      onClick={() => modalRef.current.close()}
                    >
                      <div
                        key={item?.id}
                        className="px-4 py-2 flex mt-5 flex-row hover:bg-gray-700"
                      >
                        <img
                          src={item?.image}
                          fetchPriority="high"
                          loading="lazy"
                          className="w-[60px] h-[82.3px]"
                        ></img>
                        <div className="flex flex-col">
                          <p className="ml-2 font-body">
                            {item?.title?.romaji}
                          </p>
                          <div className=" flex flex-row font-body ml-2 gap-3">
                            <p>{item?.releaseDate}</p>
                            <p>{item?.type}</p>
                            {item?.rating && (
                              <p
                                className="font-bold"
                                style={{
                                  color: item?.rating > 50 ? "green" : "red",
                                }}
                              >
                                {item?.rating}%
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      modalRef.current.close();
                      navigate(
                        `/search/${type}?query=${debouncedSearchTerm}&year=${""}&season=${""}`
                      );
                      window.location.reload();
                    }}
                    className="btn btn-active btn-primary text-white"
                  >
                    All Results
                  </button>
                </div>
              </div>
            ) : (
              debouncedSearchTerm &&
              search && (
                <div className="absolute z-10  w-full bg-base-300 text-white shadow-lg max-h-70 overflow-y-auto">
                  No result found
                </div>
              )
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default NavSearchBar;
