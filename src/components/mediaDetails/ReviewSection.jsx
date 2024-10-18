/* eslint-disable react/prop-types */
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { reviewDetailsLoadMore } from "../../redux/slices/mediaDetailsSlice";
import ReviewCard from "./ReviewCard";
import { BarLoader } from "react-spinners";
import AddReview from "./AddReview";
import { useEffect } from "react";
import { getUserReview } from "../../redux/slices/reviewSlice";
import { getUserInfo } from "../../redux/slices/userAuthSlice";

const ReviewSection = ({ mediaType }) => {
  const dispatch = useDispatch();
  const { reviewsDetails, reviewsDetailsVisible, reviewsDetailsLoading } =
    useSelector((state) => state.mediaDetailReducer);
  const { reviewData } = useSelector((state) => state.reviewReducer);
  const { token } = useSelector((state) => state.tokenReducer);
  const { userData } = useSelector((state) => state.userAuthReducer);
  useEffect(() => {
    dispatch(getUserReview(token));
    dispatch(getUserInfo(token));
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white">
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
        {reviewData?.length > 0 &&
          reviewData.map((review, index) => (
            <ReviewCard
              key={index}
              review={{
                created_at: review?.createdAt || "",
                author: userData?.displayName || "",
                content: review?.content || "",
                author_details: { name: userData?.displayName || "" },
                id: review?.id || "",
              }}
              userProps
            />
          ))}
      </div>
      {reviewsDetails?.length > reviewsDetailsVisible && (
        <Button
          onClick={() => dispatch(reviewDetailsLoadMore())}
          className="flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold">
          {reviewsDetailsLoading ? (
            <BarLoader color="red" className="my-2.5" />
          ) : (
            "LOAD MORE"
          )}
        </Button>
      )}
      <hr className='border-1 py-3 border-gray-800' />
      {token && <AddReview mediaType={mediaType} />}
    </div>
  );
};

export default ReviewSection;
