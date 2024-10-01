import { useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Search from "./pages/Search";

const App = () => {
  const { theme } = useSelector((state) => state.themeReducer);
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
