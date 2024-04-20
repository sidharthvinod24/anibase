import React, { useEffect, useRef } from "react";
import Iframe from "../Components/Iframe";
import { Link, useParams } from "react-router-dom";
import { useFetchAnimeDataByID } from "../Hooks/animeDataById";
import { useState } from "react";
import NotFoundPage from "./NotFoundPage";
import fetchImage from "../imageData";
import axios from "axios";
import InfoButton from "../Components/InfoButton";
import InfoRow from "../Components/InfoRow";
import Loading from "../Components/Loading";
import { useFetchMangaDataByID } from "../Hooks/mangaDataById";
import CharacterRow from "../Components/CharacterRow";
const Info = ({ indicator }) => {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);
  const fetchData =
    indicator === "anime" ? useFetchAnimeDataByID : useFetchMangaDataByID;

  const { status, error, data } = fetchData(id);
  let description = data?.description;

  description = description?.replace(/<br>|&|gt;|lt;|<\/>|<i>|<\/i>/g, "");

  if (status === "pending") return <Loading />;

  if (status === "error" || data?.error) return <NotFoundPage />;

  if (!showFullDescription) {
    if (description?.length > 400) {
      description = description?.substring(0, 400) + "...";
    }
  }
  // Call the function
  fetchImage(data?.image).then((color) => {
    setDominantColor(color);
  });

  console.log(dominantColor);
  return (
    <>
      <div className="overflow-hidden relative w-[100vw] h-[100vw] lg:h-[35vw]">
        <Iframe anime={data} className="opacity-30" />
        <img
          className="absolute right-[25%] top-[25%] h-3/4  sm:right-[76%] sm:h-3/4"
          src={data?.image}
        ></img>
      </div>
      <div className="font-body text-center  h-auto w-full font-extrabold drop-shadow-xl text-white lg:text-left lg:absolute lg:top-44">
        <div
          style={{
            color: `${dominantColor}`,
          }}
          className="lg:absolute lg:-top-[30%] lg:left-1/4"
        >
          <h1 className="mt-1 text-[35px] ">
            {data?.season?.toUpperCase()} {data?.releaseDate}
          </h1>
          <h1 className="text-[30px]">{data?.title?.romaji}</h1>
        </div>
        <div className="flex relative flex-row items-center justify-center gap-3 lg:absolute lg:top-28 lg:left-1/4">
          {data?.type && (
            <InfoButton dominantColor={dominantColor}>
              {data?.type === "TV" ? `${data?.type} Show` : data?.type}
            </InfoButton>
          )}

          {data?.totalEpisodes > 0 && (
            <InfoButton dominantColor={dominantColor}>
              {data?.totalEpisodes} Episodes
            </InfoButton>
          )}
          {data?.rating && (
            <InfoButton dominantColor={dominantColor}>
              {data?.rating}%
            </InfoButton>
          )}
          {data?.status && (
            <InfoButton dominantColor={dominantColor}>
              {data?.status}
            </InfoButton>
          )}
        </div>
        <div className="grid lg:gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 items-center justify-center gap-2 mt-2 lg:mt-0 lg:absolute lg:top-44 lg:left-1/4">
          {data?.genres?.map((genre, index) => (
            <button
              style={{
                backgroundColor: `${dominantColor}`,
              }}
              key={index}
              className="bg-transparent border text-white font-bold py-1 px-1 rounded-full"
            >
              {genre}
            </button>
          ))}
        </div>
        <br></br>
        <br></br>
        <p className="relative bottom-2 left-1 overflow-hidden text-left text-white font-body text-lg font-light lg:text-md lg:absolute lg:top-56 lg:overflow-y-scroll lg:left-1/4 lg:w-[70%] lg:h-[8.5vw]">
          {description}
          {description?.length > 400 && (
            <button
              className="relative text-indigo-500 ml-1  hover:text-indigo-600"
              onClick={() => setShowFullDescription((prevState) => !prevState)}
            >
              {showFullDescription ? "less" : "more"}
            </button>
          )}
        </p>{" "}
      </div>
      <div className="hidden lg:block lg:absolute lg:bottom-[30%]  lg:left-1/4 ">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={`https://anilist.co/anime/${id}`}
          style={{
            backgroundColor: `${dominantColor}`,
          }}
          className="bg-transparent border text-white font-bold py-1 px-4 rounded-full"
        >
          See On Anilist
        </Link>
      </div>
      <InfoRow data={data} category="relations" />
      <InfoRow data={data} category="recommendations" />
      <CharacterRow data={data} category="characters" />
    </>
  );
};

export default Info;