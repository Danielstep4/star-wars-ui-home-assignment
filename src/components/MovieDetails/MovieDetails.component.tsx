import { useEffect, useState } from "react";
import bgImage from "../../assets/starwars-bg.jpg";
import { useMovies } from "../../context/MovieContext";
import { fetchMovieDetails } from "../../services/Movies.service";
import { numToRoman } from "../../utils/numToRoman";

const MovieDetails: React.FC = () => {
  const { currentMovie } = useMovies();
  const [activeKey, setActiveKey] = useState<keyof SwapiMoviesResult>();
  const [showMoreDetail, setShowMoreDetail] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allKeys = extractAllOtherDetails();
    setActiveKey(allKeys[0]);
  }, []);

  useEffect(() => {
    if (activeKey) {
      resetShowMoreDetail();
      showMoreDetailsHandler(activeKey);
    }
  }, [activeKey, currentMovie]);

  useEffect(() => {
    if (showMoreDetail.length === 0) setIsLoading(true);
    else if (showMoreDetail.length > 1) setIsLoading(false);
  }, [showMoreDetail]);

  const resetShowMoreDetail = () => setShowMoreDetail([]);

  const extractAllOtherDetails = () => {
    const urlKeys: (keyof SwapiMoviesResult)[] = [];
    const allKeys = Object.keys(currentMovie) as (keyof SwapiMoviesResult)[];
    for (let key of allKeys) {
      if (Array.isArray(currentMovie[key])) {
        const array = currentMovie[key] as string[];
        if (array[0].includes("https")) urlKeys.push(key);
      }
    }
    return urlKeys;
  };

  const showMoreDetailsHandler = async (key: keyof SwapiMoviesResult) => {
    if (currentMovie.hasOwnProperty(key)) {
      const currentMovieDetail = currentMovie[key] as string[];
      const fetchedData = await fetchMovieDetails(currentMovieDetail);
      setShowMoreDetail(fetchedData);
    }
  };

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
          <p className="text-3xl font-bold text-starWars text-center font-gothicOne">
            {currentMovie.opening_crawl}
          </p>

          <div className="w-full">
            <hr className="border-starWars my-5 w-full" />
            <div className="lg:flex grid grid-cols-3 w-full justify-center">
              {extractAllOtherDetails().map((key) => (
                <button
                  className="ml-2 p-4 font-bold font-gothicOne text-3xl capitalize"
                  onClick={() => setActiveKey(key)}
                  key={key}
                >
                  <span
                    className={
                      key === activeKey
                        ? "border-starWars border-b-2 text-starWars"
                        : "text-white transition-color transition-transform ease-in-out duration-300 transform hover:scale-110 block hover:text-starWars"
                    }
                  >
                    {key}
                  </span>
                </button>
              ))}
            </div>
            <hr className="border-starWars my-5" />
            <div className="grid lg:grid-cols-5 grid-cols-2 grid-rows-auto">
              {isLoading
                ? "Loading..."
                : showMoreDetail.map((name) => (
                    <span className="text-xl" key={name}>
                      {name}
                    </span>
                  ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default MovieDetails;
