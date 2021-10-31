import { useEffect, useState } from "react";
import { useMovies } from "../../../context/MovieContext";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import {
  fetchMovieDetails,
  extractAllKeysForMoreDetails,
} from "../../../services/Movies.service";

const MovieDetailsMoreInfo: React.FC = () => {
  // State
  const { currentMovie } = useMovies();
  const [getCurrentMovieCachedInfo, setCurrentMovieCachedInfo] =
    useSessionStorage<SwapiMoviesResult>(`movie_${currentMovie.episode_id}`);
  const [urlKeys, setUrlKeys] = useState<(keyof SwapiMoviesResult)[]>([]);
  const [activeKey, setActiveKey] = useState<keyof SwapiMoviesResult>();
  const [showMoreDetail, setShowMoreDetail] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Onload effect extracts all the other details that are inside currentMovie
  useEffect(() => {
    const extractedUrlKeys = extractAllKeysForMoreDetails(currentMovie);
    setUrlKeys(extractedUrlKeys);
    setActiveKey(extractedUrlKeys[0]);
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
  /** Function fetches the current active key info from swapi and set the showMoreDetail state */
  const showMoreDetailsHandler = async () => {
    if (activeKey && currentMovie.hasOwnProperty(activeKey)) {
      const currentMovieDetail = currentMovie[activeKey] as string[];
      const cachedInfo = getCurrentMovieCachedInfo();
      let fetchedData: string[];
      if (cachedInfo && cachedInfo.hasOwnProperty(activeKey)) {
        fetchedData = cachedInfo[activeKey] as string[];
      } else {
        fetchedData = await fetchMovieDetails(currentMovieDetail);
        // #TODO fix this
        /// @ts-ignore
        setCurrentMovieCachedInfo({ ...cachedInfo, [activeKey]: fetchedData });
      }
      setShowMoreDetail(fetchedData);
    }
  };
  return (
    <div className="w-full">
      <hr className="border-starWars my-5 w-full" />
      <div className="lg:flex grid grid-cols-3 w-full justify-center">
        {urlKeys.map((key) => (
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
      <div className="grid lg:grid-rows-6 gap-2 lg:grid-flow-col grid-cols-2 lg:text-left">
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
