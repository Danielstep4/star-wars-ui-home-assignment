import "./Loading.style.css";

const Loading: React.FC = () => {
  return (
    <div className="lds-ellipsis" role="alert">
      <div className="bg-starWars" />
      <div className="bg-starWars" />
      <div className="bg-starWars" />
      <div className="bg-starWars" />
    </div>
  );
};

export default Loading;
