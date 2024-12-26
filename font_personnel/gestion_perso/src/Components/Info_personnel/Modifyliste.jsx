import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Modifyliste = ({ selectedUser,  onUpdateUser, onClose }) => {
  const [emailError, setEmailError] = useState("");
 console.log(selectedUser.id)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    genre: 'M',
    adresse: '',
    date_naissance :'',
    telephone: '',
    email: '',
    num_cnaps: '',
    commune: '',
    num_bancaire: '',
    nom_banque: '',
    cle: '',
    code_postal: ''
  });

  const validateEmail = (email) => {
    // Utilise une expression régulière pour vérifier le format d'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return emailRegex.test(email);
  };
  

useEffect(() => {
  if (selectedUser) {
    setFormData({
      ...formData,
      ...selectedUser
    });
  }
}, [selectedUser]);

  const [errors, setErrors] = useState({
    nom: false,
    prenom: false,
    age: false,
    date_naissance: false,
    email: false,
    adresse: false,
    telephone: false,
    genre: false,
    cnaps: false,
    commune: false,
    num_bancaire: false,
    nom_banque: false,
    cle: false,
    code_postal: false,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      if (validateEmail(value)) {
        setEmailError(""); // Supprime l'erreur si le format est valide
      } else {
        setEmailError("Veuillez entrer une adresse email valide.");
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError) {
      alert("Veuillez corriger les erreurs avant de soumettre le formulaire.");
      return;
    }
      try {
        console.log(formData)
        const response = await axios.put(
          `http://localhost:8000/api/modifier_employer/${selectedUser.id}/`,
          formData
        );
        toast.success(response.data.message);
        onUpdateUser(formData)
        onClose();
      } 
      catch (error) {
        toast.error(error.response.data.message);
      } 
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
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
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50"
        onClick={onClose}
        style={{ pointerEvents: 'none' }}
      ></div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg z-10 relative">
        <button
          onClick={onClose}
          className="absolute  top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-6 text-center">Modifier les Informations</h2>

        <Slider {...settings} className="w-full">
        <div>
            <h3 className="text-md font-semibold ">Informations de Base</h3>
            <label className="block mb-2 font-semibold">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


            <label className="block mb-2 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

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
              value={formData.adresse || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
                        <label className="block mb-2 font-semibold">Date et lieu de naissance</label>
            <input
              type="text"
              name="date_naissance"
              value={formData.date_naissance || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />



            <label className="block mb-2 font-semibold">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Autres Informations</h3>

            <label className="block mb-2 font-semibold">N° compte Cnaps</label>
            <input
              type="text"
              name="cnaps"
              value={formData.cnaps || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


            <label className="block mb-2 font-semibold">Commune</label>
            <input
              type="text"
              name="commune"
              value={formData.commune || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

           <label className="block mb-2 font-semibold">N° compte bancaire</label>
            <input
              type="text"
              name="num_bancaire"
              value={formData.num_bancaire || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Nom de la banque</label>
            <input
              type="text"
              name="nom_banque"
              value={formData.nom_banque || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Autres Informations</h3>

            <label className="block mb-2 font-semibold">Clé</label>
            <input
              type="text"
              name="cle"
              value={formData.cle || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Code Postal</label>
            <input
              type="text"
              name="code_postal"
              value={formData.code_postal || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

          </div>
        </Slider>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white mt-14 px-4 py-2 rounded w-full "
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default Modifyliste;
