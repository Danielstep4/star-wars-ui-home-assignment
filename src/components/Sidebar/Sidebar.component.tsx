import { useMovies } from "../../context/MovieContext";
import { useToggler } from "../../hooks/useToggler";

const Sidebar: React.FC = () => {
  const { getAllMoviesNames } = useMovies();
  const [isMobileNavOpen, toggleMobileNav] = useToggler();

  return (
    <>
      {!isMobileNavOpen && (
        <button
          className="lg:hidden block fixed top-1 left-1 text-white"
          onClick={toggleMobileNav}
        >
          Open
        </button>
      )}
      <aside
        className={`min-h-screen flex flex-col bg-bgPrimary border-r-2 border-starWars  ${
          isMobileNavOpen ? "w-screen absolute" : "lg:block hidden w-1/3"
        }`}
      >
        {isMobileNavOpen && (
          <button
            className="absolute top-2 right-4 text-red-500 font-bold text-xl"
            onClick={toggleMobileNav}
          >
            X
          </button>
        )}
        <div className="border-b-2 border-starWars p-2">
          <h1 className="font-pollorOne text-starWars text-2xl text-center select-none">
            The Star Wars API
          </h1>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
