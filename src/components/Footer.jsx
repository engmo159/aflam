import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#131313] px-8 py-3">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white dark:bg-[#131313] text-center md:justify-between">
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-black dark:text-white">
          Redux <span className="text-red-500">Movies</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              variant="paragraph"
              className="font-normal transition-colors hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600 text-blue-gray-900 dark:text-white">
              <Link to={"/"}>HOME</Link>
            </Typography>
          </li>
          <li>
            <Typography
              variant="paragraph"
              className="font-normal transition-colors hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600 text-blue-gray-900 dark:text-white">
              <Link to={"/movie"}>MOVIES</Link>
            </Typography>
          </li>
          <li>
            <Typography
              variant="paragraph"
              className="font-normal transition-colors hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600 text-blue-gray-900 dark:text-white">
              <Link to={"/tv"}>TV SERIES</Link>
            </Typography>
          </li>
          <li>
            <Typography
              variant="paragraph"
              className="font-normal transition-colors hover:text-red-600 focus:text-red-600 dark:hover:text-red-600 dark:focus:text-red-600 text-blue-gray-900 dark:text-white">
              <Link to={"/search"}>SEARCH</Link>
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-5 border-gray-300 dark:border-gray-50 " />
      <Typography className="text-center font-normal text-blue-gray-900 dark:text-white">
        &copy; 2024 Designed By Mohamed Saeed & Ahmed Khaled
      </Typography>
    </footer>
  );
};

export default Footer;
