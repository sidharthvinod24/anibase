import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const EpisodeRow = ({ data }) => {
  const episodes = data?.episodes;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = episodes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(episodes.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % episodes.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="text-white">
        {currentItems.map((page, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 rounded-md ml-[10%] w-[85%] bg-slate-700 mt-2 text-white p-5"
          >
            <h1>{page?.number}</h1>
            <h1>{page?.title}</h1>
            <h1 className="ml-auto">N</h1>
          </div>
        ))}
        <ReactPaginate
          className="list-none flex justify-center items-center mb-[5rem] text-xl gap-[5px]  "
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPage} // Control the current page
          pageLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white "
          previousLinkClassName={
            currentPage === 0
              ? "disabled py-[8px] px-[15px] cursor pointer-events-none	opacity-50"
              : "py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white"
          }
          nextClassName={
            currentPage === pageCount - 1
              ? "disabled py-[8px] px-[15px] cursor pointer-events-none	opacity-50"
              : "py-[8px] px-[15px] cursor-pointer rounded-sm font-normal hover:bg-sky-500 hover:text-white"
          }
          activeLinkClassName="active bg-sky-500 "
        />
        {/* <div className="text-white w-full">
          Showing {itemOffSet} to {endOffSet} of {episodes.length} results
        </div> */}
      </div>
    </>
  );
};

export default EpisodeRow;
