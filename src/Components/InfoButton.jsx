import React from "react";

const InfoButton = ({ children, dominantColor }) => (
  <div
    style={{
      backgroundColor: `${dominantColor}`,
    }}
    className="bg-transparent font-semibold py-1 px-1 border pointer-events-none rounded-md"
  >
    {children}
  </div>
);

export default InfoButton;
