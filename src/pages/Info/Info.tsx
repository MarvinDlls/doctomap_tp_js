import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md p-6">
        <div className="flex justify-center">
          <img
            src={doctor.image}
            alt={`Dr. ${doctor.firstname} ${doctor.lastname}`}
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Dr. {doctor.firstname} {doctor.lastname}
          </h2>
          <p className="text-gray-500 text-lg">{doctor.speciality}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center text-gray-600">
              <span className="text-lg">📍</span>
              <span className="ml-2">{doctor.city}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <span className="text-lg">📞</span>
              <span className="ml-2">{doctor.phone}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Link to={`/edit/${doctor.id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer">
                Mettre à jour
              </button>
            </Link>
            <button
              onClick={deleteDoctor}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition cursor-pointer"
            >
              Supprimer
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}