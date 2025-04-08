// src/app/components/Loader.jsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
    <ClipLoader color="#007bff" loading={true} size={50} />
  </div>
);

export default Loader;
