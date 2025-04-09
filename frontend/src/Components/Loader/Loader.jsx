import React from "react";
import "./Loader.css"; 
import preloader from "../../assets/recycle-spinner.gif"

const Loader = () => {
  return (
    <div className="loader">
      <img src={preloader} alt="Loading..." className="preloader-gif" />
    </div>
  );
};


export default Loader;
