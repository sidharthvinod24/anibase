import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchAnimeDataByID } from "../Hooks/animeDataById";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchEpisodeLink } from "../Hooks/episodeLink";
import ReactPlayer from "react-player";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
// const gogoanimeMapping = data?.mappings[0]?.id?.replace(/^\/category\//, "/");

const WatchPage = () => {
  const query = useQuery();
  const episode = query.get("episode");
  const mapping = query.get("m");
  const { status, data } = useFetchEpisodeLink(mapping);

  const url = data?.sources?.find((element) => element.quality === "default");
  console.log(url);
  return (
    <>
      <div className="overflow-hidden relative w-[100vw] h-[100vw] lg:h-[35vw]">
        <h1 className="text-white">{mapping}</h1>
        <ReactPlayer
          // className={`-z-50 scale-[1.75] object-cover pointer-events-none cursor-none brightness-50 ${className}`}
          playing={true}
          url={url.url}
          // url={`https://www.youtube.com/watch?v=${anime?.trailer?.youtube_id}`}
          controls={true}
          muted={true}
        />
      </div>
    </>
  );
};

export default WatchPage;
