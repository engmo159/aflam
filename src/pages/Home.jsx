import { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { loadingFinish } from "../redux/slices/moviesSlice";
import Loading from "../components/Loading";

const Home = () => {
  const { pageLoading } = useSelector((state) => state.moviesReducer);

  return <div>{pageLoading ? <Loading /> : <Hero />} </div>;
};
export default Home;
