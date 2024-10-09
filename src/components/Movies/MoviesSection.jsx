import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeToPopular,
  changeToTopRated,
} from "../../redux/slices/moviesSlice";
import PopularSection from "./PopularSection";
import TopRatedSection from "./TopRatedSection";

const MoviesSection = () => {
  const dispatch = useDispatch();
  const { isItPopular } = useSelector((state) => state.moviesReducer);

  return (
    <section className="px-14 py-10 flex flex-col gap-4">
      <div className="flex lg:flex-row md:flex-row gap-8 flex-col justify-between items-center">
        <Typography variant="h4">Movies</Typography>
        <div className="flex lg:flex-row md:flex-row flex-col gap-4">
          <Button
            variant="text"
            className={`${
              isItPopular
                ? `text-white bg-ourRed hover:bg-red-600`
                : `bg-transparent  text-black dark:text-white`
            } text-sm w-fit`}
            onClick={() => dispatch(changeToPopular())}
          >
            Popular
          </Button>
          <Button
            variant="text"
            className={`${
              !isItPopular
                ? `text-white bg-ourRed hover:bg-red-600`
                : `bg-transparent  text-black dark:text-white`
            } text-sm w-fit`}
            onClick={() => dispatch(changeToTopRated())}
          >
            Top Rated
          </Button>
        </div>
      </div>
      <div>{isItPopular ? <PopularSection /> : <TopRatedSection />}</div>
    </section>
  );
};

export default MoviesSection;
