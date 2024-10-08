import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  getSearchedMedia,
  setMediaType,
  setQuery,
} from "../redux/slices/searchSlice";
import SearchedMedia from "../components/search/SearchedMedia";
import { useEffect } from "react";

const Search = () => {
  const mediaCategories = ["movie", "tv", "person"];
  const dispatch = useDispatch();
  const { mediaType, searchedMoviesPage, query } = useSelector(
    (state) => state.searchReducer
  );
  let timer = null;
  const searchHandler = (value, type) => {
    if (value.trim().length > 0) {
      dispatch(
        getSearchedMedia({
          query: value,
          mediaType: type,
          page: searchedMoviesPage,
        })
      );
    } else {
      dispatch(clearSearch());
    }
  };
  const handleInputChange = (val) => {
    dispatch(setQuery(val));
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchHandler(val, mediaType);
    }, 300);
  };
  useEffect(() => {
    clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className=" xl:px-24 xl:pt-24 xl:pb-12 pt-10 px-5 pb-12 flex flex-col gap-12 items-center">
        <div className="flex justify-center gap-12">
          {mediaCategories.map((category, index) => (
            <Button
              key={index}
              className="uppercase text-sm rounded-md dark:text-white text-black"
              variant={category == mediaType ? "filled" : "text"}
              color="red"
              onClick={() => {
                dispatch(setMediaType(category));
                searchHandler(query, category);
              }}
              size="md"
            >
              {category}
            </Button>
          ))}
        </div>
        <Input
          type="text"
          placeholder={`Search ${mediaType} On Redux Movies`}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          autoFocus
          className="w-full rounded-sm p-2 bg-transparent focus:rounded-sm focus:border-none border-none outline-2 text-gray-600 placeholder:text-gray-600 focus:placeholder:text-gray-600 outline-teal-800 focus:outline-2 focus:outline-teal-800 hover:outline-white"
          onChange={(e) => handleInputChange(e.target.value)}
          value={query}
        />
      </div>
      <SearchedMedia />
    </div>
  );
};

export default Search;
