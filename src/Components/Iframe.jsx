import React, { useState } from "react";
import { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Iframe = ({ anime, className }) => {
  const [vidError, setVidError] = useState(false);
  return (
    <>
      {anime?.trailer?.id != null && !vidError ? (
        <ReactPlayer
          className={`-z-50 scale-[1.75] object-cover pointer-events-none cursor-none brightness-50 ${className}`}
          playing={true}
          loop={true}
          pip={false}
          width="100%"
          height="100%"
          url={`https://www.youtube.com/embed/${anime?.trailer?.id}?enablejsapi=1&wmode=opaque&autoplay=1`}
          // url={`https://www.youtube.com/watch?v=${anime?.trailer?.youtube_id}`}
          controls={false}
          muted={true}
          onError={() => setVidError(true)}
        />
      ) : (
        <div className="w-full h-[900px] relative">
          <img
            className="w-full h-full blur-sm scale-10 opacity-40 object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            src={anime?.image}
            srcSet={`
            ${anime?.image}?w=640 640w,
            ${anime?.image}?w=1024 1024w,
            ${anime?.image}?w=1920 1920w
          `}
          ></img>
        </div>
      )}
    </>
  );
};

export default Iframe;
