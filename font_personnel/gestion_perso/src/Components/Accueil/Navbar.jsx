import React from 'react';
import { FaHome, FaList,  FaSignOutAlt, FaGraduationCap, FaConfluence} from "react-icons/fa";
import { FaBluesky, FaHeartCircleBolt } from 'react-icons/fa6';

export default function Navbar({ onButtonClick,lougout, activeButton }) {
  return (
    <div className=" fixed  top-0 flex z-50 w-screen py-54 justify-between bg-bgortext p-1">
      <div className="flex flex-row gap-4">
        <div 
          className={`flex ${activeButton === 'home' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4  items-center flex-row gap-4`}
          onClick={() => onButtonClick('home')}
        >
          <FaHome size={20} color={activeButton === 'home' ? 'white' : 'white'} />
          <button className="text- text-white">Accueil</button>
        </div>
        <div 
          className={`flex ${activeButton === 'list' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4 items-center justify-center flex-row gap-6`}
          onClick={() => onButtonClick('list')}
        >
          <FaList size={20} color='white' />
          <button className=" text-white">Listes</button>
        </div>
        <div 
          className={`flex ${activeButton === 'famille' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4 items-center flex-row gap-4`}
          onClick={() => onButtonClick('famille')}
        >
          <FaBluesky size={20} color='white' />
          <button className=" text-white">Famille</button>
        </div>
        <div 
          className={`flex ${activeButton === 'parcours' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4 items-center flex-row gap-4`}
          onClick={() => onButtonClick('parcours')}
        >
          <FaConfluence size={20} color='white' />
          <button className=" text-white">Parcours</button>
        </div>
        <div 
          className={`flex ${activeButton === 'formation' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4 items-center flex-row gap-4`}
          onClick={() => onButtonClick('formation')}
        >
          <FaGraduationCap size={20} color='white' />
          <button className="text-white">Formation</button>
        </div>

        <div 
          className={`flex ${activeButton === 'sante' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-4 items-center flex-row gap-4`}
          onClick={() => onButtonClick('sante')}
        >
          <FaHeartCircleBolt size={20} color='white' />
          <button className=" text-white">Santé</button>
        </div>


      </div>
      <div className=" flex flex-row ">
        <div 
          className={`flex ${activeButton === 'logout' ? 'bg-bottoncolor' : ''} transition-all duration-300 ease-in-out px-6 py-3 rounded-xl items-center flex-row gap-4`}
          onClick={lougout}
        >
          <FaSignOutAlt size={20} color='white' />
          <button className=" text-white" >Se déconnecter</button>
        </div>
        <div>
          <img src=".././public/images/tsinjo.png" height={50} className='rounded-full ' width={50} alt="" />
        </div>
      </div>
    </div>
  );
}
