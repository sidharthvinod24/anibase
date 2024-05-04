import React from "react";
import BgVideo from "../Components/BgVideo";
import Row from "../Components/Row";
import requests from "../Requests";
const Home = () => {
  return (
    <>
      <BgVideo qKey="trendingAnime" fetchUrl={requests.requestTrending} />
      <Row
        rowID="1"
        qKey="trendingAnime"
        title="Trending Anime This Season"
        fetchUrl={requests.requestTrending}
      />
      <Row
        rowID="2"
        qKey="thisSeason"
        title="Airing This Season"
        fetchUrl={requests.requestAiringThisSeason}
      />

      <Row
        rowID="3"
        qKey="upcomingSeason"
        title="Upcoming"
        fetchUrl={requests.requestNextSeason}
      />

      <Row
        rowID="4"
        qKey="topAnime"
        title="Top of all time"
        fetchUrl={requests.requestTopAnime}
      />
      <Row
        rowID="5"
        qKey="favAnime"
        title="All Time Favourites"
        fetchUrl={requests.requestPopularAnime}
      />
    </>
  );
};

export default Home;
