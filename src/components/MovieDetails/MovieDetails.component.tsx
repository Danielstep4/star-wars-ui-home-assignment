import bgImage from "../../assets/starwars-bg.jpg";
import { useMovies } from "../../context/MovieContext";

const MovieDetails: React.FC = () => {
  const { currentMovie } = useMovies();
  console.log(currentMovie);
  return (
    <section
      style={{
        background: `linear-gradient(
      rgba(45, 52, 54, 0.2),
      rgba(45, 52, 54, 0.2)
    ),url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen h-full w-screen p-10"
    ></section>
  );
};

export default MovieDetails;
