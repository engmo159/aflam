import React from "react";

const ReviewCard = ({ review }) => {
  var newDate = new Date(review.created_at);
  return (
    <div className="flex gap-3">
      <div className="bg-[#9d0a00] text-white min-w-10 h-10 flex justify-center items-center rounded-full">
        {review.author_details.name
          .match(/(\b\S)?/g)
          .join("")
          .match(/(^\S|\S$)?/g)
          .join("")
          .toUpperCase() ||
          review.author
            .match(/(\b\S)?/g)
            .join("")
            .match(/(^\S|\S$)?/g)
            .join("")
            .toUpperCase()}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-black dark:text-white text-lg font-semibold">
          {review.author}
        </span>
        <span className="text-black dark:text-white text-sm">
          {newDate.toLocaleString("en-US")}
        </span>
        <span className="text-black  dark:text-white text-sm">
          {review.content}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
