import React, { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import { useLocation, useParams } from "react-router-dom";
import SearchItems from "../Components/SearchItems";
import { FaSearch, FaTrash } from "react-icons/fa";
import useDebounce from "../Hooks/debounce";
import { useFetchAdvancedSearch } from "../Hooks/advancedSearch";
import { useNavigate } from "react-router-dom";
import Scroll from "../Components/Scroll";

const currentYear = new Date().getFullYear(); // Ensure you have the current year
const yearList = Array.from({ length: currentYear + 1 - 1940 }, (v, k) => ({
  value: currentYear + 1 - k,
  label: String(currentYear + 1 - k),
}));

const genreList = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Cars", label: "Cars" },
  { value: "Comedy", label: "Comedy" },
  { value: "Drama", label: "Drama" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Horror", label: "Horror" },
  { value: "Mahou Shoujo", label: "Mahou Shoujo" },
  { value: "Mecha", label: "Mecha" },
  { value: "Music", label: "Music" },
  { value: "Mystery", label: "Mystery" },
  { value: "Psychological", label: "Psychological" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Slice of Life", label: "Slice of Life" },
  { value: "Sports", label: "Sports" },
  { value: "Supernatural", label: "Supernatural" },
  { value: "Thriller", label: "Thriller" },
];

const animeFormatList = [
  { value: "TV", label: "TV" },
  { value: "TV_SHORT", label: "TV_SHORT" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "MOVIE", label: "MOVIE" },
  { value: "SPECIAL", label: "SPECIAL" },
  { value: "MUSIC", label: "MUSIC" },
];

const mangaFormatList = [
  { value: "MANGA", label: "MANGA" },
  { value: "ONE_SHOT", label: "ONE_SHOT" },
  { value: "NOVEL", label: "NOVEL" },
];

const seasonList = [
  { value: "WINTER", label: "WINTER" },
  { value: "SPRING", label: "SPRING" },
  { value: "SUMMER", label: "SUMMER" },
  { value: "FALL", label: "FALL" },
];

const colorStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    color: "white", // This sets the text color to white
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#1a1a1a",
    color: "white", // This sets the text color to white
  }),
};
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
const Search = () => {
  const query = useQuery();
  const { type } = useParams();
  const searchType = capFirst(type);
  const initialSearchQuery = query.get("query");
  const initialYear = query.get("year");
  const initialSeason = query.get("season");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedType, setSelectedType] = useState(searchType);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedAnimeFormat, setSelectedAnimeFormat] = useState(null);
  const [selectedMangaFormat, setSelectedMangaFormat] = useState(null);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchQuery, 25);
  function getSelectedFormat(searchType) {
    return searchType === "Anime" ? selectedAnimeFormat : selectedMangaFormat;
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.value);
    if (searchQuery != null) {
      navigate(`/search/${e.value.toUpperCase()}?query=${searchQuery}`); // This will change the URL to /anime or /manga
    }
  };
  const handleNavSearch = (newQuery) => {
    const encodedQuery = encodeURIComponent(newQuery);
    navigate(`?query=${encodedQuery}`);
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery === "") {
      setSearchQuery(null);
      navigate(`/search/${searchType}`);
    } else {
      setSearchQuery(newQuery);
      handleNavSearch(newQuery); // Use the modified function with encoding
    }
  };

  useEffect(() => {
    const newSearchQuery = query.get("query");
    if (newSearchQuery !== searchQuery) {
      setSearchQuery(newSearchQuery);
    }
  }, [query]);
  useEffect(() => {
    // Reset the format when the type changes
    if (selectedType === "Anime") {
      setSelectedMangaFormat(null); // Ensure manga format is cleared
    } else {
      setSelectedAnimeFormat(null);
      setSelectedYear(null);
      setSelectedSeason(null); // Ensure anime format is cleared
    }
  }, [selectedType]);

  const checkGenre = (selectedGenres) => {
    if (!selectedGenres || selectedGenres.length === 0) {
      return null;
    }
    return JSON.stringify(selectedGenres);
  };

  const { data, status, fetchNextPage, hasNextPage } = useFetchAdvancedSearch(
    debouncedSearchTerm,
    selectedYear,
    selectedSeason,
    getSelectedFormat(searchType),
    selectedType.toUpperCase(),
    checkGenre(selectedGenres)
  );

  const results =
    data?.pages?.reduce((acc, page) => {
      return [...acc, ...(page.results || [])];
    }, []) || [];

  return (
    <>
      <div className="text-white flex flex-row gap-2  mx-[5%] mt-10  text-5xl font-body ">
        <p>Search</p>
        <Select
          className="basic-single text-2xl mt-2"
          classNamePrefix="select"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1a1a1a",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "#1a1a1a",

              color: "white",
            }),
          }}
          onChange={handleTypeChange}
          defaultValue={
            searchType === "Anime"
              ? { value: selectedType, label: selectedType }
              : null
          }
          isSearchable={false}
          options={[
            { value: "Anime", label: "Anime" },
            { value: "Manga", label: "Manga" },
          ]}
        />
      </div>
      <div className="grid grid-cols-3 gap-6 lg:mt-12 lg:ml-24 sm:grid-cols-4  md:grid-cols-5 lg:grid-cols-6 text-white  ">
        <div className="flex flex-col">
          <p className="">Search</p>
          <input
            type="search"
            value={searchQuery || ""}
            onChange={handleSearchChange}
            className="input input-bordered bg-base-200 text-white"
            placeholder="Search"
          />
        </div>
        <SearchItems
          defaultValue={selectedGenres}
          name="Genres"
          list={genreList}
          onChange={(e) => {
            const selectedOptions = e
              ? e.map((option) => option.value)
              : [null];
            setSelectedGenres(selectedOptions);
          }}
          isMulti={true}
        />
        {selectedType === "Anime" ? (
          <>
            <SearchItems
              name="Format"
              onChange={(e) => setSelectedAnimeFormat(e ? e.value : null)}
              list={animeFormatList}
            />
            <SearchItems
              name="Season"
              defaultValue={selectedSeason}
              onChange={(e) => setSelectedSeason(e ? e.value : null)}
              list={seasonList}
            />
            <SearchItems
              name="Year"
              defaultValue={selectedYear}
              onChange={(e) => setSelectedYear(e ? e.value : null)}
              list={yearList}
            />
          </>
        ) : (
          <SearchItems
            name="Format"
            onChange={(e) => setSelectedMangaFormat(e ? e.value : [])}
            list={mangaFormatList}
          />
        )}
      </div>
      <Scroll
        results={results}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};
export default Search;
