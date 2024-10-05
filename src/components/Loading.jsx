import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { loadingFinish } from "../redux/slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const Loading = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { pageLoading } = useSelector((state) => state.moviesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let toRef = setTimeout(() => {
      dispatch(loadingFinish(true));
      clearTimeout(toRef);
    }, 0);
  });
  useEffect(() => {
    let toRef = setTimeout(() => {
      dispatch(loadingFinish(false));
      clearTimeout(toRef);
    }, 500);
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col pt-14 justify-between items-center h-screen">
      <BarLoader color="red" width={width} />
      <div className="h-full flex justify-center items-center">
        <span className="mr-4 cursor-pointer py-1.5 font-bold text-4xl text-black dark:text-white">
          Redux <span className="text-red-500">Movies</span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
