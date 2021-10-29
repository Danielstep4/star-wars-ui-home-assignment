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
        className={`min-h-screen h-full flex flex-col bg-bgPrimary border-r-2 border-starWars  ${
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
        {getAllMoviesNames().map((movie) => (
          <SidebarMovieLink {...movie} key={movie.episodeId} />
        ))}
      </aside>
    </>
  );
};

const SidebarMovieLink: React.FC<SidebarMovieLinkProps> = ({
  episodeId,
  title,
  isFavorite,
}) => {
  const { setNewFavoriteMovie, removeFavoriteMovie } = useMovies();
  const handleHeartClick = () =>
    isFavorite
      ? removeFavoriteMovie(episodeId)
      : setNewFavoriteMovie(episodeId);

  return (
    <div className="border-b-2 border-starWars py-5 px-2 flex justify-between items-baseline cursor-pointer">
      <span className="text-starWars text-sm select-none font-pollorOne font-bold block">
        Star Wars: {title}
      </span>
      <span
        className="text-white hover:transform hover:scale-110"
        onClick={handleHeartClick}
      >
        {isFavorite ? "unHeart" : "Heart"}
      </span>
    </div>
  );
};

export default Sidebar;

interface SidebarMovieLinkProps extends MovieName {}
