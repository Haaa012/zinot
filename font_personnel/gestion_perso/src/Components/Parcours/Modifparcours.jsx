import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Modifparcours = ({ selectedUser, parcours_employer , onUpdateUser, onClose }) => {
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    poste_anterieur :'',
    periode_debut:'',
    periode_fin:'',
    adresse_employeur:'',
    poste_contrat:'',
    type_contrat:'',
    qualification:'',
    horaire_hebdo:'',
    debut_contrat:'',
    fin_contrat : '',
    salaire_net :'',
    salaire_brut :''
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData((prevData) => ({
        ...prevData,
        nom: selectedUser.nom || '',
        prenom: selectedUser.prenom || '',
      }));
    }
    if (parcours_employer) {
      const userParcours = parcours_employer.find((s) => s.declarant === selectedUser.id);
      if (userParcours) {
        setFormData((prevData) => ({
          ...prevData,
          poste_anterieur : userParcours.poste_anterieur || '',
          periode_debut:userParcours.periode_debut || '',
          periode_fin:userParcours.periode_fin || '',
          adresse_employeur:userParcours.adresse_employeur || '',
          poste_contrat:userParcours.poste_contrat || '',
          type_contrat:userParcours.type_contrat || '',
          qualification:userParcours.qualification || '',
          horaire_hebdo:userParcours.horaire_hebdo || '',
          debut_contrat:userParcours.debut_contrat || '',
          fin_contrat : userParcours.fin_contrat || '',
          salaire_net :userParcours.salaire_net || '',
          salaire_brut :userParcours.salaire_brut || '',
      
        }));
      }
    }
  }, [selectedUser, parcours_employer]);

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
      try {
        const response = await axios.put(
          `http://localhost:8000/api/ajouter_parcours/${selectedUser.id}/`,
          formData
        );
       // console.log(formData)
        toast.success(response.data.message);
        onUpdateUser({ id: selectedUser.id, ...formData });
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
            <h3 className="text-md font-semibold ">Informations à propos de la profession antérieur</h3>
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


            <label className="block mb-2 font-semibold">Poste</label>
            <input
              type="text"
              name="poste_anterieur"
              value={formData.poste_anterieur || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Date de début </label>
            <input
              type="text"
              name="periode_debut"
              value={formData.periode_debut || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

          </div>

          <div>
            <h3 className="text-md font-semibold mb-4">Informations à propos de la profession antérieur</h3>

            <label className="block mb-2 font-semibold">Date de fin</label>
            <input
              type="text"
              name="periode_fin"
              value={formData.periode_fin || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
                      
            <label className="block mb-2 font-semibold">Dénomination et adresse de l'employeur</label>
            <input
              type="text"
              name="adresse_employeur"
              value={formData.adresse_employeur || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

          </div>

          <div>
            <h3 className="text-md font-semibold mb-4"> Informations de contrat avec l'ONG</h3>

            <label className="block mb-2 font-semibold">Poste</label>
            <input
              type="text"
              name="poste_contrat"
              value={formData.poste_contrat || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


            <label className="block mb-2 font-semibold">Type de contrat</label>
            <select name="type_contrat"               
              value={formData.type_contrat || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              id="type_contrat">
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
            </select>

           <label className="block mb-2 font-semibold">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Horaire de travail hebdomadaire</label>
            <input
              type="text"
              name="horaire_hebdo"
              value={formData.horaire_hebdo || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />


          </div>

          <div>
            <h3 className="text-md font-semibold mb-4"> Informations de contrat avec l'ONG</h3>

            <label className="block mb-2 font-semibold">Début de contrat</label>
            <input
              type="text"
              name="debut_contrat"
              value={formData.debut_contrat || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />

            <label className="block mb-2 font-semibold">Fin de contrat</label>
            <input
              type="text"
              name="fin_contrat"
              value={formData.fin_contrat || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
                        <label className="block mb-2 font-semibold">Salaire Brut</label>
            <input
              type="text"
              name="salaire_brut"
              value={formData.salaire_brut || ""}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded "
              required
            />
            <label className="block mb-2 font-semibold">Salaire Net</label>
            <input
              type="text"
              name="salaire_net"
              value={formData.salaire_net || ""}
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

export default Modifparcours;
