import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import { useEffect } from "react";
import { getPopularMovies, loadingFinish } from "./redux/slices/moviesSlice";

const App = () => {
  const dispatch = useDispatch();
  const { popularMoviesPage } = useSelector((state) => state.moviesReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  useEffect(() => {
    dispatch(getPopularMovies(popularMoviesPage));
  }, [popularMoviesPage]);

  

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white dark" : "bg-white text-black"
      } min-h-screen font-sans`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
