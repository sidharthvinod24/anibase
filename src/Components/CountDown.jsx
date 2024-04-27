import React from "react";

const CountDown = ({ countdown, nextEp }) => {
  return (
    <div className="flex flex-row gap-2 font-body text-xl mt-2 w-auto font-bold text-white  ">
      <span className="text-nowrap -mt-1">Ep {nextEp?.episode}:</span>
      <span className="countdown">
        <span style={{ "--value": countdown.days ? countdown.days : 0 }}></span>
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
  );
};

export default CountDown;
