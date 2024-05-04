import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InfoRow from "./InfoRow";

const Scroll = ({ results, hasNextPage, fetchNextPage }) => {
  return (
    <>
      <InfiniteScroll
        dataLength={results ? results.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <>
            <span className=" ml-[50%] size-16 loading loading-spinner loading-lg"></span>
          </>
        }
      >
        <div className="">
          <InfoRow data={results} category="Results" search={true} />
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Scroll;
