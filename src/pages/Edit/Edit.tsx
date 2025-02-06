import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {

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

    return(
        <>
        </>
    )
}