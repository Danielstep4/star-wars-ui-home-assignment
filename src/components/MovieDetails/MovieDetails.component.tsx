import bgImage from "../../assets/starwars-bg.jpg";

const MovieDetails: React.FC = () => {
  return (
    <section
      style={{
        background: `linear-gradient(
      rgba(45, 52, 54, 0.2),
      rgba(45, 52, 54, 0.2)
    ),url(${bgImage})`,
      }}
      className="h-screen bg-cover bg-opacity-75 w-screen"
    >
      Hello World
    </section>
  );
};

export default MovieDetails;
