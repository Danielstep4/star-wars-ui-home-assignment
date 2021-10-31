import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMovies } from "../../../context/MovieContext";
import { numToRoman } from "../../../utils/numToRoman";

const SidebarMovieLink: React.FC<SidebarMovieLinkProps> = ({
  episodeId,
  title,
  isFavorite,
  closeMobileNav,
}) => {
  //State
  const {
    setNewFavoriteMovie,
    removeFavoriteMovie,
    changeCurrentMovie,
    currentMovie,
  } = useMovies();
  // Helpers
  const handleHeartClick = () =>
    isFavorite
      ? removeFavoriteMovie(episodeId)
      : setNewFavoriteMovie(episodeId);

  const handleChangeCurrentMovie = () => {
    changeCurrentMovie(episodeId);
    closeMobileNav();
  };

  return (
    <div className="mx-1 lg:mx-0 border-starWars flex justify-between items-center cursor-pointer transform transtion-all scale-95 hover:scale-100 ease-in-out duration-300 my-2">
      <span
        className={
          "text-2xl select-none font-gothicOne font-bold block h-full w-full py-5 px-2 hover:text-white transition-color transition duration-400 ease-in-out" +
          " " +
          (currentMovie.episode_id === episodeId
            ? "text-white"
            : "text-starWars")
        }
        onClick={handleChangeCurrentMovie}
      >
        Star Wars {numToRoman(episodeId)}: {title}
      </span>
      <span
        className="text-white transform hover:scale-125 transition duration-300 ease-in-out transition-transform py-1 px-2 text-2xl"
        onClick={handleHeartClick}
      >
        {isFavorite ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart />
        )}
      </span>
    </div>
  );
};

export default SidebarMovieLink;

interface SidebarMovieLinkProps extends MovieName {
  closeMobileNav: () => void;
}
