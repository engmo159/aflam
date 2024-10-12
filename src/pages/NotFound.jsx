import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col align-middle items-center pt-28 pb-10 lg:h-[83vh] h-[89vh]">
      <RiErrorWarningLine className="w-32 h-32 mx-auto" />
      <Typography
        variant="h1"
        className="mt-10 !text-3xl !leading-snug md:!text-4xl text-center ">
        <span className="">Error 404</span> <br /> It looks like something went
        wrong.
      </Typography>
      <Typography className="mt-8 mb-14 text-lg font-normal mx-auto md:max-w-sm text-center">
        Don&apos;t worry, our team is already on it. Please try to visit home
        page or come back later.
      </Typography>
      <Link to={"/"}>
        <Button className="w-full px-4 bg-ourRed">back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
