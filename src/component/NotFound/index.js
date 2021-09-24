import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dzfehrv3n/image/upload/v1625912176/Layer_1_yfwxh7.png"
      alt="not-found"
      className="not-found-img"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>
      we’re sorry, the page you requested could not be found Please go back to
      the login Page
    </p>
    <Link to="/login">
      <button type="button" className="button-style">
        Login Page
      </button>
    </Link>
  </div>
);

export default NotFound;
