import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <MoonLoader size={75} color="rgb(153 27 27 / 1)" />
    </div>
  );
};

export default Loading;
