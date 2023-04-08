import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 Unavailable</h2>
      <p>Sorry, this page does not exist</p>
      <Link to="/">Go back to the homepage...</Link>
    </div>
  );
};

export default NotFound;
