import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const HalMod = () => {
  const [formData, setFormData] = useState({
    id: 0,
    nev: "",
    faj: "",
    meretCm: 0,
    toId: 0,
    kep: "",
    fogasoks: []
  });
  const [file, setFile] = useState(null);
  const [tavak, setTavak] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.halId;

  useEffect(() => {
    // Fetch tavak (lakes)
    axios.get("https://halak.onrender.com/api/Tavak")
      .then((response) => setTavak(response.data))
      .catch((error) => console.error("Error fetching tavak:", error));

    // Fetch hal (fish) data by id
    axios.get(`https://halak.onrender.com/api/Halak/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching hal:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let base64Image = formData.kep;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          base64Image = reader.result.split(",")[1];
          const payload = { ...formData, kep: base64Image };
          await axios.put(`https://halak.onrender.com/api/Halak/${id}`, payload);
          navigate("/");
        };
        reader.readAsDataURL(file);
      } else {
        await axios.put(`https://halak.onrender.com/api/Halak/${id}`, formData);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating fish:", error);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h2 className="text-center mb-4">Hal Szerkesztése</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Név</label>
          <input
            type="text"
            className="form-control"
            name="nev"
            value={formData.nev}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Faj</label>
          <input
            type="text"
            className="form-control"
            name="faj"
            value={formData.faj}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Méret (cm)</label>
          <input
            type="number"
            className="form-control"
            name="meretCm"
            value={formData.meretCm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tó kiválasztása</label>
          <select
            className="form-select"
            name="toId"
            value={formData.toId}
            onChange={handleChange}
            required
          >
            <option value="">Válassz tavat...</option>
            {tavak.map((to) => (
              <option key={to.id} value={to.id}>
                {to.nev} ({to.helyszin})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Kép frissítése (választható)</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <div className="text-center">
          <Link to="/" className="bi bi-backspace-fill fs-6 btn btn-danger"> Vissza</Link>&nbsp;&nbsp;&nbsp;
          <button type="submit" className="btn btn-primary">
            Küldés
          </button>
        </div>
      </form>
    </div>
  );
}