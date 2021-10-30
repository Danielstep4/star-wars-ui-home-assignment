import bgImage from "../../assets/starwars-bg.jpg";
import { useMovies } from "../../context/MovieContext";
import { numToRoman } from "../../utils/numToRoman";

const MovieDetails: React.FC = () => {
  const { currentMovie } = useMovies();
  console.log(currentMovie);
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
      className="min-h-screen h-full w-screen"
    >
      <article className="bg-black bg-opacity-60 rounded text-white lg:p-10 p-2 min-h-screen">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-pollorOne font-bold text-starWars">
            Star Wars Episode {numToRoman(currentMovie.episode_id)}:{" "}
            {currentMovie.title}
          </h1>
          <div className="font-bold text-lg text-white my-4 flex lg:flex-row flex-col w-full justify-evenly items-baseline">
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
          <span className="font-bold text-2xl text-white my-4"></span>
          <p className="text-3xl font-bold text-starWars text-center font-gothicOne">
            {currentMovie.opening_crawl}
          </p>
        </div>
      </article>
    </section>
  );
};

export default MovieDetails;
