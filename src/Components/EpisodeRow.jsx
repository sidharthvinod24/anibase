import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFetchEpisodesByID } from "../Hooks/episodesById";
import Loading from "./Loading";
import NotFoundPage from "../pages/NotFoundPage";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const EpisodeRow = ({ id, data, status }) => {
  if (status === "pending") {
    return (
      <>
        <span className=" ml-[50%] size-16 loading loading-spinner loading-lg"></span>
      </>
    );
  }

  if (status === "error" || !data || data.error) {
    return <NotFoundPage />;
  }

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data ? data.slice(startIndex, endIndex) : [];

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:mx-32 mx-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        {currentItems?.map((episode) => (
          <div
            key={episode?.id}
            className="card w-45 bg-base-100 shadow-xl hover:outline outline-4 outline-offset-2 "
          >
            <figure>
              <img
                className="w-[100%] h-[125px] object-cover"
                loading="lazy"
                src={episode?.image}
                alt={`Episode ${episode?.number} Image`}
              />
            </figure>
            <div className="card-body p-0">
              <div className="card-title font-body text-sm text-white font-bold text-wrap">
                {episode?.title || `Episode ${episode?.number}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        className="list-none flex justify-center items-center mb-[5rem] mt-10 text-xl gap-[5px]"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(selectedPage) => handlePageClick(selectedPage.selected)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        pageLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white"
        previousLinkClassName={
          currentPage === 0
            ? "disabled py-[8px] px-[15px] cursor pointer-events-none opacity-50"
            : "py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white"
        }
        nextClassName={
          currentPage === pageCount - 1
            ? "disabled py-[8px] px-[15px] cursor pointer-events-none opacity-50"
            : "py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white"
        }
        activeLinkClassName="active bg-sky-500"
      />
    </>
  );
};

export default EpisodeRow;
