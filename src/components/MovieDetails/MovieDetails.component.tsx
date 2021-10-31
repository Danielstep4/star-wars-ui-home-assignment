import bgImage from "../../assets/starwars-bg.jpg";
import { useMovies } from "../../context/MovieContext";
import { numToRoman } from "../../utils/numToRoman";
import MovieDetailsMoreInfo from "./MovieDetailsMoreInfo";

const MovieDetails: React.FC = () => {
  const { currentMovie } = useMovies();

  return (
    <section
      style={{
        background: `linear-gradient(
        rgba(45, 52, 54, 0.4),
        rgba(45, 52, 54, 0.4)
      ),url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen max-h-screen overflow-y-auto h-full w-screen"
    >
      <article className="bg-black bg-opacity-60 rounded text-white lg:p-10 p-2 min-h-screen  py-10">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-pollorOne font-bold text-starWars">
            Star Wars Episode {numToRoman(currentMovie.episode_id)}:{" "}
            {currentMovie.title}
          </h1>
          <div className="font-bold text-lg text-white my-4 flex lg:flex-row flex-col w-full justify-evenly items-center">
            <span>
              Director: {currentMovie.director} - {currentMovie.release_date}
            </span>
            <span>
              {currentMovie.producer.includes(",")
                ? "Producers: "
                : "Producer: "}{" "}
              {currentMovie.producer}
            </span>
          </div>
          <p className="lg:text-3xl text-2xl font-bold text-starWars text-left font-gothicOne lg:p-0 p-3 leading-snug">
            {currentMovie.opening_crawl}
          </p>
          <MovieDetailsMoreInfo />
        </div>
      </article>
    </section>
  );
};

export default MovieDetails;
