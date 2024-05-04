import React from "react";
import LazyLoad from "react-lazy-load";

const AnimeRow = ({ data, showType = false }) => {
  return (
    <>
      <div className="pr-1 hover:transition-all hover:scale-[1.09] relative inline-block rounded-lg overflow-hidden cursor-pointer m-2 ">
        <LazyLoad threshold={0.95}>
          <img
            className="h-[185px] w-[135px] lg:h-[265px] lg:w-[185px]  block object-cover object-center "
            src={data?.image}
            alt={data.id}
            loading="lazy"
          />
        </LazyLoad>

        {!showType && (
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
            <p className="white-space-normal text-xs lg:text-sm font-bold font-body flex justify-center items-center h-full w-full text-ellipsis text-wrap text-center ">
              {data?.title?.romaji}
            </p>
          </div>
        )}

        {showType && (
          <div className="text-white">
            <p>{data?.relationType}</p>
            <p className="text-wrap">{data?.title?.romaji}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AnimeRow;
