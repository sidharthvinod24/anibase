import React from "react";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";

const CharacterRow = ({ data, category, indicator }) => {
  const results = data?.[category] || [];
  const voiceActor = (item) => {
    const japaneseActors = item?.voiceActors.filter(
      (actor) => actor.language === "Japanese"
    );
    if (japaneseActors.length > 0) {
      const actor = japaneseActors[0]; // Selects the first Japanese voice actor
      return (
        // <div className="flex items-center">
        <>
          <div className="flex flex-col text-right">
            <h1 className="text-base">{actor?.name?.userPreferred}</h1>
            <h1 className="mt-auto text-base">{actor?.language}</h1>
          </div>
          <LazyLoad>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={`https://anilist.co/staff/${actor?.id}`}
            >
              <img
                className="w-[60px] h-[82.3px] lg:h-[180px] lg:w-[125px] object-cover object-center mb-2 hover:opacity-50 "
                src={actor?.image}
                alt={actor?.id}
                loading="lazy"
              />
            </Link>
          </LazyLoad>
        </>

        // </div>
      );
    }
    return null; // Return null if no Japanese actors found
  };

  return (
    <>
      <h1 className="capitalize text-white relative mt-10 left-5 lg:left-28 font-bold w-64 font-body text-3xl">
        {category}
      </h1>
      <div className="grid gap-2 lg:gap-4 grid-cols-1 text-xs lg:text-sm lg:grid-cols-3 mt-1 font-bold lg:pl-20 ml-5 text-white font-body">
        {results.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 justify-between bg-gray-900"
          >
            <LazyLoad>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={`https://anilist.co/character/${item?.id}`}
              >
                <img
                  className="w-[60px] h-[82.3px] lg:h-[180px] lg:w-[125px] object-cover object-center hover:opacity-50"
                  src={item?.image}
                  alt={item?.id}
                  loading="lazy"
                />
              </Link>
            </LazyLoad>

            <div className="flex flex-col mr-auto">
              <h1 className="text-base">{item?.name?.userPreferred}</h1>
              <h1 className="mt-auto text-base">{item?.role}</h1>
            </div>
            {indicator === "anime" && voiceActor(item)}
          </div>
        ))}
      </div>
    </>
  );
};
export default CharacterRow;
