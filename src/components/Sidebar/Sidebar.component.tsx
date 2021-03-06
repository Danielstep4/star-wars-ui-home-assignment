import { useMovies } from "../../context/MovieContext";
import { AiOutlineMenu } from "react-icons/ai";
import { TiTimes } from "react-icons/ti";
import SidebarMovieLink from "./SidebarMovieLink";
import { useState } from "react";

const Sidebar: React.FC = () => {
  //State
  const { getAllMoviesNames } = useMovies();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  //Helpers
  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <>
      {!isMobileNavOpen && (
        <button
          className="lg:hidden block fixed top-1 left-1 text-white"
          onClick={toggleMobileNav}
        >
          <AiOutlineMenu className="text-2xl " />
        </button>
      )}
      <aside
        className={`min-h-screen max-h-screen overflow-y-auto overflow-x-hidden h-full flex flex-col bg-bgPrimary ${
          isMobileNavOpen
            ? "w-screen absolute z-10"
            : "lg:block hidden 2xl:w-1/4 w-1/3"
        }`}
      >
        {isMobileNavOpen && (
          <button
            className="absolute top-2 right-2 text-red-500 font-bold text-3xl"
            onClick={toggleMobileNav}
          >
            <TiTimes />
          </button>
        )}
        <div className="border-b-2 border-starWars p-2">
          <h1 className="font-pollorOne text-starWars text-2xl text-center select-none">
            The Star Wars API
          </h1>
        </div>
        {getAllMoviesNames().map((movie) => (
          <SidebarMovieLink
            {...movie}
            key={movie.episodeId}
            closeMobileNav={closeMobileNav}
          />
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
