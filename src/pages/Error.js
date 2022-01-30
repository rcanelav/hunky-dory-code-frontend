import { NavLink } from "react-router-dom";
import "./Error.css";

export const Error = () => {
  return (
    <>
      <div className="error">
        <h3>404 Error page</h3>

        <p>Sorry, this page doesn't exist</p>
        <a>
          <NavLink to="/">Go Back</NavLink>
        </a>
      </div>
    </>
  );
};

export default Error;
