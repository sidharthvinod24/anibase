import React from "react";
import AnimeRow from "./AnimeRow";
import { Link } from "react-router-dom";
import CharacterRow from "./CharacterRow";

const InfoRow = ({ data, category }) => {
  const results = data?.[category];
  console.log(results);

  return (
    <>
      {results && results.length > 0 && (
        <>
          <h1 className="capitalize text-white relative  mt-10 left-5 lg:left-28 font-bold w-64 font-body text-xl lg:text-3xl">
            {category}
          </h1>
          <div className="grid lg:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 ml-5 lg:pl-20">
            {results.map((item, index) => (
              <React.Fragment key={index}>
                {item?.type === "MANGA" ||
                item?.type === "ONE_SHOT" ||
                item?.type === "NOVEL" ? (
                  <Link to={`/manga/${item.id}`}>
                    <AnimeRow data={item} showType={true} />
                  </Link>
                ) : (
                  <Link to={`/anime/${item.id}`}>
                    <AnimeRow data={item} showType={true} />
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default InfoRow;
