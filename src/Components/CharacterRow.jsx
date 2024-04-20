import React from "react";
import LazyLoad from "react-lazy-load";

const CharacterRow = ({ data, category }) => {
  const results = data?.[category];
  return (
    <>
      <h1 className="capitalize text-white relative  mt-10 left-14 lg:left-28 font-bold w-64 font-body text-3xl">
        {category}
      </h1>
      <div className="grid gap-2 lg:gap-4 grid-cols-1 text-xs lg:text-sm lg:grid-cols-3 font-bold lg:pl-20 text-white font-body">
        {results.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 justify-between bg-gray-800"
          >
            <LazyLoad width={100}>
              <img
                key={index}
                className="h-[100px] w-[100px] lg:h-[180px] lg:w-[125px] object-cover object-center"
                src={item?.image}
                alt={item?.id}
                loading="lazy"
              ></img>
            </LazyLoad>

            <h1 className="mr-auto">{item?.name?.userPreferred}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterRow;
