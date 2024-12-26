import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddListe = ({ addUserToList,onClose }) => {
  const [users, setUsers] = useState([]); 

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    genre: 'M',
    adresse: '',
    date_naissance :'',
    telephone: '',
    email: '',
    cnaps: '',
    commune: '',
    num_bancaire: '',
    nom_banque: '',
    cle: '',
    code_postal: ''
  });

  const [errors, setErrors] = useState({
    nom: false,
    prenom: false,
    age:false,
    naissance : false,
    email: false,
    adresse: false,
    telephone: false,
    genre: false,
    num_cnaps: false,
    commune: false,
    num_bancaire: false,
    nom_banque: false,
    cle: false,
    code_postal: false,
  });

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const validateForm = () => {
    const newErrors = {};
    let formValid = true;

    // Vérification des champs obligatoires
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key].trim() === '') {
        newErrors[key] = true; // Marque le champ comme invalide
        formValid = false;
      } else {
        newErrors[key] = false; // Marque le champ comme valide
      }
    });

    setErrors(newErrors);
    return formValid;
  };

  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ajouter_employer/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de l'ajout de l'utilisateur.");
        }
  
        addUserToList(formData); // Ajoute immédiatement à la liste locale
        toast.success("Utilisateur ajouté avec succès.");
        
        // Rafraîchit les utilisateurs depuis le serveur        
        // Ferme la modal
        onClose();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        toast.error(
          error.message || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } else {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
    }
  };
  

  const settings = {
    dots: true, // Afficher les points de navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Nombre de slides visibles
    slidesToScroll: 1,
    autoplaySpeed: 3000, // Intervalle d'autoplay
    prevArrow: (
      <button className="slick-prev text-gray-500 hover:text-gray-700 absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent p-8 rounded-full">
        &lt;
      </button>
    ),
    nextArrow: (
      <button className="slick-next text-gray-500 hover:text-gray-700 absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent p-8 rounded-full">
        &gt;
      </button>
    ),
  };

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center">
      {/* Overlay pour obscurcir le fond */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50"
        onClick={onClose}
        style={{ pointerEvents: 'none' }} // Autoriser les clics sur l'overlay pour fermer
      ></div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg z-10 relative">
        <button
          onClick={onClose}
          className="absolute  top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-6 text-center">Ajouter des Informations</h2>

        {/* Utilisation de React Slick */}
        <Slider {...settings} className="w-full">
          <div>
            <h3 className="text-md font-semibold ">Informations de Base</h3>
            <label className="block mb-2 font-semibold">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.nom ? 'border-red-500' : ''}`}
              required
            />
            {errors.nom ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

            <label className="block mb-2 font-semibold">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.prenom ? 'border-red-500' : ''}`}
              required
            />
                {errors.prenom ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}


            <label className="block mb-2 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.age ? 'border-red-500' : ''}`}
              required
            />
            {errors.age ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}
            <label className="block mb-2 font-semibold">Genre</label>
        <select name="genre" value={formData.genre} onChange={handleChange} className="w-full p-2 mb-4 border rounded" id="genre">
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
        </select>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Autres Informations</h3>

            <label className="block mb-2 font-semibold">Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.adresse ? 'border-red-500' : ''}`}
              required
            />
                        {errors.adresse ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}
                        <label className="block mb-2 font-semibold">Date et lieu de naissance</label>
            <input
              type="text"
              name="date_naissance"
              value={formData.naissance}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.date_naissance ? 'border-red-500' : ''}`}
              required
            />
                        {errors.date_naissane ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}



            <label className="block mb-2 font-semibold">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.telephone ? 'border-red-500' : ''}`}
              required
            />
                {errors.telephone ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Autres Informations</h3>

            <label className="block mb-2 font-semibold">N° compte Cnaps</label>
            <input
              type="text"
              name="cnaps"
              value={formData.cnaps}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.num_cnaps ? 'border-red-500' : ''}`}
              required
            />
                {errors.num_cnaps ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}


            <label className="block mb-2 font-semibold">Commune</label>
            <input
              type="text"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.commune ? 'border-red-500' : ''}`}
              required
            />
            {errors.commune ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

           <label className="block mb-2 font-semibold">N° compte bancaire</label>
            <input
              type="text"
              name="num_bancaire"
              value={formData.num_bancaire}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.num_bancaire ? 'border-red-500' : ''}`}
              required
            />
            {errors.num_bancaire ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

            <label className="block mb-2 font-semibold">Nom de la banque</label>
            <input
              type="text"
              name="nom_banque"
              value={formData.nom_banque}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.nom_banque ? 'border-red-500' : ''}`}
              required
            />
            {errors.nom_banque ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}


          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Autres Informations</h3>

            <label className="block mb-2 font-semibold">Clé</label>
            <input
              type="text"
              name="cle"
              value={formData.cle}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.cle ? 'border-red-500' : ''}`}
              required
            />
            {errors.cle ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

            <label className="block mb-2 font-semibold">Code Postal</label>
            <input
              type="text"
              name="code_postal"
              value={formData.code_postal}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded ${errors.code_postal ? 'border-red-500' : ''}`}
              required
            />
            {errors.code_postal ? (
            <p className='text-red-500 text-[10px]'>Veillez remplir *</p>
            ) : ("")}

          </div>



        </Slider>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white mt-14 px-4 py-2 rounded w-full "
        >
          Ajouter
        </button>
      </div>

    </div>
  );
};

export default AddListe;