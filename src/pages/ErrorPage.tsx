import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

const ErrorPage = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  if (isRouteErrorResponse(err)) {
    return (
      <div className="error-page-container">
        <div className="img-container">
          <img
            src="https://www.flowmatters.com/wp-content/uploads/2023/01/Cover-How-to-Create-a-High-Converting-404-Page-for-eCommerce-Websites.png"
            className="img"
            alt="error-image"
          />
        </div>

        <div className="error-description">
          <h1>
            {err.status} - {err.statusText}
          </h1>
          <h3>{err.data}.</h3>
          <button className="home-btn" onClick={navigateToHome}>
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="error-page-container">
      <div className="img-container">
        <img
          src="https://www.flowmatters.com/wp-content/uploads/2023/01/Cover-How-to-Create-a-High-Converting-404-Page-for-eCommerce-Websites.png"
          className="img"
          alt="error-image"
        />
      </div>

      <div className="error-description">
        <h1>An unexpected error occurred.</h1>
        <button className="home-btn" onClick={navigateToHome}>
          Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

/*
isRouteErrorResponse(err) is a helper function provided by react-router-dom to check if the error matches a specific shape (e.g., status, statusText, and data).
If the error matches, we can safely access its properties.
If it doesn't match, we can display a fallback message.
*/
