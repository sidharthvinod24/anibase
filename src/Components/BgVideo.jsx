import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { usefetchData } from "../Hooks/animesData";
import Iframe from "./Iframe";
import { Link } from "react-router-dom";

const truncateString = (str, num) => {
  return str?.length > num ? str.slice(0, num) + "..." : str;
};

const BgVideo = ({ qKey, fetchUrl }) => {
  const { status, error, data } = usefetchData(fetchUrl, qKey);
  switch (status) {
    case "pending":
      return <p>Loading...</p>;
    case "error":
      return <p>Error :( </p>;
    default:
      break;
  }
  let filteredData = data.filter((anime) => anime?.trailer?.id !== null);
  const anime = filteredData[Math.floor(Math.random() * filteredData.length)];
  return (
    <>
      <div className="overflow-hidden relative h-[90vw] lg:h-[45vw]">
        <Iframe anime={anime} />
      </div>
      <div className="absolute bottom-[5%] lg:top-[40%] top-[12%] lg:bottom-[50%] text-white  mx-4 lg:mx-12 font-body">
        <div className="flex flex-col text-2xl lg:text-[45px] h-full lg:w-auto left-10 font-bold drop-shadow-xl">
          <p className="max-w-full lg:max-w-5xl">
            {anime?.title?.romaji?.length > 50
              ? anime?.title?.english
              : anime?.title?.romaji}
              Hi R
          </p>
          <div className="flex flex-row gap-5 mt-5">
            {anime?.rating && (
              <p className=" flex badge text-white font-body text-lg badge-lg badge-success ">
                {anime?.rating}%
              </p>
            )}
            {anime?.releaseDate && (
              <p className=" flex badge text-white font-body text-lg badge-lg badge-primary ">
                {anime?.releaseDate}
              </p>
            )}
            {anime?.status && (
              <p className=" flex badge text-white font-body text-lg badge-lg badge-primary ">
                {anime?.status}
              </p>
            )}
          </div>
          <p className="text-base lg:text-xl mt-3 lg:mt-4 max-w-full lg:w-[70%] drop-shadow-x">
            {truncateString(
              anime?.description?.replace(/<br>|<i>|<\/i>/g, ""),
              100
            )}
          </p>
          <div className="lg:mt-10 lg:-bottom-1/3 relative">
            <Link to={`/anime/${anime?.id}`}>
              <button className="btn btn-md glass text-white  text-sm md:text-base lg:text-lg ">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img
        className=" mask mask-squircle absolute left-[72%] -translate-y-[105%] h-3/4 hidden lg:block"
        src={anime?.image}
      ></img>
    </>
  );
};

export default BgVideo;
