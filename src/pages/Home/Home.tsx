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
      <Link to={'/create'}>
      <button
        type="button"
        className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-3.5 h-3.5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
        </svg>
        Ajouter
      </button>
      </Link>
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
