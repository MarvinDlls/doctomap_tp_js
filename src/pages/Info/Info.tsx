import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Info.css";

interface Doctor {
  id: number;
  firstname: string;
  lastname: string;
  speciality: string;
  city: string;
  image: string;
  phone: string;
}

export default function Info() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { doctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      fetchInfo(doctorId);
    }
  }, [doctorId]);

  const fetchInfo = async (doctorId: string) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors/${doctorId}`);
        const data = await response.json();
        setDoctor(data);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};

const deleteDoctor = async () => {
  if (!doctor) return;

  const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer Dr. ${doctor.firstname} ${doctor.lastname} ?`);
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://127.0.0.1:8000/api/doctors/${doctor.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    alert("Docteur supprimé avec succès.");
    navigate("/"); // Redirection vers la page d'accueil après suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du docteur:", error);
  }
};

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!doctor) {
    return <div>Docteur non trouvé</div>;
  }

  return (
    <div className="container">
    <div className="doctor-profile">
      <div className="doctor-header">
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.firstname} ${doctor.lastname}`} 
          className="doctor-image" 
        />
      </div>
      <div className="doctor-info">
        <h2 className="doctor-name">
          Dr. {doctor.firstname} {doctor.lastname}
        </h2>
        <p className="doctor-specialty">{doctor.speciality}</p>
        <div className="doctor-details">
          <div className="info-item">
            <i className="location-icon">📍</i>
            <span>{doctor.city}</span>
          </div>
          <div className="info-item">
            <i className="phone-icon">📞</i>
            <span>{doctor.phone}</span>
          </div>
        </div>
        <div className="buttonContainer">
        <Link to={`/edit/${doctor.id}`}>
        <div className="buttonOne">
        <button className="edit">Mettre à jour</button>
        </div>
        </Link>
        <div className="buttonTwo">
        <button className="delete" onClick={deleteDoctor}>Supprimer</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}