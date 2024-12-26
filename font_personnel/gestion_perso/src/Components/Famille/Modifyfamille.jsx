import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Modifyfamille = ({ selectedUser, famille_employer ,onUpdateUser, onClose }) => {
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    nom_conjoint:'',
    naissance_conjoint:'',
    age_conjoint:'',
    genre_conjoint:'M',
    profession_conjoint:'',
    telephone_conjoint:'',
    nom_enfant:'',
    acharge_enfant:'',
    naissance_enfant:'',
    genre_enfant:'',
    dece_enfant :''
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData((prevData) => ({
        ...prevData,
        nom: selectedUser.nom || '',
        prenom: selectedUser.prenom || '',
      }));
    }
    if (famille_employer) {
      const userFamille = famille_employer.find((s) => s.declarant === selectedUser.id);
      if (userFamille) {
        setFormData((prevData) => ({
          ...prevData,
          nom_conjoint : userFamille.nom_conjoint || '',
          naissance_conjoint:userFamille.naissance_conjoint || '',
          age_conjoint:userFamille.age_conjoint || '',
          genre_conjoint:userFamille.genre_conjoint || '',
          profession_conjoint:userFamille.profession_conjoint || '',
          telephone_conjoint:userFamille.telephone_conjoint || '',
          nom_enfant:userFamille.nom_enfant || '',
          acharge_enfant:userFamille.acharge_enfant || '',
          naissance_enfant:userFamille.naissance_enfant || '',
          genre_enfant : userFamille.genre_enfant || '',
          dece_enfant :userFamille.dece_enfant || ''
        }));
      }
    }
  }, [selectedUser, famille_employer]);

  // Gérer les modifications des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
      if (selectedUser) {
        // Mise à jour si un utilisateur est sélectionné
        const response = await axios.put(
          `http://localhost:8000/api/ajouter_famille/${selectedUser.id}/`,
          formData
        );
        console.log('Mise à jour:', formData);
        toast.success(response.data.message);
  
        // Mise à jour des données de l'utilisateur existant
        onUpdateUser({ id: selectedUser.id, ...formData });
  
      } 
      // Ferme la modal après l'opération
      onClose();
    } 
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
            <h3 className="text-md font-semibold ">Informations à propos du conjoint(e)</h3>
            <label className="block mb-2 font-semibold">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom || ""}
              disabled
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ""}
              disabled
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


            <label className="block mb-2 font-semibold">Nom et prénom du conjoint(e)</label>
            <input
              type="text"
              name="nom_conjoint"
              value={formData.nom_conjoint || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Date et lieu de naissance</label>
            <input
              type="text"
              name="naissance_conjoint"
              value={formData.naissance_conjoint || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Informations à propos du conjoint(e)</h3>

            <label className="block mb-2 font-semibold">Age</label>
            <input
              type="text"
              name="age_conjoint"
              value={formData.age_conjoint || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
                      
            <label className="block mb-2 font-semibold">Genre</label>
            <select name="genre_conjoint" id="genre_conjoint"   onChange={handleChange}
                value={formData.age_conjoint || ""} className="w-full p-2 mb-1 border rounded "
            >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
            </select>

            <label className="block mb-2 font-semibold">profession</label>
            <input
              type="text"
              name="profession_conjoint"
              value={formData.profession_conjoint || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">téléphone</label>
            <input
              type="text"
              name="telephone_conjoint"
              value={formData.telephone_conjoint || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
          </div>

          <div>
            <h3 className="text-md font-semibold mb-4"> Informations sur des enfants de chaque employé(e)</h3>

            <label className="block mb-2 font-semibold">Nom(s) et prénom(s)</label>
            <textarea name="nom_enfant"      
              onChange={handleChange}
              value={formData.nom_enfant || ""}
              className="w-full p-2 mb-1 border rounded "
             id="nom_enfant" placeholder='entrez le nom et prénom des enfants , veillez changer une nouvelle ligne pour chacun'>

             </textarea>


            <label className="block mb-2 font-semibold">A charge</label>
            <textarea name="acharge_enfant"      
              onChange={handleChange}
              value={formData.acharge_enfant || ""}
              className="w-full p-2 mb-1 border rounded "
             id="acharge_enfant" placeholder='veillez changer une nouvelle ligne pour chacun'>

             </textarea>


           <label className="block mb-2 font-semibold">Date et lieu de naissance</label>
           <textarea name="naissance_enfant"      
              onChange={handleChange}
              value={formData.naissance_enfant || ""}
              className="w-full p-2 mb-1 border rounded "
             id="naissance_enfant" placeholder='veillez changer une nouvelle ligne pour chacun'>

             </textarea>




          </div>

          <div>
            <h3 className="text-md font-semibold mb-4"> Informations sur des enfants de chaque employé(e)</h3>

            <label className="block mb-2 font-semibold">Genre</label>
            <textarea name="genre_enfant"      
              onChange={handleChange}
              value={formData.genre_enfant || ""}
              className="w-full p-2 mb-1 border rounded "
             id="genre_enfant" placeholder='veillez changer une nouvelle ligne pour chacun'>

             </textarea>

            <label className="block mb-2 font-semibold">Date de décé(facultatif)</label>
            <textarea name="dece_enfant"      
              onChange={handleChange}
              value={formData.dece_enfant || ""}
              className="w-full p-2 mb-1 border rounded "
              id="dece_enfant" placeholder='veillez changer une nouvelle ligne pour chacun'>

             </textarea>

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

export default Modifyfamille;
