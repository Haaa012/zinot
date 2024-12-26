import React, { useState } from 'react';
import Navbar from "./Navbar";
import Liste from '../Info_personnel/Liste';
import Dashbord from "./Dashbord";
import Famille from '../Famille/Famille';
import Parcours from '../Parcours/Parcours';
import Sante from '../Sante/Sante';
import Formation from '../Formation/Formation';

export default function Accueil({handlelogout}) {
  const [activeButton, setActiveButton] = useState('home'); // État pour le bouton actif

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Met à jour l'état avec le nom du bouton cliqué
  };

  return (
    <>
      <div className="">
        <div className="w-[17.1%]">
          <Navbar
            lougout = {handlelogout}
            onButtonClick={handleButtonClick} // Passer la fonction de gestion des clics
            activeButton={activeButton} // Passer l'état du bouton actif
          />
        </div>
        <div className="w-[82.9%]">
          {activeButton === 'home' && <Dashbord />} {/* Afficher le composant Dashbord */}
          {activeButton === 'list' && <Liste />} {/* Décommentez si vous avez ce composant */}
          {activeButton === 'famille' && <Famille />}
          {activeButton === 'parcours' && <Parcours />}
          {activeButton === 'sante' && <Sante />}
          {activeButton === 'formation' &&  <Formation />
          }
          
        </div>
      </div>
    </>
  );
}
