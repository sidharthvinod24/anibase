import React from "react";

const MoreInfo = ({ data, dominantColor }) => {
  return (
    <>
      <h1 className="capitalize text-white mt-5 relative left-5 lg:left-28 font-bold w-64 font-body text-3xl">
        More Details
      </h1>
      <div className="grid grid-cols-3 text-lg lg:mx-32 mx-5 text-white font-body pointer-events-none mt-1 ">
        <div className="py-6  gap-2 ">
          <h1 className="text-2xl">Genres:</h1>
          {data?.genres?.map((genre, index) => (
            <h1
              key={index}
              className=" badge badge-lg pointer-events-none mt-1 text-lg text-white font-extrabold"
            >
              {genre}
            </h1>
          ))}
        </div>
        {data?.studios?.length > 0 && (
          <div className="py-6   gap-2 text-2xl">
            <h1>Studios:</h1>
            {data?.studios?.map((studios, index) => (
              <h1
                key={index}
                className=" badge badge-lg pointer-events-none mt-1  text-lg text-white font-extrabold"
              >
                {studios}
              </h1>
            ))}
          </div>
        )}
        <div className="py-6  gap-2 text-2xl ">
          <h1>Popularity</h1>
          <h1 className="pointer-events-none mt-1  text-lg text-white font-extrabold">
            {(data?.popularity).toLocaleString("en")}
          </h1>
        </div>

        <div className="py-6  gap-2 text-2xl ">
          <h1>English</h1>
          <h1 className=" pointer-events-none mt-1 text-lg text-white font-extrabold ">
            {data?.title?.english || "English Not Available"}
          </h1>
        </div>
        <div className="py-6  gap-2 text-2xl ">
          <h1>Japanese</h1>
          <h1 className=" pointer-events-none mt-1 text-lg text-white font-extrabold ">
            {data?.title?.native || "English Not Available"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
