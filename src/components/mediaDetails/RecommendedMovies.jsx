import { Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const RecommendedMovies = () => {
  const { recommendedDetails } = useSelector(
    (state) => state.mediaDetailReducer
  );
  return (
    <div>
      <div>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white"
        >
          you may also like
        </Typography>
        <div className="h-1.5 bg-ourRed w-24" />
      </div>
    </div>
  );
};

export default RecommendedMovies;
