
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import SwiperLayout from "../components/SwiperLayout";
import Loading from "../components/Loading";

const Home = () => {
  const { pageLoading } = useSelector((state) => state.moviesReducer);

  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : (
        <div>
          <Hero />
          <SwiperLayout />
        </div>

      )}

    </div>
  );
};
export default Home;
