import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Doctor {
  id: number;
  firstname: string;
  lastname: string;
  speciality: string;
  city: string;
  image: string;
  phone: string;
}

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doctors/${doctorId}`
      );
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editDoctor = async () => {
    if (!doctor) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doctors/${doctor.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
            "Accept": "application/ld+json",
          },
          body: JSON.stringify(doctor),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }

      alert("Docteur mis à jour avec succès.");
      navigate("/"); // Redirection vers la page d'accueil après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du docteur:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editDoctor();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (doctor) {
      setDoctor({
        ...doctor,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Mettre à Jour un Docteur
      </h2>
      {doctor && (
        <form
          id="updateDoctorForm"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            {/* Prénom */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Prénom :
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={doctor.firstname}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nom */}
            <div>
              <label
                htmlFor="lastname"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Nom :
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={doctor.lastname}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Spécialité */}
            <div>
              <label
                htmlFor="speciality"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Spécialité :
              </label>
              <input
                type="text"
                id="speciality"
                name="speciality"
                value={doctor.speciality}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Ville */}
            <div>
              <label
                htmlFor="city"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Ville :
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={doctor.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* URL de l'image */}
            <div>
              <label
                htmlFor="image"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                URL de l'image :
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={doctor.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Téléphone :
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={doctor.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-center flex justify-center space-x-4">
              <button
                type="submit"
                onClick={editDoctor}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all cursor-pointer"
              >
                Mettre à Jour
              </button>
              <button
                type="submit"
                onClick={() => navigate(-2)}
                className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
