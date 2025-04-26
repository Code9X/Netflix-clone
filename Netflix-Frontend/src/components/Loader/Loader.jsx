import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <img
        src="\public\netflix_spinner.gif"
        alt="Loading..."
        className="spinner"
      />
    </div>
  );
};

export default Loader;