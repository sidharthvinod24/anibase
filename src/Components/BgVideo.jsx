import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { usefetchData } from "../Hooks/animesData";
import Iframe from "./Iframe";
import { Link } from "react-router-dom";
const BgVideo = ({ qKey, fetchUrl }) => {
  // const [error, setError] = useState(false);

  console.log();
  const { status, error, data } = usefetchData(fetchUrl, qKey);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :( </p>;

  let filteredData = data.filter((anime) => anime?.trailer?.id !== null);
  const anime = filteredData[Math.floor(Math.random() * filteredData.length)];

  console.log(anime);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <>
      <div className="overflow-hidden relative h-[90vw] lg:h-[45vw]">
        <Iframe anime={anime} className="" />
        <div className="absolute bottom-[5%] lg:top-[40%] lg:bottom-[50%] ml-4 lg:ml-12 font-body">
          <p className="text-white text-2xl lg:text-[34px] h-full lg:w-full font-bold drop-shadow-xl">
            {anime?.title?.romaji?.length > 50
              ? anime?.title?.english
              : anime?.title?.romaji}
          </p>
          <p className="text-white text-xl lg:text-xl mt-3 lg:mt-4  lg:w-[70%] drop-shadow-xl ">
            {truncateString(
              anime?.description?.replace(/<br>|<i>|<\/i>/g, ""),
              200
            )}
          </p>
          <div className="flex flex-row items-center mt-1 md:mt-4 ">
            <div className="bg-white text-white bg-opacity-30 rounded-md py-2 lg:py-2 px-2 lg:px-4 w-auto text-xs lg:text-lg font-bold hover:bg-opacity-20 transition">
              <Link to={`/anime/${anime?.id}`}>
                <button>Watch Now</button>
              </Link>
            </div>
          </div>
        </div>
        <img
          className="absolute left-[76%] bottom-10 h-2/3 hidden lg:block"
          src={anime?.image}
        ></img>
      </div>
    </>
  );
};

export default BgVideo;
