import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  interface Doctor {
    id: number;
    firstname: string;
    lastname: string;
    speciality: string;
    city: string;
    image: string;
    phone: string;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors`);
      const data = await response.json();
      setDoctors(data.member);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        Liste des Docteurs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={doctor.image}
              alt="Image du docteur"
              className="w-full h-48 object-contain"
            />
            <div className="p-6">
              <p className="text-gray-700 text-lg">
                <strong>Prénom:</strong> {doctor.firstname}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Nom de famille:</strong> {doctor.lastname}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Spécialité:</strong> {doctor.speciality}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Ville:</strong> {doctor.city}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Téléphone:</strong> {doctor.phone}
              </p>
            </div>
            <div className="p-4 bg-blue-50">
              <Link to={`/info/${doctor.id}`} className="block text-center">
                <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all">
                  <span className="text">Voir Plus</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
