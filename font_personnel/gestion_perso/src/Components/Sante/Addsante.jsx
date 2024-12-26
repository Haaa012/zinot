import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from "axios";

const EditSante = ({ selectedUser, sante_employer, onUpdateUser, onClose }) => {
  // État pour stocker les informations de base et de santé
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    tel_urgence: '',
    etat_sante: ''
  });

  // Initialiser le formulaire avec les données de l'utilisateur sélectionné
  useEffect(() => {
    if (selectedUser) {
      setFormData((prevData) => ({
        ...prevData,
        nom: selectedUser.nom || '',
        prenom: selectedUser.prenom || '',
      }));
    }
    if (sante_employer) {
      const userSante = sante_employer.find((s) => s.declarant === selectedUser.id);
      if (userSante) {
        setFormData((prevData) => ({
          ...prevData,
          tel_urgence: userSante.tel_urgence || '',
          etat_sante: userSante.etat_sante || ''
        }));
      }
    }
  }, [selectedUser, sante_employer]);

  // Gérer les modifications des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Envoyer les modifications au backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/ajouter_sante/${selectedUser.id}/`,
        formData
      );
      toast.success(response.data.message);
      onUpdateUser({ id: selectedUser.id, ...formData });  // Met à jour les données au niveau parent
      onClose();  // Ferme la modal après la mise à jour
    } catch (error) {
      toast.error(error.response?.data.message || 'Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center">
      {/* Fond d'arrière-plan */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={onClose}></div>

      {/* Contenu de la modal */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-6 text-center">Modifier les Informations</h2>

        <form onSubmit={handleSubmit}>
          {/* Informations de base */}
          <div>
            <h3 className="text-md font-semibold">Informations de Base</h3>

            <label className="block mb-2 font-semibold">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              disabled
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
              required
            />

            <label className="block mb-2 font-semibold">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              disabled
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
              required
            />

            {/* Informations de santé */}
            <label className="block mb-2 font-semibold">Contact en cas d'urgence</label>
            <input
              type="text"
              name="tel_urgence"
              value={formData.tel_urgence}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
              
            />

            <label className="block mb-2 font-semibold">État de santé</label>
            <textarea
              name="etat_sante"
              value={formData.etat_sante}
              onChange={handleChange}
              cols={45}
              rows={6}
              className="w-full p-2 mb-1 border rounded"
              placeholder="Décrire l'état de santé"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white mt-4 px-4 py-2 rounded w-full"
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSante;
