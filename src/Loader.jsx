import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader">
    <span>
      Loading...
      <span role="img" aria-label="Time">
        ⏳
      </span>
    </span>
  </div>
);

export default Loader;
