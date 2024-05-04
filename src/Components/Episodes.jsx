import React from "react";
import InfoButton from "./InfoButton";
import { useEffect, useState } from "react";
import { useFetchEpisodesByID } from "../Hooks/episodesById";

import EpisodeRow from "./EpisodeRow";
import CountDown from "./CountDown";
function calculateCountdown(targetTimestamp) {
  if (targetTimestamp === null || targetTimestamp === undefined) {
    return null;
  }
  const difference = targetTimestamp - new Date().getTime() / 1000;

  if (difference < 0) {
    return null;
  }

  const days = Math.floor(difference / (60 * 60 * 24));
  const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((difference % (60 * 60)) / 60);
  const seconds = Math.floor(difference % 60);

  return { days, hours, minutes, seconds };
}

function calculateExpectedDate(targetTimestamp) {
  const date = new Date(targetTimestamp * 1000);

  const options = {
    weekday: "short", // abbreviated day of the week
    day: "numeric", // day of the month
    month: "short", // abbreviated month name
    year: "numeric", // full year
    hour: "numeric", // hour (12-hour clock)
    minute: "2-digit", // minute
    hour12: true, // use 12-hour clock
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
const Episodes = ({ data, category, nextEp }) => {
  const targetTimestamp = nextEp?.airingTime;

  const gogoanimeMapping = data?.mappings
    ?.find((element) => element.providerId === "gogoanime") // Assuming each element is an object with a 'name' property
    ?.id?.replace(/^\/category\//, "");

  const { status: epStatus, data: epData } = useFetchEpisodesByID(data?.id);

  const [countdown, setCountdown] = useState(
    calculateCountdown(targetTimestamp)
  );

  const expectedDate = calculateExpectedDate(targetTimestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return (
    <>
      {data?.episodes?.length > 0 && (
        <>
          <div className="flex items-center mt-10  space-x-4">
            <h1 className="capitalize text-white relative left-5 lg:left-28 font-bold w-64 font-body text-xl lg:text-3xl">
              {category}
            </h1>
            {countdown && (
              <>
                <CountDown
                  countdown={countdown}
                  expectedDate={expectedDate}
                  nextEp={nextEp}
                />
              </>
            )}
          </div>
          <EpisodeRow id={data?.id} data={epData} status={epStatus} />
        </>
      )}
    </>
  );
};

export default Episodes;
