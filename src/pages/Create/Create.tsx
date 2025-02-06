import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Create  () {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    firstname: "",
    lastname: "",
    speciality: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          "Accept": "application/ld+json",
        },
        body: JSON.stringify(doctor),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du médecin.");
      }

      await response.json();
      toast.success("Médecin ajouté avec succès !");
      navigate(`/`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h2 className="text-3xl font-extrabold text-white text-center tracking-wide">
            Ajouter un Médecin
          </h2>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="firstname" 
              placeholder="Prénom" 
              value={doctor.firstname} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <input 
              type="text" 
              name="lastname" 
              placeholder="Nom" 
              value={doctor.lastname} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <input 
            type="text" 
            name="speciality" 
            placeholder="Spécialité" 
            value={doctor.speciality} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          
          <input 
            type="text" 
            name="address" 
            placeholder="Adresse" 
            value={doctor.address} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="city" 
              placeholder="Ville" 
              value={doctor.city} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <input 
              type="text" 
              name="zip" 
              placeholder="Code Postal" 
              value={doctor.zip} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <input 
            type="text" 
            name="phone" 
            placeholder="Téléphone" 
            value={doctor.phone} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          
          <input 
            type="text" 
            name="image" 
            placeholder="URL de l'image" 
            value={doctor.image} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          
          <button 
            type="submit" 
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Ajouter
          </button>
          <button 
            type="submit" 
            onClick={() => navigate(-1)}
            className="w-full cursor-pointer bg-gray-500 hover:bg-gray-700 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};                    