import React from "react";
import InfoButton from "./InfoButton";
import { useEffect, useState } from "react";
import EpisodeRow from "./EpisodeRow";
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
      <div className="flex items-center mt-10  space-x-4">
        <h1 className="capitalize text-white relative left-14 lg:left-28 font-bold w-64 font-body text-3xl">
          {category}
        </h1>
        {countdown && (
          <>
            <span className="text-black text-xl">
              <InfoButton>
                Ep {nextEp?.episode}: {countdown.days ? countdown.days : 0}d{" "}
                {countdown.hours ? countdown.hours : 0}h{" "}
                {countdown.minutes ? countdown.minutes : 0}m{" "}
                {countdown.seconds ? countdown.seconds : 0}s
              </InfoButton>
            </span>
          </>
        )}
      </div>
      <EpisodeRow data={data} />
    </>
  );
};

export default Episodes;
