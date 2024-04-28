import React from "react";

const CountDown = ({ countdown, nextEp, expectedDate }) => {
  return (
    <div className="tooltip" data-tip={expectedDate}>
      <div className="flex btn  flex-row gap-1 font-body text-base lg:text-lg mt-2 w-auto font-bold pointer-events-none text-white  ">
        <span className="text-nowrap ">Ep {nextEp?.episode}:</span>
        <span className="countdown">
          <span
            style={{ "--value": countdown.days ? countdown.days : 0 }}
          ></span>
          d
        </span>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.hours ? countdown.hours : 0 }}
          ></span>
          h
        </span>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.minutes ? countdown.minutes : 0 }}
          ></span>
          m
        </span>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.seconds ? countdown.seconds : 0 }}
          ></span>
          s
        </span>
      </div>
    </div>
  );
};

export default CountDown;
