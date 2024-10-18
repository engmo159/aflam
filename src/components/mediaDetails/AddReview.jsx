/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { FaLocationArrow } from "react-icons/fa6";
import { addUserReview } from "../../redux/slices/reviewSlice";

const AddReview = ({ mediaType }) => {
  const { userData } = useSelector((state) => state.userAuthReducer);
  const { addReviewLoading } = useSelector((state) => state.reviewReducer);
  const { token } = useSelector((state) => state.tokenReducer);
  const { mediaDetail } = useSelector((state) => state.mediaDetailReducer);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (!content.trim()) {
      alert("Please enter a review.");
      return;
    }

    if (mediaDetail && mediaType) {
      const data = {
        token,
        content,
        mediaType,
        mediaId: mediaDetail?.id,

        mediaTitle: mediaDetail?.original_title || mediaDetail?.name,

        mediaPoster: mediaDetail?.poster_path,
        mediaRate: mediaDetail?.vote_average,
      };
      dispatch(addUserReview(data)).then(() => setContent(""));
    }
  };
  return (
    <div className='flex flex-col gap-4'>
      {/* user name  */}
      <div className="flex gap-3 items-center">
        <div className="bg-[#9d0a00] text-white min-w-10 h-10 flex justify-center items-center rounded-full">
          {userData?.displayName
            .match(/(\b\S)?/g)
            .join("")
            .match(/(^\S|\S$)?/g)
            .join("")
            .toUpperCase() || ""}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black dark:text-white text-lg font-semibold">
            {userData?.displayName}
          </span>
        </div>
      </div>
      {/* text aria and button */}
      <div className="lg:mx-[3%] flex flex-col gap-3">
        {/* text aria  */}
        <div className="relative w-full min-w-[150px]">
          <textarea
            className='block resize-none p-2.5 w-full text-md text-gray-900 focus-visible:outline-none focus-within:border-2 focus:border-ourRed rounded-md border-2 border-gray-300 hover:border-gray-500 dark:focus:border-ourRed dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
            placeholder='Write your review'
            rows='6'
            onChange={e => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>

        {/* post button  */}

        <Button
          className='w-fit text-md bg-ourRed'
          onClick={() => submitHandler()}
        >
          <div className='flex gap-2 items-center font-normal'>
            {addReviewLoading ? (
              <span className="btnLoader"></span>
            ) : (
              <>
                <FaLocationArrow className="text-xl" />
                Post
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AddReview;
