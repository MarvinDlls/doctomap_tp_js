import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <div className="buttonOne">
        <button className="edit">Mettre à jour</button>
        </div>
        <div className="buttonTwo">
        <button className="delete">Supprimer</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}