import MovieDetails from "../../components/MovieDetails";
import Sidebar from "../../components/Sidebar";

const StartWars: React.FC = () => {
  return (
    <main className="h-screen w-screen flex">
      <Sidebar />
      <MovieDetails />
    </main>
  );
};

export default StartWars;
