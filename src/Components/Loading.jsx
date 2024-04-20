import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="mt-80 ml-[45%] ">
      <MoonLoader size={75} color="rgb(153 27 27 / 1)" />
    </div>
  );
};

export default Loading;
