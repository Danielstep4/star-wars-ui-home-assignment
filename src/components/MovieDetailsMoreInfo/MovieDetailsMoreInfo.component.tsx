import { useEffect, useState } from "react";
import { useMovies } from "../../context/MovieContext";
import { fetchMovieDetails } from "../../services/Movies.service";

const MovieDetailsMoreInfo: React.FC = () => {
  // State
  const { currentMovie } = useMovies();
  const [activeKey, setActiveKey] = useState<keyof SwapiMoviesResult>();
  const [showMoreDetail, setShowMoreDetail] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Onload effect extracts all the other details that are inside currentMovie
  useEffect(() => {
    const allKeys = extractAllKeysForMoreDetails();
    setActiveKey(allKeys[0]);
  }, []);
  // Effect that triggers on active key change and current movie change
  // Resets the show more detail section
  // Starts the show more details handler
  useEffect(() => {
    if (activeKey) {
      resetShowMoreDetail();
      showMoreDetailsHandler();
    }
  }, [activeKey, currentMovie]);
  // Effect that triggers on show more detail state change
  // and changes the is loading state
  useEffect(() => {
    if (showMoreDetail.length === 0) setIsLoading(true);
    else if (showMoreDetail.length > 1) setIsLoading(false);
  }, [showMoreDetail]);
  /**Resets the show more detail state */
  const resetShowMoreDetail = () => setShowMoreDetail([]);
  /** Extracts all the keys  for more details that the app can fetch from swapi
   * Function iterates on all the keys and finds only the string arrays with the needed urls
   */
  const extractAllKeysForMoreDetails = () => {
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
  /** Function fetches the current active key info from swapi and set the showMoreDetail state */
  const showMoreDetailsHandler = async () => {
    if (activeKey && currentMovie.hasOwnProperty(activeKey)) {
      const currentMovieDetail = currentMovie[activeKey] as string[];
      const fetchedData = await fetchMovieDetails(currentMovieDetail);
      setShowMoreDetail(fetchedData);
    }
  };
  return (
    <div className="w-full">
      <hr className="border-starWars my-5 w-full" />
      <div className="lg:flex grid grid-cols-3 w-full justify-center">
        {extractAllKeysForMoreDetails().map((key) => (
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
  );
};

export default MovieDetailsMoreInfo;
