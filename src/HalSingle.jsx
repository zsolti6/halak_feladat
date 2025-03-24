import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export const HalSingle = () => {
  const params = useParams();
  const id = params.halId;
  const [hal, setHal] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    axios.get(`https://halak.onrender.com/api/Halak/${id}`)
      .then((response) => {
        setHal(response.data);
        if (response.data.toId) {
          axios.get(`https://localhost:7067/api/Tavak/${response.data.toId}`)
            .then((toResponse) => {
              setTo(toResponse.data);
            })
            .catch((error) => console.error("Error fetching tó:", error));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  if (!hal) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container w-50">
      <h1 className="text-center my-4">{hal.nev} Részletei</h1>
      <div className="card shadow-lg mb-4">
        <img
          src={hal.kep ? `data:image/jpeg;base64,${hal.kep}` : "https://via.placeholder.com/500"}
          className="card-img-top"
          alt={hal.nev}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{hal.nev}</h5>
          <p className="card-text">
            <strong>Faj:</strong> {hal.faj} <br />
            <strong>Méret:</strong> {hal.meretCm} cm <br />
            <strong>Tó:</strong> {to ? `${to.nev} (${to.helyszin})` : "Tó adatok nem elérhetők"}
          </p>
        </div>
        <div className="text-center mt-4">
        <Link to="/"><i className="bi bi-backspace btn btn-primary fs-6"></i></Link>&nbsp;&nbsp;&nbsp;
        <Link to={"/hal-mod/" + id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
      </div>
      </div>
    </div>
  );
}