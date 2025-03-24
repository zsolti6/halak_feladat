import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const HalList = () => {
  const [halak, setHalak] = useState([]);

  useEffect(() => {
    axios.get("https://halak.onrender.com/api/Halak")
      .then((response) => {
        setHalak(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Halak listája</h1>
      <div className="row">
        {halak.map((hal) => (
          <div className="col-md-4 mb-4" key={hal.id}>
            <div className="card shadow-lg">
              <img 
                src={hal.kep ? `data:image/jpeg;base64,${hal.kep}` : "https://via.placeholder.com/300"} 
                className="card-img-top" 
                alt={hal.nev} 
                style={{ height: "200px", objectFit: "cover" }}
              />
              
              <div className="card-body">
                <h5 className="card-title">{hal.nev}</h5>
                <p className="card-text">
                  <strong>Faj:</strong> {hal.faj} <br />
                  <strong>Méret:</strong> {hal.meretCm} cm <br />
                </p>
              </div>
              <div className="text-center mb-2">
                <Link to={"/hal/" + hal.id}><i className="bi bi-text-paragraph fs-6 btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                <Link to={"/hal-mod/" + hal.id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}