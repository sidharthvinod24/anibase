import React from "react";

const CountDown = ({ countdown, nextEp }) => {
  return (
    <div className="flex gap-2 font-body text-xl mt-2 w-auto font-bold text-white  ">
      <h1 className=" text-xl">Ep {nextEp?.episode}:</h1>

      <div>
        <span className="countdown">
          <span
            style={{ "--value": countdown.days ? countdown.days : 0 }}
          ></span>
        </span>
        d
      </div>
      <div>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.hours ? countdown.hours : 0 }}
          ></span>
        </span>
        h
      </div>
      <div>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.minutes ? countdown.minutes : 0 }}
          ></span>
        </span>
        m
      </div>
      <div>
        <span className="countdown ">
          <span
            style={{ "--value": countdown.seconds ? countdown.seconds : 0 }}
          ></span>
        </span>
        s
      </div>
    </div>
  );
};

export default CountDown;
