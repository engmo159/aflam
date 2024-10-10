import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  mediaDetailReducer,
  reviewDetailsLoadMore,
} from "../../redux/slices/mediaDetailsSlice";
import ReviewCard from "./ReviewCard";
import { BarLoader } from "react-spinners";

const ReviewSection = () => {
  const dispatch = useDispatch();
  const { reviewsDetails, reviewsDetailsVisible, reviewsDetailsLoading } =
    useSelector((state) => state.mediaDetailReducer);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white"
        >
          Reviews
        </Typography>
        <div className="h-1.5 bg-ourRed w-24" />
      </div>
      <div className="flex flex-col gap-5">
        {reviewsDetails?.length > 0 ? (
          reviewsDetails
            ?.slice(0, reviewsDetailsVisible)
            .map((review, index) => <ReviewCard key={index} review={review} />)
        ) : (
          <div className="w-full py-10 text-xl">
            No reviews yet, Be the first one to write an review.
          </div>
        )}
      </div>
      {reviewsDetails?.length > 0 && (
        <Button
          onClick={() => dispatch(reviewDetailsLoadMore())}
          className="flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold"
        >
          {reviewsDetailsLoading ? (
            <BarLoader color="red" className="my-2.5" />
          ) : (
            "LOAD MORE"
          )}
        </Button>
      )}
    </div>
  );
};

export default ReviewSection;
