import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="loader-container">
      <ClipLoader
        color={"#8b5cf6"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
