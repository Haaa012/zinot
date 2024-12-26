import { useState , useEffect } from "react";
import "../../App.css";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa"; // Importez les icônes
import { FaSave, FaTimes } from "react-icons/fa"; // Importez les icônes
import {  FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Modifparcours from "./Modifparcours";

export default function Parcours() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [users, setUsers] = useState([]);
  const [parcours , setParcours] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_employer/");
      const data = await response.json();
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const fetchParcours = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_parcours/");
      const data = await response.json();
      setParcours(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de parcours:", error);
    }
  };
//ref mclique option sante vao recharge ilay useEffect d mande ny fetch
  useEffect(() => {
    fetchUsers();
    fetchParcours();
    console.log(parcours)
  }, []);




  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  const closeAddModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddUser = (updatedUser) => {
    // Mise à jour ou ajout de l'utilisateur dans la liste des utilisateurs
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  
    // Mise à jour ou ajout des informations de parcours
    setParcours((prevParcours) => {
      const existingParcours = prevParcours.find((p) => p.declarant === updatedUser.id);
      
      if (existingParcours) {
        // Si le parcours existe déjà, on le met à jour
        return prevParcours.map((p) =>
          p.declarant === updatedUser.id
            ? { 
                ...p, 
                poste_anterieur: updatedUser.poste_anterieur, 
                periode_debut: updatedUser.periode_debut, 
                periode_fin: updatedUser.periode_fin, 
                adresse_employeur: updatedUser.adresse_employeur,
                poste_contrat: updatedUser.poste_contrat,
                type_contrat: updatedUser.type_contrat,  // Assurez-vous de la bonne casse
                qualification: updatedUser.qualification, 
                debut_contrat: updatedUser.debut_contrat,
                fin_contrat: updatedUser.fin_contrat,
                horaire_hebdo: updatedUser.horaire_hebdo, 
                salaire_brut: updatedUser.salaire_brut, 
                salaire_net: updatedUser.salaire_net,
              }
            : p
        );
      } else {
        // Si le parcours n'existe pas, on ajoute une nouvelle entrée
        return [
          ...prevParcours,
          { 
            declarant: updatedUser.id,  // Assurez-vous que le declarant (id) soit bien présent pour lier les données
            poste_anterieur: updatedUser.poste_anterieur, 
            periode_debut: updatedUser.periode_debut, 
            periode_fin: updatedUser.periode_fin, 
            adresse_employeur: updatedUser.adresse_employeur,
            poste_contrat: updatedUser.poste_contrat,
            type_contrat: updatedUser.type_contrat, // Assurez-vous de la bonne casse
            qualification: updatedUser.qualification, 
            debut_contrat: updatedUser.debut_contrat,
            fin_contrat: updatedUser.fin_contrat,
            horaire_hebdo: updatedUser.horaire_hebdo, 
            salaire_brut: updatedUser.salaire_brut, 
            salaire_net: updatedUser.salaire_net,
          }
        ];
      }
    });
  
    // Fermer le modal après l'ajout
    closeAddModal();
  };

  
    const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <>
      <div className="w-screen mt-14 p-2">
        <div className="w-[100%]">
          <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl pl-0 text-white font-bold w-full bg-bgortext text-center py-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105">
           Parcours
            </h1>
          </header>
        </div>
        <div className="flex justify-end">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div>
      <div className="relative">
        <div className="flex gap-8">
          {/* Première section */}
          <p
            onClick={() => setSelection(selection === "info" ? null : "info")}
            className=" cursor-pointer font-bold text-gray-500"
          >
            Profession antérieurs
          </p>
            <p
              onClick={() =>
                setSelection(selection === "donnees" ? null : "donnees")
              }
              className="font-bold cursor-pointer pl-8 text-gray-500"
            >
              Contrat
            </p>
          </div>

          {selection === null ? (
            <>
              <div className="p-[2px] w-[200px]  bg-gray-400"></div>
              <div className="w-full">
              <Table_Profession users={filteredUsers} parcours = {parcours} onEdit={handleEdit} />
              </div>
            </>
          ) : (
            <>
              <div className="p-[2px] w-24 translate-x-60 bg-gray-400"></div>
              <div className="w-full">
                 <Table_Contrat  users={filteredUsers} parcours = {parcours} onEdit={handleEdit}/>
              </div>
            </>
          )}
        </div>

        {/* Deuxième section */}
      </div>


      </div>
      {isEditModalOpen && (
        <Modifparcours selectedUser={currentUser} onUpdateUser={handleAddUser} parcours_employer={parcours} onClose={closeEditModal} />
      )}
    </>
  );
}

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex w-96 items-center justify-end border border-gray-300 rounded-lg p-2 bg-white shadow-md">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={searchTerm}
        onChange={handleChange}
        className="ml-2 outline-none flex-1"
      />
    </div>
  );
};





const Table_Profession = ({ users, parcours }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/4" rowSpan={2}>Nom</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6" rowSpan={2}>Poste</th>

            <th colSpan={2} className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6">Période d'emploi</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-2/3" rowSpan={2}>Dénomination et adresse de l'employeur</th>
          </tr>
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 ">Début</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 ">Fin</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user) => {
    const userParcours = parcours.find((etat) => etat.declarant === user.id);
    return (
      <tr key={user.id} className="hover:bg-gray-50 border-b">
        <td className="py-3 px-4 text-gray-800">{user.nom} {user.prenom}</td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.poste_anterieur ? userParcours.poste_anterieur : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.periode_debut ? userParcours.periode_debut : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.periode_fin ? userParcours.periode_fin : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.adresse_employeur ? userParcours.adresse_employeur : "-- -- --"}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};


const Table_Contrat = ({ users,parcours, onEdit }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6" rowSpan={2}>
              Nom
            </th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6" rowSpan={2}>
              Poste
            </th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6" rowSpan={2}>
              Type de contrat
            </th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6" rowSpan={2}>
              Qualification
            </th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/8" rowSpan={2}>
              Horaire hebdo
            </th>
            <th colSpan={2} className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6">
              Période d'emploi
            </th>
            <th colSpan={2} className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/6">
              Salaire mensuel
            </th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/8" rowSpan={2}>
              Actions
            </th>
          </tr>
          <tr>
            <th className="py-3 px-1.5 text-left text-gray-600 border-b border-gray-300 w-1/8">Début</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/8">Fin</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/8">Brut</th>
            <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300 w-1/8">Net</th>
          </tr>
        </thead>

        <tbody>
  {users.map((user) => {
    const userParcours = parcours.find((etat) => etat.declarant === user.id);
    return (
      <tr key={user.id} className="hover:bg-gray-50 border-b">
        <td className="py-3 px-4 text-gray-800">{user.nom} {user.prenom}</td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.poste_contrat ? userParcours.poste_contrat : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.type_contrat ? userParcours.type_contrat : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.qualification ? userParcours.qualification : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.horaire_hebdo ? userParcours.horaire_hebdo : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.debut_contrat ? userParcours.debut_contrat : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.fin_contrat ? userParcours.fin_contrat : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.salaire_brut ? userParcours.salaire_brut : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userParcours && userParcours.salaire_net ? userParcours.salaire_net : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800 flex gap-2">
          <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white">
              <FaPlus size={20} />
            </div>
          </button> 
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};






