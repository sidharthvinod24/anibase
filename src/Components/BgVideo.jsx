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
      <div className="overflow-hidden relative h-[100vh] md:h-[90vh] lg:h-[60vh] xl:h-[100vh] ">
        <Iframe anime={anime} indicator={false} />
      </div>
      <div className="absolute lg:top-[20%] xl:top-[65%] top-[65%] lg:bottom-[50%] text-white  mx-4 lg:mx-20 font-body">
        <div className=" flex flex-col text-[30px] lg:text-2xl xl:text-[45px] h-full lg:w-auto left-10 font-bold drop-shadow-xl">
          <h1 className="max-w-full  lg:max-w-2xl xl:max-w-6xl">
            {anime?.title?.romaji?.length > 30
              ? truncateString(anime?.title?.english, 30)
              : anime?.title?.romaji}
          </h1>
          <div className="flex flex-row gap-5 mt-5">
            {anime?.rating && (
              <p
                className={`flex badge text-white font-body  lg:text-sm xl:text-lg badge-lg ${
                  anime?.rating > 50 ? "badge-success" : "badge-error"
                }`}
              >
                {anime?.rating}%
              </p>
            )}
            {anime?.releaseDate && (
              <p className=" flex badge text-white font-body  lg:text-sm xl:text-lg badge-primary ">
                {anime?.releaseDate}
              </p>
            )}
            {anime?.status && (
              <p className=" flex badge text-white font-body lg:text-sm xl:text-lg badge-primary ">
                {anime?.status}
              </p>
            )}
          </div>
          <p className="text-base sm:block lg:text-xl mt-3 lg:mt-4 max-w-full lg:w-[70%] drop-shadow-x hidden">
            {truncateString(
              anime?.description?.replace(/<br>|<i>|<\/i>/g, ""),
              100
            )}
          </p>
          <div className="lg:mt-10 mt-2 xl:-bottom-1/3 relative">
            <Link to={`/anime/${anime?.id}`}>
              <button className="btn btn-md glass text-white  text-sm md:text-base lg:text-lg ">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img
        className=" mask mask-squircle absolute sm:hidden top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3/5 hover:opacity-50 cursor-pointer"
        src={anime?.image}
      ></img>
    </>
  );
};

export default BgVideo;
