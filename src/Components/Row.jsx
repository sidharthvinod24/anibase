import React, { useEffect, useState } from "react";
import { usefetchData } from "../Hooks/animesData";
import AnimeRow from "./AnimeRow";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
const Row = ({ qKey, rowID, title, fetchUrl }) => {
  const { status, error, data } = usefetchData(fetchUrl, qKey);
  const [slider, setSlider] = useState(0);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :( </p>;

  console.log(data);

  const slideLeft = () => {
    var el = document.getElementById("slider" + rowID);
    setSlider((el.scrollLeft -= 500));
  };

  const slideRight = () => {
    var el = document.getElementById("slider" + rowID);
    setSlider((el.scrollLeft += 500));
  };

  const isAtEnd = () => {
    const el = document.getElementById("slider" + rowID);
    if (!el) return false;
    const maxScroll = el.scrollWidth - el.clientWidth;
    return slider >= maxScroll;
  };

  console.log(slider);
  return (
    <>
      <h2 className="pl-9 text-white font-bold font-body lg:text-xl p-4">
        {title}
      </h2>
      <div className="relative flex items-center group">
        {slider > 0 ? (
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        ) : (
          <MdChevronLeft className="hidden" />
        )}
        <div
          id={"slider" + rowID}
          className="w-full lg:pl-6 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative "
        >
          {data.map((data, index) => (
            <Link to={`/anime/${data.id}`}>
              <AnimeRow key={index} data={data} />
            </Link>
          ))}
        </div>
        {!isAtEnd() ? (
          <MdChevronRight
            onClick={slideRight}
            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        ) : (
          <MdChevronRight className="hidden" />
        )}
      </div>
    </>
  );
};

export default Row;
