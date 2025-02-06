import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  firstname: string;
  lastname: string;
  speciality: string;
  city: string;
  image: string;
  phone: string;
}

export default function Create() {
  const [doctor, setDoctor] = useState<Doctor>({
    firstname: "",
    lastname: "",
    speciality: "",
    city: "",
    image: "",
    phone: "",
  });

  const navigate = useNavigate();

  const createDoctor = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }

      alert("Docteur créé avec succès.");
      navigate("/"); // Redirection après création
    } catch (error) {
      console.error("Erreur lors de la création du docteur:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDoctor();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Ajouter un Docteur
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="firstname" className="block text-lg font-medium text-gray-700 mb-2">
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

          <div>
            <label htmlFor="lastname" className="block text-lg font-medium text-gray-700 mb-2">
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

          <div>
            <label htmlFor="speciality" className="block text-lg font-medium text-gray-700 mb-2">
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

          <div>
            <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-2">
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

          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
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

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
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

          {/* Boutons */}
          <div className="text-center flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all cursor-pointer"
              onClick={createDoctor}
            >
              Créer
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}