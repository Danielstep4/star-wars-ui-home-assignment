import MovieDetails from "../../components/MovieDetails";
import Sidebar from "../../components/Sidebar";

const StartWars: React.FC = () => {
  return (
    <main className="h-full w-full flex font-roboto">
      <Sidebar />
      <MovieDetails />
    </main>
  );
};

export default StartWars;
