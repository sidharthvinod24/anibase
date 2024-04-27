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

const Episodes = ({ data, category, nextEp }) => {
  const targetTimestamp = nextEp?.airingTime;
  const { status: epStatus, data: epData } = useFetchEpisodesByID(data?.id);

  const [countdown, setCountdown] = useState(
    calculateCountdown(targetTimestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return (
    <>
      {data?.episodes && (
        <>
          <div className="flex items-center mt-10  space-x-4">
            <h1 className="capitalize text-white relative left-5 lg:left-28 font-bold w-64 font-body text-3xl">
              {category}
            </h1>
            {countdown && (
              <>
                <CountDown countdown={countdown} nextEp={nextEp} />
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
