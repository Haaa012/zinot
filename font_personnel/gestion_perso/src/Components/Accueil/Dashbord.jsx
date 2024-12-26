import React, { useState , useEffect } from "react";
import "animate.css";
import "../../App.css";
import Panneau from "./Panneau";
import { FaArrowRight } from "react-icons/fa";

const images = {
  total: ".././public/images/triangle1.png", // Fond jaune avec texte noir
  manage: ".././public/images/triangle1.png", // Couleur turquoise
};



const Dashbord = () => {
  const [compte , setCompte]= useState('')
  const fetchCompte = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/compter_employer/");
      const data = await response.json();
      setCompte(data.nombre_employes); // Assurez-vous de stocker uniquement la valeur `nombre_employes`
    } catch (error) {
      console.error("Erreur lors du comptage des employés:", error);
    }
  };

  useEffect(() => {
    fetchCompte();
  }, []);
  const totalEmployees = compte;
  const employeesToManage = compte;

  return (
    <div className=" w-screen bg-gray-100 p-2 mt-14 overflow-hidden">
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
        <h1 className="text-2xl pl-0 text-white font-bold w-full bg-bgortext text-center py-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105">
          Tableau de bord
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total Employés"
          count={totalEmployees}
          couleur = "yellow"
          image={images.total}
          delay={0}
        />
        <Panneau />
        <Card
          title="Employés à Gérer"
          count={employeesToManage}
          image={images.manage}
          couleur="#4ae"
          delay={2}
        />
      </section>
    </div>
  );
};

const Card = ({ title, couleur ,  count, image, delay }) => {
  return (
    <div
      className={`bg-white p-6 w-full rounded-lg shadow-md flex items-center justify-center  transition-transform transform hover:scale-105 animate__animated animate__fadeIn animate__delay-${delay}s`}
    >
      <div className="rounded-full overflow-hidden w-24 h-24 flex items-center justify-center relative">
        <img src={image} alt={title} className="w-20 h-20 rotate-animation" />
      </div>
      <div className="ml-4 flex gap-3 items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <FaArrowRight size={20} color={couleur}/>
        <p
          className={`text-black font-bold  flex items-center justify-center rounded-full text-lg`}
        >
          {count}
        </p>
      </div>
    </div>
  );
};

export default Dashbord;
